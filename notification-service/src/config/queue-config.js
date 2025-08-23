const amqp = require("amqplib");
const { ServerConfig } = require("../config");
const emailService = require("./email-service.js");

async function connectAndConsume() {
  try {
    const connection = await amqp.connect(
      ServerConfig.RABBITMQ_URL || "amqp://localhost"
    );
    const channel = await connection.createChannel();

    // Ensure the queue exists
    await channel.assertQueue("TICKET_NOTIFICATION_QUEUE", {
      durable: true,
    });

    console.log(
      "Notification service connected to RabbitMQ, waiting for messages..."
    );

    // Set prefetch to 1 to ensure one message is processed at a time
    channel.prefetch(1);

    channel.consume("TICKET_NOTIFICATION_QUEUE", async (msg) => {
      if (msg) {
        try {
          const data = JSON.parse(msg.content.toString());
          console.log("Received notification request:", data);

          // Send email notification
          await emailService.sendTicketEmail(data);

          // Acknowledge message (remove from queue)
          channel.ack(msg);
          console.log("Email sent and message acknowledged");
        } catch (error) {
          console.error("Error processing message:", error);
          // Negative acknowledgment, message goes back to queue
          channel.nack(msg, false, true);
        }
      }
    });
  } catch (error) {
    console.error("Error in queue consumer:", error);
    process.exit(1);
  }
}

module.exports = {
  connectAndConsume,
};

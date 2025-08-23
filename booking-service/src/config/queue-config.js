const amqp = require("amqplib");
const { ServerConfig } = require("./index");

let channel;

async function connectQueue() {
  try {
    const connection = await amqp.connect(
      ServerConfig.RABBITMQ_URL || "amqp://localhost"
    );
    channel = await connection.createChannel();

    // Ensure the queue exists
    await channel.assertQueue("TICKET_NOTIFICATION_QUEUE", {
      durable: true,
    });

    console.log("Connected to RabbitMQ");
  } catch (error) {
    console.error("Error connecting to RabbitMQ:", error);
    process.exit(1);
  }
}

async function sendMessage(queue, data) {
  try {
    if (!channel) {
      throw new Error("RabbitMQ channel not initialized");
    }

    channel.sendToQueue(queue, Buffer.from(JSON.stringify(data)), {
      persistent: true,
    });

    console.log(`Message sent to ${queue}`);
  } catch (error) {
    console.error("Error sending message to queue:", error);
    throw error;
  }
}

module.exports = {
  connectQueue,
  sendMessage,
};

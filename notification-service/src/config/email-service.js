const nodemailer = require("nodemailer");
const { ServerConfig } = require("../config");

// Create transporter (configure once)
const transporter = nodemailer.createTransport({
  service: "gmail", // or use SMTP settings
  auth: {
    user: ServerConfig.EMAIL_ID,
    pass: ServerConfig.EMAIL_PASS,
  },
});

async function sendTicketEmail(ticketData) {
  try {
    const subject = ticketData.subject || "Your DreamLines Ticket";
    const recipientEmail =
      ticketData.recipientEmail ||
      ServerConfig.NOTIFICATION_TEST_EMAIL ||
      `no-reply@${ServerConfig.APP_NAME || "dreamlines"}.com`;

    const ticketNumber =
      ticketData.ticketNumber || `${ticketData.bookingId || "NA"}-NA`;
    const flightDetails = ticketData.flightDetails || {
      flightNumber: "N/A",
      departureAirport: "N/A",
      arrivalAirport: "N/A",
    };
    const boardingTime = ticketData.boardingTime || new Date().toISOString();
    const seatNumber = ticketData.seatNumber || "Not Assigned";

    // Create email content - you can use HTML for better formatting
    const mailOptions = {
      from: `"DreamLines Booking" <${ServerConfig.EMAIL_ID}>`,
      to: recipientEmail,
      subject: subject,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 5px;">
          <h2 style="color: #0066cc;">Your Flight Ticket is Confirmed!</h2>
          <p>Dear Customer,</p>
          <p>Thank you for booking with DreamLines. Here are your ticket details:</p>
          
          <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin: 15px 0;">
            <p><strong>Ticket Number:</strong> ${ticketNumber}</p>
            <p><strong>Flight:</strong> ${flightDetails.flightNumber}</p>
            <p><strong>From:</strong> ${flightDetails.departureAirport}</p>
            <p><strong>To:</strong> ${flightDetails.arrivalAirport}</p>
            <p><strong>Date:</strong> ${new Date(
              boardingTime
            ).toLocaleDateString()}</p>
            <p><strong>Departure Time:</strong> ${new Date(
              boardingTime
            ).toLocaleTimeString()}</p>
            <p><strong>Seat Number:</strong> ${seatNumber}</p>
          </div>
          
          <p>Please arrive at the airport at least 2 hours before departure.</p>
          <p>Have a pleasant journey!</p>
          
          <p style="font-size: 12px; color: #666; margin-top: 30px;">
            This is an automated message. Please do not reply to this email.
          </p>
        </div>
      `,
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.messageId);
    return info;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
}

module.exports = {
  sendTicketEmail,
};

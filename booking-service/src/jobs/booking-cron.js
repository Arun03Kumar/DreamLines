const cron = require("node-cron");
const db = require("../models");
const BookingRepository = require("../repositories/booking-repository");
const { BOOKING_STATUS } = require("../utils");
const { CANCELED, INITIATED } = BOOKING_STATUS;

const bookingRepository = new BookingRepository();

async function cancelStaleBookings() {
  const thirtyMinutesAgo = new Date(Date.now() - 10 * 60 * 1000);
  try {
    // Find all bookings with status INITIATED and createdAt older than 30 minutes
    const bookings = await db.Booking.findAll({
      where: {
        status: INITIATED,
        createdAt: { [db.Sequelize.Op.lt]: thirtyMinutesAgo },
      },
    });

    for (const booking of bookings) {
      await bookingRepository.update(booking.id, { status: CANCELED });
      console.log(`Booking ${booking.id} cancelled by cron.`);
    }
  } catch (err) {
    console.error("Error in cron job:", err);
  }
}

// Run every 5 minutes
cron.schedule("*/30 * * * *", cancelStaleBookings);
// cron.schedule("*/5 * * * * *", cancelStaleBookings);

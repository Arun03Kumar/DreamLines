const { BookingService } = require("../services");

async function createBooking(req, res) {
  try {
    console.log(req.body);
    const response = await BookingService.createBooking({
      flightId: req.body.flightId,
      userId: req.body.userId,
      noOfSeats: req.body.noOfSeats,
    });
    return res.status(201).json(response);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

module.exports = {
  createBooking,
};

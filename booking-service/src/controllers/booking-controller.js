const { BookingService } = require("../services");

const inMemDb = {};

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

async function makePayment(req, res) {
  try {
    // console.log(req.body);
    const idempotencyKey = req.headers["x-idempotency-key"];
    if (!idempotencyKey) {
      throw new Error("Idempotency key is missing");
    }

    if (inMemDb[idempotencyKey]) {
      throw new Error("Duplicate payment");
    }
    const response = await BookingService.makePayment({
      bookingId: req.body.bookingId,
      userId: req.body.userId,
      totalCost: req.body.totalCost,
    });
    inMemDb[idempotencyKey] = idempotencyKey;
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

module.exports = {
  createBooking,
  makePayment,
};

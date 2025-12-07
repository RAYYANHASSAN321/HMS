const mongoose = require("mongoose");

const ReservationSchema = new mongoose.Schema({
  guest: { type: mongoose.Schema.Types.ObjectId, ref: "Guest", required: true },
  room: { type: mongoose.Schema.Types.ObjectId, ref: "Room", required: true },
  checkInDate: { type: Date, required: true },
  checkOutDate: { type: Date, required: true },
  totalAmount: { type: Number, required: true },
  paymentStatus: { type: String, enum: ["pending", "paid"], default: "pending" },
  bookingStatus: {
    type: String,
    enum: ["booked", "checked-in", "checked-out", "cancelled"],
    default: "booked",
  },
  created_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Reservation", ReservationSchema);

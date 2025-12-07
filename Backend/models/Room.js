const mongoose = require("mongoose");

const RoomSchema = new mongoose.Schema({
  roomNumber: {
    type: String,
    required: [true, "Room number is required"],
    unique: true,
    trim: true,
  },
  roomType: {
    type: String,
    required: [true, "Room type is required"],
    trim: true,
  },
  price: {
    type: Number,
    required: [true, "Price is required"],
  },
  description: {
    type: String,
    trim: true,
  },
  image: {
    type: String,
    required: [true, "Image is required"],
  },
  status: {
    type: String,
    enum: ["available", "booked", "maintenance"],
    default: "available",
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

const Room = mongoose.model("Room", RoomSchema);

module.exports = Room;

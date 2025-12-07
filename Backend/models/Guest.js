const mongoose = require("mongoose");

const GuestSchema = new mongoose.Schema({
  name: { type: String, required: true },
  contact: { type: String, required: true },
  email: { type: String },
  address: { type: String },
  idProof: { type: String },
  created_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Guest", GuestSchema);

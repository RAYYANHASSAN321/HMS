const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  contact: { type: String, required: true },
  password: { type: String, required: true },
  address: { type: String, required: true },
  image: { type: String, required: true },
  role: { type: mongoose.Schema.Types.ObjectId, ref: "roles", required: true },
  created_at: { type: Date, default: Date.now },
});

const Users = mongoose.model("users", UserSchema);
module.exports = Users;

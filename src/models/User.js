// import mongoose from "mongoose";

// const userSchema = new mongoose.Schema(
//   {
//     name: { type: String, required: true },
//     email: { type: String, unique: true, required: true },
//     password: { type: String },
//     isAdmin: { type: Boolean, default: false },
//     wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
//   },
//   { timestamps: true }
// );

// export const User = mongoose.models.User || mongoose.model("User", userSchema);

// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  isAdmin: { type: Boolean, default: false },
});

export const User = mongoose.models.User || mongoose.model("User", userSchema);

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    dob: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["user", "doctor"],
      required: true,
    },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
      required: false,
    },
    // doctor only fields
    doctor_address: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);

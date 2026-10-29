
const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    service: { type: String, required: true },
    date: { type: String, required: true },
    address: { type: String, required: true },
    message: { type: String, default: "" },
    status: {
      type: String,
      enum: ["Pending", "Confirmed", "Completed", "Cancelled"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", bookingSchema);

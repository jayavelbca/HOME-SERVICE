
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
function verifyAdmin(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      message: "Please login as admin.",
    });
  }

  try {
    const token = authHeader.slice(7);

    const payload = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    if (payload.role !== "admin") {
      return res.status(403).json({
        message: "Access denied.",
      });
    }

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Session expired. Please login again.",
    });
  }
}
const Booking = require("./models/booking");

const app = express();

app.use(cors());
app.use(express.json());

// Test API
app.get("/", (req, res) => {
  res.send("Home Services API is running!");
});

 app.get("/api/admin/debug", (req, res) => {
  res.json({
    username: process.env.ADMIN_USERNAME,
    passwordLength: process.env.ADMIN_PASSWORD?.length,
    jwtConfigured: Boolean(process.env.JWT_SECRET),
  });
});

app.post("/api/admin/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        message: "Username and password are required.",
      });
    }

    if (
      username !== process.env.ADMIN_USERNAME ||
      password !== process.env.ADMIN_PASSWORD
    ) {
      return res.status(401).json({
        message: "Invalid username or password.",
      });
    }

    if (!process.env.JWT_SECRET) {
      return res.status(500).json({
        message: "Server authentication is not configured.",
      });
    }

    const token = jwt.sign(
      { role: "admin" },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({
      message: "Login successful.",
      token,
    });
  } catch (error) {
    console.error("Admin login error:", error.message);

    res.status(500).json({
      message: "Login failed.",
    });
  }
});
// Update booking status (Admin only)
app.patch("/api/bookings/:id/status", verifyAdmin, async (req, res) => {
  try {
    const { status } = req.body;

    const allowedStatuses = [
      "Pending",
      "Confirmed",
      "Completed",
      "Cancelled",
    ];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        message: "Invalid booking status.",
      });
    }

    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!booking) {
      return res.status(404).json({
        message: "Booking not found.",
      });
    }

    res.json({
      message: "Booking status updated successfully.",
      booking,
    });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({
        message: "Invalid booking ID.",
      });
    }

    console.error("Status update error:", error.message);

    res.status(500).json({
      message: "Unable to update booking status.",
    });
  }
});
// Create a booking
app.post("/api/bookings", async (req, res) => {
  try {
    const { name, phone, service, date, address, message } = req.body;

    if (!name || !phone || !service || !date || !address) {
      return res.status(400).json({
        message: "Please provide all required booking details.",
      });
    }

    if (!/^[6-9]\d{9}$/.test(phone)) {
      return res.status(400).json({
        message: "Enter a valid 10-digit Indian mobile number.",
      });
    }

    const booking = await Booking.create({
      name,
      phone,
      service,
      date,
      address,
      message,
    });

    res.status(201).json({
      message: "Booking saved successfully!",
      booking,
    });
  } catch (error) {
    console.error("Booking error:", error.message);
    res.status(500).json({
      message: "Unable to save booking.",
    });
  }
});

// Get all bookings (temporary development endpoint)
app.get("/api/bookings", async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });
    res.json(bookings);
  } catch (error) {
    console.error("Fetch bookings error:", error.message);
    res.status(500).json({
      message: "Unable to fetch bookings.",
    });
  }
});

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected successfully");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  });

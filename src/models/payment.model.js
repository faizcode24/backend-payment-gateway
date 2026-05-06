const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    amount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["PENDING", "PROCESSING", "SUCCESS", "FAILED"],
      default: "PENDING",
    },
    idempotencyKey: {
      type: String,
      required: true,
      unique: true,
    },
    retryCount: {
      type: Number,
      default: 0,
    },
    version: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

// Index for fast lookup
paymentSchema.index({ idempotencyKey: 1 }, { unique: true });

module.exports = mongoose.model("Payment", paymentSchema);
const Payment = require("../models/payment.model");
const simulateGateway = require("../utils/gateway");

const MAX_RETRIES = 3;

const processPayment = async (paymentId) => {
  const payment = await Payment.findById(paymentId);
  if (!payment) return;

  if (payment.status === "SUCCESS") return;

  // Lock (concurrency control)
  const locked = await Payment.findOneAndUpdate(
    { _id: paymentId, status: "PENDING" },
    { status: "PROCESSING" },
    { new: true }
  );

  if (!locked) return;

  try {
    const result = await simulateGateway();

    await Payment.findByIdAndUpdate(paymentId, {
      status: result,
    });

    console.log(`Payment ${paymentId} → ${result}`);

  } catch (err) {
    if (payment.retryCount < MAX_RETRIES) {
      const retryCount = payment.retryCount + 1;
      const delay = Math.pow(2, retryCount) * 1000;

      await Payment.findByIdAndUpdate(paymentId, {
        retryCount,
        status: "PENDING",
      });

      console.log(`Retrying ${paymentId} in ${delay}ms`);

      setTimeout(() => processPayment(paymentId), delay);

    } else {
      await Payment.findByIdAndUpdate(paymentId, {
        status: "FAILED",
      });

      console.log(`Payment ${paymentId} FAILED`);
    }
  }
};

const createPayment = async (amount, idempotencyKey) => {
  let existing = await Payment.findOne({ idempotencyKey });
  if (existing) return existing;

  const payment = await Payment.create({
    amount,
    idempotencyKey,
  });

  // Async processing (non-blocking)
  setImmediate(() => processPayment(payment._id));

  return payment;
};

const getPayment = async (id) => {
  return Payment.findById(id);
};

module.exports = { createPayment, getPayment };
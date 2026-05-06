const Payment = require("../models/payment.model");

const webhook = async (req, res) => {
  const { paymentId, status } = req.body;

  const payment = await Payment.findById(paymentId);

  if (!payment) return res.sendStatus(404);

  if (payment.status === "SUCCESS") {
    return res.sendStatus(200); // ignore duplicate
  }

  await Payment.findByIdAndUpdate(paymentId, { status });

  res.sendStatus(200);
};

module.exports = webhook;
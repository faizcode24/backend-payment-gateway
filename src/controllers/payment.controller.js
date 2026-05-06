const { createPayment, getPayment } = require("../services/payment.service");
const { v4: uuidv4 } = require("uuid");

const create = async (req, res) => {
  try {
    const { amount } = req.body;
    const idempotencyKey =
      req.headers["idempotency-key"] || uuidv4();

    const payment = await createPayment(amount, idempotencyKey);

    res.json(payment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const get = async (req, res) => {
  const payment = await getPayment(req.params.id);
  res.json(payment);
};

module.exports = { create, get };
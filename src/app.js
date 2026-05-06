const express = require("express");
const paymentController = require("./controllers/payment.controller");
const webhook = require("./webhooks/webhook.controller");

const app = express();
app.use(express.json());

app.post("/payments", paymentController.create);
app.get("/payments/:id", paymentController.get);
app.post("/webhook", webhook);

module.exports = app;
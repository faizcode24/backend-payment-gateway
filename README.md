# 💳 Payment Processing System

A backend system that simulates real-world payment gateway behavior with support for idempotency, retries, failure handling, and asynchronous processing.

---

## 🚀 Features

* ✅ Payment lifecycle management (PENDING → PROCESSING → SUCCESS / FAILED)
* ✅ Idempotency support (prevents duplicate payments)
* ✅ Retry mechanism with exponential backoff
* ✅ Simulated external payment gateway (success/failure/timeout)
* ✅ Webhook handling (handles duplicate & conflicting updates)
* ✅ Concurrency-safe processing
* ✅ RESTful API design
* ✅ Docker support

---

## 🏗️ Tech Stack

* **Backend:** Node.js, Express.js
* **Database:** MongoDB (Mongoose)
* **Containerization:** Docker

---

## 📁 Project Structure

```
src/
 ├── config/
 ├── controllers/
 ├── models/
 ├── services/
 ├── utils/
 ├── webhooks/
 ├── app.js
 └── server.js
```

---

## ⚙️ Setup & Installation

### 1. Clone the repository

```
git clone <your-repo-url>
cd payment-processing-system
```

### 2. Install dependencies

```
npm install
```

### 3. Configure environment

Create a `.env` file:

```
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/payment-system
```

### 4. Start MongoDB

```
mongodb
```

### 5. Run the server

```
npm run dev
```

---

## 🐳 Run with Docker

```
docker-compose up --build
```

---

## 📡 API Endpoints

### ➤ Create Payment

```
POST /payments
```

Headers:

```
Content-Type: application/json
Idempotency-Key: unique-key
```

Body:

```json
{
  "amount": 100
}
```

---

### ➤ Get Payment Status

```
GET /payments/:id
```

---

### ➤ Webhook (Simulated)

```
POST /webhook
```

Body:

```json
{
  "paymentId": "payment_id",
  "status": "SUCCESS"
}
```

---

## 🔁 Payment Flow

```
PENDING → PROCESSING → SUCCESS
                      → FAILED
```

---

```

### Covered Scenarios:

* Payment creation
* Idempotency validation
* Retry logic
* Failure handling
* API endpoints

---

## 📌 Key Concepts Implemented

### 🔐 Idempotency

Ensures duplicate requests do not create multiple payments.

### 🔄 Retry Logic

Implements exponential backoff for failed payments.

### ⚔️ Concurrency Control

Prevents multiple workers from processing the same payment.

### 📡 Webhook Handling

Handles duplicate and out-of-order updates safely.

---

## ⚠️ Limitations

* In-memory retry handling (not distributed)
* No persistent job queue (like Kafka/BullMQ)
* Single instance processing

---

## 🔮 Future Improvements

* Add Redis/BullMQ for distributed queue
* Implement circuit breaker pattern
* Add rate limiting & authentication
* Add monitoring (Prometheus, Grafana)
* Build frontend dashboard

---

## 👨‍💻 Author

**Faiz**
Backend Developer

---

## ⭐ Contribute

Feel free to fork and improve the project!

---


const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(functions.config().stripe.key); // ✅ Use Firebase Config

const app = express();

app.use(cors({ origin: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Success!",
  });
});

app.post("/payment/create", async (req, res) => {
  const total = parseInt(req.query.total);

  if (total > 0) {
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: total,
        currency: "usd",
      });
      console.log(paymentIntent);
      res.status(201).json({
        clientSecret: paymentIntent.client_secret,
      });
    } catch (error) {
      console.error("Stripe Error:", error);
      res.status(500).json({ message: "Payment failed", error });
    }
  } else {
    res.status(400).json({
      message: "Total must be greater than 0",
    });
  }
});

exports.api = functions.https.onRequest(app);

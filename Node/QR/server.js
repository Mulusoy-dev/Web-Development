require("dotenv").config();
const express = require("express");
const connectDB = require("./config/dbConn");

const app = express();
const PORT = process.env.PORT || 5000;

// MongoDB connection
connectDB();

// Middleware
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send("Welcome to QR Backend App");
});

// Routes
app.use("/api/equipment", require("./routes/equipment"));

app.listen(PORT, () => {
  console.log(`Server started at ${PORT}`);
});

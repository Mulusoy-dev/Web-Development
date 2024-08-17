require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/dbConn");
const corsOptions = require("./config/corsOptions");
const credentials = require("./config/credentials");

const app = express();
const PORT = process.env.PORT || 5000;

// MongoDB connection
connectDB();

// Middleware
app.use(express.json());

// Handle options credentials check - before CORS!
// and fetch cookies credentials requirement
app.use(credentials);

// CORS
app.use(cors(corsOptions));

app.get("/", (req, res) => {
  res.status(200).send("Welcome to QR Backend App");
});

// Routes
app.use("/api/equipment", require("./routes/equipment"));

app.listen(PORT, () => {
  console.log(`Server started at ${PORT}`);
});

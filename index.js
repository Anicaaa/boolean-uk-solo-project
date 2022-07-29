// Load our .env file
require("dotenv").config();

// Import express and cors
const express = require("express");
const cors = require("cors");

// Request login
const morgan = require("morgan");

// Set up express
const app = express();
app.disable("x-powered-by");
app.use(cors());

// Tell express to use a JSON parser middleware
app.use(express.json());
// Tell express to use a URL Encoding middleware
app.use(express.urlencoded({ extended: true }));

app.use(morgan("dev"));

// Add routes here

app.get("/", (req, res) => {
  res.send("login");
});

app.get("/register", (req, res) => {
  res.send("register");
});

// Start our API server
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}/`);
});

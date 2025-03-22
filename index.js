// app.js
require('dotenv').config(); // Load environment variables from .env file
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json())


const contactus = require("./routes/ContactUs/ContactUs")

require("./conn/Conn")

app.use("/weppso", contactus)
// Define the root route
app.get('/', (req, res) => {
  res.send('Hello');
});

// Set the port from environment variable or default to 3000
const port = process.env.PORT || 3000;

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

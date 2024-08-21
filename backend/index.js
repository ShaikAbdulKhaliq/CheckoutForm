// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./config/db');
const Order = require('./models/Order');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
connectDB();

// API Endpoint
app.post('/checkout', async (req, res) => {
  const { name, address, cardNumber } = req.body;

  // Basic validation
  if (!name || !address || !cardNumber) {
    return res.status(400).send('All fields are required');
  }

  const order = new Order({
    name,
    address,
    cardNumber,
  });

  try {
    await order.save();
    res.status(201).send('Order placed successfully');
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
});

app.get("/getdata",async(req,res)=>{
    try {
        await res.send("hello wolrd!!!")
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
})
// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

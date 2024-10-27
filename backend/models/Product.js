const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
    match: [/^(https:\/\/)?(www\.)?amazon\.com\/.+$/, "Invalid Amazon URL"], // Validate Amazon URL format
  },
  name: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  price: {
    type: String, // Optionally, use Number if you want to treat price numerically
    required: false,
  },
  image: {
    type: String,
    required: true,
  },
  variation: {
    type: variationSchema,
    required: true,
  },
});

module.exports = productSchema
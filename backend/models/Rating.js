const mongoose = require("mongoose");

import mongoose from "./Product";

const ratingSchema = new mongoose.Schema({
  average_rating: {
    type: Number,
    required: true,
    min: 0,
    max: 5, // Ratings are usually between 0-5
  },
  total_ratings: {
    type: Number,
    required: true,
    min: 0,
  },
  filtered_total_ratings: {
    type: Number,
    required: false,
  },
  total_reviews: {
    type: Number,
    required: false,
  },
  filtered_total_reviews: {
    type: Number,
    required: false,
  },
  "5_star_ratings": {
    type: Number,
    required: true,
    min: 0,
  },
  "5_star_percentage": {
    type: Number,
    required: true,
    min: 0,
    max: 100, // Percentages should be between 0 and 100
  },
  // Similar changes for 4-star, 3-star, etc.
});

module.exports = ratingSchema;
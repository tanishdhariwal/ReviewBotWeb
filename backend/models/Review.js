const mongoose = require("mongoose");

import mongoose from "./Product";

const reviewSchema = new mongoose.Schema({
  stars: {
    type: Number,
    required: true,
    min: 1,
    max: 5, // Ensures valid star ratings between 1-5
  },
  date: {
    type: Date, // Prefer using `Date` type for timestamps
    required: true,
  },
  verified_purchase: {
    type: Boolean,
    required: true,
  },
  manufacturer_replied: {
    type: Boolean,
    default: false, // Set default false
  },
  username: {
    type: String,
    required: true,
  },
  user_url: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  review: {
    type: String,
    required: true,
  },
  review_url: {
    type: String,
    required: true,
  },
  total_found_helpful: {
    type: Number,
    default: 0, // Default to 0, since new reviews won't have any votes
  },
  images: {
    type: [String], // Array of URLs
    required: false,
  },
  variation: {
    type: variationSchema,
    required: false,
  },
  video_url: {
    type: String,
    required: false,
  },
});

module.exports = reviewSchema;
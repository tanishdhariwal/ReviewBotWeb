const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

const exchangeSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
    required: true,
  },
  sender: {
    type: String,
    required: true,
  },
});

const variationSchema = new mongoose.Schema({
  color: {
    type: String,
    required: true,
  },
  style: {
    type: String,
    required: true,
  },
});

const productSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
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
    type: String,
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

const reviewSchema = new mongoose.Schema({
  stars: {
    type: Number,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  verified_purchase: {
    type: Boolean,
    required: true,
  },
  manufacturer_replied: {
    type: Boolean,
    required: false,
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
    required: false,
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

const ratingSchema = new mongoose.Schema({
  average_rating: {
    type: Number,
    required: true,
  },
  total_ratings: {
    type: Number,
    required: true,
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
  },
  "5_star_percentage": {
    type: Number,
    required: true,
  },
  "4_star_ratings": {
    type: Number,
    required: true,
  },
  "4_star_percentage": {
    type: Number,
    required: true,
  },
  "3_star_ratings": {
    type: Number,
    required: true,
  },
  "3_star_percentage": {
    type: Number,
    required: true,
  },
  "2_star_ratings": {
    type: Number,
    required: true,
  },
  "2_star_percentage": {
    type: Number,
    required: true,
  },
  "1_star_ratings": {
    type: Number,
    required: true,
  },
  "1_star_percentage": {
    type: Number,
    required: true,
  },
});

const chatSchema = new mongoose.Schema({
  user_name: {
    type: String,
    required: true,
  },
  ProductASIN: {
    type: String,
    required: true,
    unique: true,
  },
  product_name: {
    type: String,
    required: true,
  },
  productCost: {
    type: String,
    required: true,
  },
  productImages: {
    type: [String], // Array of URLs
    required: true,
  },
  ReviewSummary: {
    type: String,
    required: true,
  },
  exchanges: {
    type: [exchangeSchema], // Array of exchangeSchema
    required: true,
  },
  product: {
    type: productSchema,
    required: true,
  },
  ratings: {
    type: ratingSchema,
    required: true,
  },
  reviews: {
    type: [reviewSchema], // Array of reviewSchema
    required: true,
  },
});

module.exports = mongoose.model("Chat", chatSchema);

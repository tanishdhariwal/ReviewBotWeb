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
  },
  sender: {
    type: String,
    required: true,
    enum: ["user", "bot"], // Ensures only "user" or "bot" is allowed
  },
});

const variationSchema = new mongoose.Schema({
  color: { type: String, required: true },
  style: { type: String, required: true },
});

const productSchema = new mongoose.Schema({
  url: { type: String, required: true },
  name: { type: String, required: true },
  brand: { type: String, required: true },
  price: { type: String },
  image: { type: String, required: true },
  variation: variationSchema,
});

const reviewSchema = new mongoose.Schema({
  stars: { type: Number, required: true, min: 1, max: 5 }, // Limits star rating to 1-5
  date: { type: String, required: true },
  verified_purchase: { type: Boolean, required: true },
  manufacturer_replied: { type: Boolean, default: false },
  username: { type: String, required: true },
  user_url: { type: String, required: true },
  title: { type: String, required: true },
  review: { type: String, required: true },
  review_url: { type: String, required: true },
  total_found_helpful: { type: Number, default: 0 },
  images: [String],
  variation: variationSchema,
  video_url: { type: String },
});

const ratingSchema = new mongoose.Schema({
  average_rating: { type: Number, required: true, min: 0, max: 5 },
  total_ratings: { type: Number, required: true },
  filtered_total_ratings: { type: Number },
  total_reviews: { type: Number },
  filtered_total_reviews: { type: Number },
  "5_star_ratings": { type: Number, required: true },
  "5_star_percentage": { type: Number, required: true, min: 0, max: 100 },
  "4_star_ratings": { type: Number, required: true },
  "4_star_percentage": { type: Number, required: true, min: 0, max: 100 },
  "3_star_ratings": { type: Number, required: true },
  "3_star_percentage": { type: Number, required: true, min: 0, max: 100 },
  "2_star_ratings": { type: Number, required: true },
  "2_star_percentage": { type: Number, required: true, min: 0, max: 100 },
  "1_star_ratings": { type: Number, required: true },
  "1_star_percentage": { type: Number, required: true, min: 0, max: 100 },
});

const chatSchema = new mongoose.Schema({
  user_id: { type: String, required: true },
  ProductASIN: { type: String, required: true },
  productUrl: { type: String, required: true },
  exchanges: [exchangeSchema],
  product_name: { type: String, required: true },
  productCost: { type: String, required: true },
  productImages: { type: [String], required: true },
  ReviewSummary: { type: String, required: true },
  product: productSchema,
  ratings: ratingSchema,
  reviews: [reviewSchema],
}, {
  timestamps: true,  // Automatically add createdAt and updatedAt fields
});

// Compound index for efficient querying by user and product
chatSchema.index({ user_id: 1, ProductASIN: 1 }, { unique: true });

module.exports = mongoose.model("Chat", chatSchema);

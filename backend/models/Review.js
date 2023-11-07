const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  releaseDate: {
    type: String,
    required: true
  },
  reviewText: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

const Review = mongoose.model('Review', ReviewSchema);
module.exports = Review;

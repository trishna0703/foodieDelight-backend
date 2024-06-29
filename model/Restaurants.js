const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String, required: true },
  featuredImage:{
      type: String,
      required: true
  },
  phoneNumber: { type: String, required: true },
  email: { type: String, required: true },
  openingTime: { type: String, required: true },
  closingTime: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Restaurant = mongoose.model("Restaurant", restaurantSchema);

module.exports = Restaurant;

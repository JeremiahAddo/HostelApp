const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: mongoose.ObjectId,
      ref: "Category",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    gender:{
      type: String,
      enum: ['male', 'female'],
      required: true,
    },
    location:{
      type: String,
      
    },
    photo: {
      data: Buffer,
      contentType: String,
    },
    photo1: {
      data: Buffer,
      contentType: String,
    },
    photo2: {
      data: Buffer,
      contentType: String,
    },
    photo3: {
      data: Buffer,
      contentType: String,
    },
  
  },
  { timestamps: true }
);

module.exports = mongoose.model("Products", productSchema);

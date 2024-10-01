const mongoose = require("mongoose");
const db = require('../config/db');
const { Schema } = mongoose;

// Define the Blog schema
const blogSchema = new Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
    unique: true,
  },
  content: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    default: 'Admin',
  },
  views: {
    type: Number,
    default: 0,
  },
  readtime: {
    type: String,
    default:'0 mins',
  },
  publishedDate: {
    type: Date,
    default: Date.now,
  },
  keywords: [{ type: String, default: [] }],
}, { timestamps: true });

const BlogModel = db.model("Blog", blogSchema);

module.exports = BlogModel;
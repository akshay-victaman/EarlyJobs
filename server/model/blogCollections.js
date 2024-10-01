const mongoose = require("mongoose");
const db = require('../config/db');
const { Schema } = mongoose;

const blogsCollectionSchema = new Schema({
  blog_id: {
    type: String,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
    unique: true,
  },
  image: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  readtime: {
    type: String,
    default: '0 Mins',
  },
   keywords: [{ type: String, default: [] }],
  blogs: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Blog',
    },
  ],
}, { timestamps: true });

const BlogsCollectionModel = db.model("BlogsCollection", blogsCollectionSchema);

module.exports = BlogsCollectionModel;
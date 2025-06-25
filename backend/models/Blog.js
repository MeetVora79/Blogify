const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  author: String,
  text: String,
  createdAt: { type: Date, default: Date.now },
});

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    tags: {
      type: [String],
      required: true,
    },
    authorName: {
      type: String,
      required: true,
    },
    savedBy: {
      type: [String],
      default: [],
    },
    comments: [commentSchema],
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

blogSchema.pre("save", function (next) {
  this.primaryTag = this.tags?.[0] || "General";
  next();
});

module.exports = mongoose.model("Blog", blogSchema);

// This code defines a Mongoose schema for a blog post, including fields for title, content, tags, author ID, and creation date.

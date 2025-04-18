const express = require("express");
const Post = require("../models/Post");
const upload = require("../middlewares/upload");
const fs = require("fs");
const path = require("path");

const router = express.Router();

// Create Blog Post
router.post("/createblog", upload.single("image"), async (req, res) => {
  try {
    const { title, description } = req.body;
    const imagePath = req.file?.path;

    if (!imagePath) {
      return res.status(400).json({ error: "Image file is required." });
    }

    const newPost = new Post({
      title,
      description,
      image: imagePath,
    });

    await newPost.save();
    res.redirect("/blogs");
  } catch (err) {
    console.error("Create Error:", err.message);
    res.status(500).send("Internal Server Error");
  }
});

// Delete Blog Post with image
router.get("/delete/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).send("Post not found");

    const imagePath = path.join(__dirname, "..", post.image);

    // Delete image file
    fs.unlink(imagePath, async (err) => {
      if (err) {
        console.error("Image delete error:", err.message);
      } else {
        console.log("Image deleted:", post.image);
      }

      // Delete DB entry
      await Post.findByIdAndDelete(req.params.id);
      res.redirect("/blogs");
    });
  } catch (err) {
    console.error("Delete Error:", err.message);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;

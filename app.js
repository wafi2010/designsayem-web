const express = require("express");
const postRoutes = require("./routes/postRoutes");
const path = require("path");
const connectDb = require("./db");
const Post = require("./models/Post");
const app = express();

app.use(express.json());
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
// Serve static files (e.g., uploaded images)
// Static path for image access
app.use("/uploads", express.static("uploads"));
app.use(express.static(path.join(__dirname + "/public")));

// Connect to MongoDB
connectDb();

// Use the post routes for handling post data
app.use("/blog", postRoutes);

//Home route
app.get("/", async (req, res) => {
  res.render("index");
});

app.get("/blogs", async (req, res) => {
  try {
    const posts = await Post.find();
    res.render("blogs", { posts });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/admin/login", (req, res) => {
  res.render("login");
});

app.post("/admin/login", async (req, res) => {
  const { username, password } = req.body;

  const adminUserName = "adminSayem@gmail.com";
  const adminPassword = "ryzen5";
  let AllPosts = await Post.find();
  if (username === adminUserName && password === adminPassword) {
    res.render("admin", { posts: AllPosts });
  } else {
    // Login failed — show styled error
    res.status(401).send(`
      <style>
        body {
          background-color: #111827;
          color: #f87171;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          font-family: Arial, sans-serif;
        }
        .error-box {
          text-align: center;
        }
        h1 {
          font-size: 3rem;
        }
        a {
          margin-top: 20px;
          display: inline-block;
          color: #93c5fd;
          text-decoration: none;
        }
        a:hover {
          text-decoration: underline;
        }
      </style>
      <div class="error-box">
        <h1>🚫 404 - You Are Not Admin!</h1>
        <p>Access Denied.</p>
        <a href="/admin/login">← Go Back to Login</a>
      </div>
    `);
  }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

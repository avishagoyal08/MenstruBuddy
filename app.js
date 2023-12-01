const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/userDB", { useNewUrlParser: true, useUnifiedTopology: true });

const postSchema = {
  postTitle: String,
  postBody: String,
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
};

const userSchema = new mongoose.Schema({
  name: String,
  id: {
    type: String,
    unique: true
  },
  email: {
    type: String,
    unique: true
  },
  password: String,
  gender: String,
  likedPost: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', default: null }
});

const Post = mongoose.model("Post", postSchema);
const User = mongoose.model("User", userSchema);
const homeStartingContent = "Welcome to our website! Let's Open your Heart and Talk clearly on menstruation, PCOS, and many more.";

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(session({
  secret: "1234",
  resave: false,
  saveUninitialized: false
}));

app.use((req, res, next) => {
  res.locals.user = req.session.user;
  next();
});

app.get("/", function (req, res) {
  res.render("home");
});

app.get("/home", function (req, res) {
  res.render("home");
});


app.get("/gov", function (req, res) {
  res.render("gov");
});
app.get("/team", function (req, res) {
  res.render("team");
});
app.get("/exe", function (req, res) {
  res.render("exe");
});
app.get("/faq", function (req, res) {
  res.render("faq");
});
app.get("/data", function (req, res) {
  res.render("data");
});
app.get("/form", function (req, res) {
  res.render("form");
});
app.get("/period", function (req, res) {
  res.render("period");
});








app.get("/login", function (req, res) {
  res.render("login");
});

app.get("/register", function (req, res) {
  res.render("register");
});

app.get("/secrets", async function (req, res) {
  try {
    const posts = await Post.find({}).populate('likes');
    res.render("secrets", {
      homeContent: homeStartingContent,
      posts: posts
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/compose", function (req, res) {
  res.render("compose");
});

app.get("/cover", function (req, res) {
  res.render("cover");
});

app.get("/posts/:postId", async function (req, res) {
  const postId = req.params.postId;

  try {
    const post = await Post.findById(postId).populate('likes');
    if (!post) {
      return res.status(404).send("Post not found");
    }

    res.render("post", { post: post });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/register", async (req, res) => {
  const newUser = new User({
    name: req.body.name,
    id: req.body.userid,
    email: req.body.username,
    password: req.body.password,
    gender: req.body.gender
  });

  try {
    await newUser.save();
    req.session.user = newUser; // Log in the user automatically
    res.redirect("/cover");
    console.log("New user saved.");
  } catch (err) {
    if (err.code === 11000) {
      console.log("Email or ID must be unique. Please choose another email or ID.");
      res.render("register", { error: "Email or ID must be unique. Please choose another email or ID." });
    } else {
      console.log(err);
    }
  }
});

app.post("/login", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  try {
    const foundUser = await User.findOne({ email: username });
    if (foundUser && foundUser.password === password) {
      req.session.user = foundUser; // Log in the user automatically
      res.redirect("/cover");
    } else {
      console.log("Incorrect password or email - reloading page");
      res.render("login", { error: "Incorrect password or email" });
    }
  } catch (err) {
    console.log(err);
  }
});

app.post("/compose", function (req, res) {
  const post = new Post({
    postTitle: req.body.postTitle,
    postBody: req.body.postBody
  });

  post.save()
    .then((doc) => {
      res.redirect("/secrets");
    })
    .catch((err) => {
      console.log(err);
      res.render("compose", { error: "Error saving the post" });
    });
});

app.post("/likePost/:postId", async (req, res) => {
  const postId = req.params.postId;

  if (!req.session.user || !req.session.user._id) {
    return res.status(401).json({ success: false, message: "User not authenticated" });
  }

  const userId = req.session.user._id;

  try {
    const user = await User.findById(userId);

    if (user.likedPost !== postId) {
      user.likedPost = postId;
      await user.save();

      const post = await Post.findById(postId);
      post.likes.push(userId);
      await post.save();

      res.json({ success: true });
    } else {
      res.json({ success: false, message: "You have already liked a post." });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

app.listen(3000, function () {
  console.log("Server started on port 3000.");
});
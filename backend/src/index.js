const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const axios = require("axios");

const User = require("./User");

const app = express();

app.use(express.json());
app.use(cors());

// User Endpoints
app.post("/user_register", async (req, res) => {
  const user = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password, // this should be hashed
    type: "user",
    dob: req.body.dob,
  });
  res.json(user);
});

app.post("/user_profile", async (req, res) => {
  const user = await User.findById(req.body.user_id);

  const vaccinations = [];
  const { data } = await axios.post(
    "https://node.deso.org/api/v0/get-posts-for-public-key",
    {
      PublicKeyBase58Check:
        "BC1YLjFkp38w85VhMMAkwyMx8BAQ9Y7zUKtvzLzrEyf7orrWruG4ccY",
      NumToFetch: 10,
    }
  );

  for (const post of data.Posts) {
    if (post.Body.startsWith("{")) {
      const postData = JSON.parse(post.Body);
      if (postData.patientName === user.name) {
        vaccinations.push(JSON.parse(post.Body));
      }
    }
  }
  res.json({ user, vaccinations });
});

app.post("/doctor_profile", async (req, res) => {
  const user = await User.findById(req.body.user_id);

  const vaccinations = [];
  const { data } = await axios.post(
    "https://node.deso.org/api/v0/get-posts-for-public-key",
    {
      PublicKeyBase58Check:
        "BC1YLjFkp38w85VhMMAkwyMx8BAQ9Y7zUKtvzLzrEyf7orrWruG4ccY",
      NumToFetch: 30,
    }
  );

  for (const post of data.Posts) {
    if (post.Body.startsWith("{")) {
      const postData = JSON.parse(post.Body);
      if (postData.physicianId === user._id.toString()) {
        vaccinations.push(JSON.parse(post.Body));
      }
    }
  }
  res.json({ user, vaccinations });
});

app.post("/doctor_register", async (req, res) => {
  const user = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password, // this should be hashed
    type: "doctor",
    dob: req.body.dob,
  });
  res.json(user);
});

app.post("/login", async (req, res) => {
  const users = await User.find({
    email: req.body.email,
    password: req.body.password,
  });
  if (users.length > 0) {
    res.json(users[0]);
    return;
  }
  res.sendStatus(401);
});

// app.post("/profile", async (req, res) => {
//   const user = await User.findById(req.body.user_id);
//   res.json(user);
// });

app.listen(8000, () => {
  console.log("Server started on port 8000");

  mongoose
    .connect("mongodb://localhost:27017/patienti")
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("Could not connect to MongoDB", err));
});

const express = require('express');
const mongoose = require('mongoose');
const User = require('./model/user'); 
var cors = require('cors');

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(cors());

mongoose.connect('mongodb://localhost:27017/webservice')
  .then(() => {
    console.log("Connected to database");
  })
  .catch((error) => {
    console.error("Database connection error:", error);
  });

app.post('/signup', async (req, res) => {
  const { name, email, phone, password } = req.body;
  try {
    const user = new User({ name, email, phone, password });
    await user.save();
    res.status(200).json({ message: 'User created successfully', user });
  } catch (error) {
    res.status(400).json({ message: 'Error creating user', error });
  }
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const currentUser = await User.findOne({ email: email });

    if (!currentUser) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    if (password === currentUser.password) {
      res.status(200).json({
        success: true,
        message: "Logged in successfully",
        name: currentUser.name,
        email: currentUser.email,
        phone: currentUser.phone,
        avatar: currentUser.profilepic,
      });
    } else {
      res.status(401).json({ success: false, message: "Password is incorrect" });
    }

  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Server error", error: err });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

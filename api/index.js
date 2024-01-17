const express = require("express");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const mongoose = require("mongoose");
const cors = require("cors");
const nodeMailer = require("nodemailer");
const User = require("./models/User");
const port = 3000;

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

mongoose
  .connect(
    "mongodb+srv://amansiddiqui:amansiddiqui@cluster0.xal67x8.mongodb.net/"
  )
  .then(() => {
    console.log("DB is connected...");
  })
  .catch((err) => {
    console.log("Error connecting to DB. ", err);
  });

// function to send email for verification
async function sendEmailForVerification(email, verificationToken) {
  // create a nodemailer transport
  const transporter = nodeMailer.createTransport({
    service: "gmail",
    auth: {
      user: "justalearner3@gmail.com",
      pass: "zvbexgyrcemyciwt",
    },
  });

  // compose the email message
  const mailOptions = {
    from: "amazon.com",
    to: email,
    subject: "Email Verification",
    text: `Please click on the following link to verify your email: http://localhost:3000/verify/${verificationToken}`,
  };

  // send the email
  try {
    await transporter.sendMail(mailOptions);
  } catch (err) {
    console.log("Error sending verification email: ", err);
  }
}

const generateSecretKey = () => {
  const secretKey = crypto.randomBytes(32).toString("hex");
  return secretKey;
};

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    // check if the user entered correct email and password
    if (!user || user.password !== password) {
      return res.status(400).json({ message: "Invalid email or password!" });
    }
    const secretKey = generateSecretKey();
    const token = jwt.sign({ user_id: user._id }, secretKey);
    return res.status(200).json({ token });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Something went wrong while logging." });
  }
});

app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  const existingEmail = await User.findOne({ email });

  if (existingEmail) {
    return res
      .status(500)
      .json({ message: "User already exists with this email." });
  }

  const newUser = new User({ name, email, password });
  newUser.verificationToken = crypto.randomBytes(20).toString("hex");
  try {
    await newUser.save();
    sendEmailForVerification(newUser.email, newUser.verificationToken);
    return res
      .status(200)
      .json({ message: "Verification mail has been sent." });
  } catch (err) {
    return res.status(500).json({ message: "Something went wrong." });
  }
});

app.get("/verify/:token", async (req, res) => {
  try {
    const verificationToken = req.params.token;

    const user = await User.findOne({ verificationToken });
    if (!user) {
      return res
        .status(400)
        .json({ message: "Verification Token is Invalid!" });
    }
    if (user.verified) {
      return res
        .status(200)
        .json({ message: "Email has already been verified." });
    }

    user.verified = true;
    user.verificationToken = undefined;
    await user.save();
    res.status(200).json({ message: "Email has been successfully verified." });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Something went wrong while verification" });
  }
});

app.listen(port, () => {
  console.log("App is listening on Port: ", port);
});

// endpoint to save addresses in the backend

app.post("/addresses", async (req, res) => {
  try {
    const { userId, address } = req.body;
    console.log("userId is", userId);
    const user = await User.findById(userId);

    if (!user) {
      console.log("couldn't find user with userid ", userId);
      return res.status(406).json({ message: "User not found." });
    }
    console.log(address);
    user.addresses.push(address);

    await user.save();
    return res.status(202).json({ message: "Address has been saved." });
  } catch (err) {
    return res.status(500).json({ message: "Something went wrong" });
  }
});

// endpoint to get the addresses

app.get("/addresses/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    const addresses = user.addresses;

    return res.status(200).json({ addresses });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Something went wrong" });
  }
});

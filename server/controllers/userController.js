import { User } from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import asyncWrapper from "../middlewares/asyncWrapper.js";

// Signup Route
const signup = asyncWrapper(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "Please enter all the credentials" });
  }

  const usere = await User.findOne({ email });
  const usern = await User.findOne({ username });
  if (usere || usern) {
    return res
      .status(400)
      .json({ success: false, message: "User already exists!" });
  }

  const hashpassword = await bcrypt.hash(password, 11);
  const newUser = new User({ username, email, password: hashpassword });
  await newUser.save();

  return res
    .status(201)
    .json({
      success: true,
      message: "User registered successfully.",
      user: newUser,
    });
});

// Login Route
const login = asyncWrapper(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "Please enter all the credentials" });
  }

  const user = await User.findOne({ email });
  if (!user) {
    return res
      .status(404)
      .json({ success: false, message: "User is not registered!" });
  }

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    return res
      .status(401)
      .json({ success: false, message: "Invalid credentials!" });
  }

  const payload = { id: user._id, username: user.username, email: email };
  const token = jwt.sign(payload, process.env.KEY, { expiresIn: "2h" });

  const options = {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000,
  };

  return res
    .status(200)
    .cookie("token", token, options)
    .json({
      success: true,
      message: "Login successful.",
      user: { username: user.username, email: user.email },
      token,
    });
});

// Logout Route
const logout = asyncWrapper(async (req, res) => {
  res
    .status(200)
    .cookie("token", "", { expires: new Date(0) })
    .json({ success: true, message: "Logout successful." });
});

// Check Auth Route
const checkAuth = asyncWrapper(async (req, res) => {
  const token = req.cookies.token; // Get the token from cookies

  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "No token provided" });
  }

  jwt.verify(token, process.env.KEY, (err, payload) => {
    if (err) {
      // console.log("Error during token verification: ", err);
      return res
        .status(401)
        .json({ success: false, message: "Token verification failed" });
    } else {
      // console.log("Token verified successfully");
      req.userID = payload.id;
      req.username = payload.username;
      req.email = payload.email;

      return res.status(200).json({
        success: true,
        message: "You are authenticated!",
        user: {
          userID: req.userID,
          username: req.username,
          email: req.email,
        },
      });
    }
  });
});

const checkUsernameExists = asyncWrapper(async (req, res) => {
  const { username } = req.params;
  const user = await User.findOne({ username });

  if (user) {
    return res.status(200).json({ success: true, exists: true });
  } else {
    return res.status(404).json({ success: false, exists: false });
  }
});

export default {
  signup,
  login,
  logout,
  checkAuth,
  checkUsernameExists,
};

// router.post("/forgot-password", async (req, res) => {
//   try {
//     const { email } = req.body;
//     const user = await User.findOne({ email });
//     if (!user) {
//       console.log("User not found");
//       return res.json({ message: "user not registered" });
//     }
//     const token = jwt.sign({ id: user._id }, process.env.KEY, {
//       expiresIn: "5m",
//     });

//     var transporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         user: "captainamerica8642@gmail.com",
//         pass: "ewofhhpzyototlub",
//       },
//     });
//     const encodedToken = encodeURIComponent(token).replace(/\./g, "%2E");
//     var mailOptions = {
//       from: "captainamerica8642@gmail.com",
//       to: email,
//       subject: "Reset Password",
//       text: `http://localhost:5173/resetPassword/${encodedToken}`,
//     };

//     transporter.sendMail(mailOptions, function (error, info) {
//       if (error) {
//         return res.json({ message: "error sending email" });
//       } else {
//         return res.json({ status: true, message: "email sent" });
//       }
//     });
//   } catch (err) {
//     console.log(err);
//   }
// });

// router.post("/reset-password/:token", async (req, res) => {
//   try {
//     const { token } = req.params;
//     const { password } = req.body;
//     const decoded = await jwt.verify(token, process.env.KEY);
//     const id = decoded.id;
//     const hashPassword = await bcryt.hash(password, 10);
//     await User.findByIdAndUpdate({ _id: id }, { password: hashPassword });
//     return res.json({ status: true, message: "updated password" });
//   } catch (err) {
//     return res.json("invalid token");
//   }
// });

import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
// import nodemailer from "nodemailer";

dotenv.config();

export const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).send("Please enter all the credentials");
    }

    const usere = await User.findOne({ email });
    const usern = await User.findOne({ username });
    if (usere || usern) {
      return res.json({ message: "User already exists!" });
    }

    const hashpassword = await bcrypt.hash(password, 11);
    const newUser = new User({
      username,
      email,
      password: hashpassword,
    });
    await newUser.save();

    return res.status(200).json({
      success: true,
      message: "User registed successfully.",
      newUser,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong!" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).send("Please enter all the credentials");
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ message: "User is not registered!" });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.json({ message: "Invalid credentials!" });
    }

    const token = jwt.sign(
      { id: user._id, username: user.username, email },
      process.env.KEY,
      {
        expiresIn: "6h",
      }
    );
    user.token = token;
    user.password = undefined;

    const options = {
      httpOnly: true, // Prevents JavaScript from accessing the cookie
      maxAge: 24 * 60 * 60 * 1000, // Cookie expiration in milliseconds (1 day)
    };

    return res
      .status(200)
      .cookie("token", token, options)
      .json({ success: true, message: "Login successful.", token });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong!" });
  }
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

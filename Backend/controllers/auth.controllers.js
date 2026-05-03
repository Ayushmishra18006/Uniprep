import express from "express";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import TokenBlacklist from "../models/tokenBlacklist.model.js";
import { sendEmail } from "../utils/sendEmail.js";

/**
 * @route - POST /api/auth/register
 * @description Register the user
 * @access public
 */
const registerUserController = async (req, res) => {
  try {
    const { username, email, password, age } = req.body;

    if (!username || !email || !password || !age) {
      return res.status(400).json({
        message: "Please provide username, email, password and age!",
      });
    }

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        message:
          "Password must be at least 6 characters long and include uppercase, lowercase, number, and special character!",
      });
    }

    if (age < 18) {
      return res.status(400).json({
        message: "User must be at least 18 years old!",
      });
    }

    const existingUser = await User.findOne({
      $or: [{ email: email.toLowerCase() }, { username }],
    });

    if (existingUser) {
      return res.status(409).json({
        message: "Username or email already exists!",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("STEP 1: Controller hit");

    const newUser = await User.create({
      username,
      email: email.toLowerCase(),
      password: hashedPassword,
      age,
    });
    console.log("STEP 2: User created");

     sendEmail(
      newUser.email,
      "Welcome to Uniprep 🎉",
      `
      <h2>Welcome to Uniprep 🚀</h2>
      <p>It's your one stop solution for all the courses and exams including college, GATE, CLAT, UPSC.</p>
      
      <p>No matter which field or year you belong to, Uniprep covers all your issues in one go with the help of a personalized AI assistant.</p>
    
      <p>We're excited to have you onboard!</p>
    
      <br/>
      <b>— Team Uniprep</b>
      `
    );
    console.log("STEP 3: Email triggered");

    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "15m",
    });

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "lax",
    });

    return res.status(201).json({
      message: "User registered successfully!",
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        createdAt: newUser.createdAt,
        updatedAt: newUser.updatedAt,
        createdAtFormatted: new Date(newUser.createdAt).toLocaleString(),
      },
      token,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong!",
      error: error.message,
    });
  }
};

/**
 * @route - POST /api/auth/login
 * @description Login existing user
 * @access public
 */
const loginUserController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required!",
      });
    }

    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      return res.status(400).json({
        message: "Invalid email or password!",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({
        message: "Invalid email or password!",
      });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "30m",
    });

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "lax",
    });

    // Remove the password from response
    const { password: _, ...userData } = user._doc;

    return res.status(200).json({
      message: "Login successful!",
      user: userData,
      token,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong!",
      error: error.message,
    });
  }
};

/**
 * @route - GET /api/auth/get-me
 * @description Get the current logged-in user information
 * @access private
 */
const getMeController = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId); // from JWT

    if (!user) {
      return res.status(404).json({
        message: "User not found!",
      });
    }

    return res.status(200).json({
      message: "User details fetched successfully!",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        createdAtFormatted: new Date(user.createdAt).toLocaleString(),
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong!",
      error: error.message,
    });
  }
};

/**
 * @route - GET /api/auth/logout
 * @description Clear the token from the user's cookie and add it to blacklist model
 * @access public
 */
const logoutUserController = async (req, res) => {
  try {
    const token = req.cookies?.token;

    if (!token) {
      return res.status(400).json({
        message: "No token found!",
      });
    }

    // Decode token to get expiry
    const decoded = jwt.decode(token);

    if (!decoded) {
      return res.status(400).json({
        message: "Invalid token!",
      });
    }

    // Save token in blacklist
    await TokenBlacklist.create({
      token,
      expiresAt: new Date(decoded.exp * 1000), // convert to ms
    });

    // Clear cookie
    res.clearCookie("token", {
      httpOnly: true,
      sameSite: "lax",
    });

    return res.status(200).json({
      message: "Logout successful!",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong!",
      error: error.message,
    });
  }
};

export {
  registerUserController,
  loginUserController,
  logoutUserController,
  getMeController,
};

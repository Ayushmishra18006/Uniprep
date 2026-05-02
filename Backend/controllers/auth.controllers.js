import express from "express";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

/**
 * @route - POST /api/auth/register
 * @description Register the user
 * @access public
 */
export const registerUserController = async (req, res) => {
  try {
    const { username, email, password, age } = req.body;

    if (!username || !email || !password || !age) {
      return res.status(400).json({
        message: "Please provide username, email, password and age!",
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

    const newUser = await User.create({
      username,
      email: email.toLowerCase(),
      password: hashedPassword,
      age,
    });

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
export const loginUserController = async (req, res) => {
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
export const getMeController = async () => {
  try {
    const user = await User.findById(req.user.id);
    res.status(200).json({
      message: "User details fetched succesfully!",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        createdAt: newUser.createdAt,
        updatedAt: newUser.updatedAt,
        createdAtFormatted: new Date(newUser.createdAt).toLocaleString(),
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong!",
      error: error.message,
    });
  }
};

export {registerUserController, loginUserController, getMeController};

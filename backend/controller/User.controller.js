import User from "../model/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"


export const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // check if user exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "User already exists" });
        }

        // hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // create user
        const user = new User({
            name,
            email,
            password: hashedPassword
        });

        await user.save();

        res.status(201).json({ message: "User created successfully" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
};

export const loging = async (req, res) => {
  try {
    console.log("BODY:", req.body);

    const { email, password } = req.body;
    const errormessage = "Invalid email or password";

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const user = await User.findOne({ email });
    console.log("USER:", user);

    if (!user) {
      return res.status(400).json({ success: false, message: errormessage });
    }

    const ispassEqual = await bcrypt.compare(password, user.password);

    if (!ispassEqual) {
      return res.status(400).json({ success: false, message: errormessage });
    }

    console.log("SECRET:", process.env.JWT_SECRET);

    const jwtToken = jwt.sign(
      { email: user.email, _id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.status(200).json({
      success: true,
      message: "Login successful",
      token: jwtToken,
      user: {
        name: user.name,
        email: user.email,
      },
    });

  } catch (error) {
    console.error("LOGIN ERROR:", error); // 👈 THIS WILL SOLVE EVERYTHING
    res.status(500).json({ success: false, message: "Server error" });
  }
};
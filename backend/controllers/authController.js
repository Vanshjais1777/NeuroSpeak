import { hash, compare } from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

export async function signup(req, res) {
    try {
        const { name, email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: "User already exists" });

        const hashedPassword = await hash(password, 10);
        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: "Signup successful" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export async function login(req, res) {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "Invalid credentials" });

        const isMatch = await compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
        res.status(200).json({ token, user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export async function getUserProfile(req, res) {
    try {
        const { userId } = req.body
        const user = await User.findById(userId).select("-password");
        res.json({ user, message: "User profile fetched successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

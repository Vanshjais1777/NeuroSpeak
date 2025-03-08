import { hash, compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import User, { findOne, findById } from "../models/User";

export async function signup(req, res) {
    try {
        const { name, email, password } = req.body;
        const existingUser = await findOne({ email });
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
        const user = await findOne({ email });
        if (!user) return res.status(400).json({ message: "Invalid credentials" });

        const isMatch = await compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

        const token = sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
        res.status(200).json({ token, user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export async function getUserProfile(req, res) {
    try {
        const user = await findById(req.userId).select("-password");
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

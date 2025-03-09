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

// ✅ Delete User
export async function deleteUserProfile(req, res) {
    try {
        const user = await User.findByIdAndDelete(req.body.id);
        if (!user) return res.status(404).json({ message: "User not found" });

        res.json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


// ✅ Create User
export async function createUserProfile(req, res) {
    try {
        const { name, email, password } = req.body;
        const userExists = await User.findOne({ email });

        if (userExists) return res.status(400).json({ message: "User already exists" });

        const newUser = await User.create({ name, email, password });
        res.status(201).json({ user: newUser, message: "User created successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// ✅ Read (Get Single User)
export async function getUserProfile(req, res) {
    try {
<<<<<<< HEAD
        const { userId } = req.body
        const user = await User.findById(userId).select("-password");
=======
        const user = await User.findById(req.body.id).select("-password");
        if (!user) return res.status(404).json({ message: "User not found" });

>>>>>>> 9bb97abdcdd65e488a1547a71155b7326a0bf943
        res.json({ user, message: "User profile fetched successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// ✅ Read (Get All Users)
export async function getAllUsers(req, res) {
    try {
        const users = await User.find().select("-password");
        res.json({ users, message: "All users fetched successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// ✅ Update User
export async function updateUserProfile(req, res) {
    try {
        const { name, email } = req.body;
        const user = await User.findByIdAndUpdate(req.body.id, { name, email }, { new: true });

        if (!user) return res.status(404).json({ message: "User not found" });

        res.json({ user, message: "User updated successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
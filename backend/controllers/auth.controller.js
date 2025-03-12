import { generateTokenAndSetCookie } from '../lib/utils/generateTokens.js';
import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
export const signUp = async (req, res) => {
    try {
        const { fullName, username, email, password } = req.body;

        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ error: "Invalid email format" });
        }

        const exsistingEmail = await User.findOne({ email });
        if (exsistingEmail) {
            return res.status(400).json({ error: "User with this email already exists" });
        }

        const exsistingUser = await User.findOne({ username });
        if (exsistingUser) {
            return res.status(400).json({ error: "Username is already taken" });
        }

        if (password.length < 6) {
            return res.status(400).json({ error: "Password must be atleast 6 characters long" });
        }

        //  Hash the password

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await User.create({
            username,
            fullName,
            email,
            password: hashedPassword,
        });

        if (newUser) {
            generateTokenAndSetCookie(newUser._id, res);
            await newUser.save();

            return res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                username: newUser.username,
                email: newUser.email,
                followers: newUser.followers,
                following: newUser.following,
                coverImg: newUser.coverImg,
            });
        }
        else {
            return res.status(400).json({ error: "Invalid User data" });
        }

    } catch (error) {
        console.log("Error in Sign up controller", error.message);
        return res.status(500).json({ error: "INTERNAL SERVER ERROR" });
    }
}
export const Login = async (req, res) => {
    try {

        const { username, password } = req.body;

        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ error: "Invalid username or password" });
        }
        const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");
        if (!isPasswordCorrect) {
            return res.status(400).json({ error: "Invalid username or password" });
        }

        generateTokenAndSetCookie(user._id, res);

        return res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            username: user.username,
            email: user.email,
            followers: user.followers,
            following: user.following,
            coverImg: user.coverImg,
        });

    } catch (error) {
        console.log("Error in Login controller", error.message);
        return res.status(500).json({ error: "INTERNAL SERVER ERROR" });
    }
}
export const Logout = async (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 });
        return res.status(200).json({ message: "Logged Out Successfully" });
    } catch (error) {
        console.log("Error in Logout controller", error.message);
        return res.status(500).json({ error: "INTERNAL SERVER ERROR" });
    }
}

export const getMe = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select("-password");
        return res.status(200).json(user);
    } catch (error) {
        console.log("Error in getMe controller", error.message);
        return res.status(500).json({ error: "INTERNAL SERVER ERROR" });
    }
}
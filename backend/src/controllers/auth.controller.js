import User from "../models/User.js";
import HTTPError from "../utils/HTTPError.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"; 

// Registration
export const register = async (req, res, next) => {
    try {
        const { name, email, password, confirmPassword, role } = req.body; 

        if (!name || !email || !password || !confirmPassword) {
            return next(new HTTPError(400, "All fields are required"));
        }

        if (password !== confirmPassword) {
            return next(new HTTPError(400, "Passwords do not match"));
        }

        if (password.length < 6) {
            return next(new HTTPError(400, "Password must be at least 6 characters"));
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return next(new HTTPError(400, "User already exists"));
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({ 
            name, 
            email, 
            password: hashedPassword,
            role: role || "user" 
        });

        const { password: _pw, ...userData } = user.toObject();

        res.status(201).json({ success: true, data: userData });

    } catch (err) { next(err); }
};
// Login
export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return next(new HTTPError(400, "Email and password are required"));
        }

        const user = await User.findOne({ email });
        if (!user) {
            return next(new HTTPError(401, "Wrong email or password"));
        }

       
        const isMatched = await bcrypt.compare(password, user.password);
        if (!isMatched) {
            return next(new HTTPError(401, "Wrong email or password"));
        }

      
       const accessToken = jwt.sign(
    { userId: user._id, role: user.role },
    process.env.JWT_ACCESS_TOKEN_SECRET,
    { expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRES_IN }
);

        const { password: _pw, ...safeUser } = user.toObject();

        return res.status(200).json({
            success: true,
            message: "Logged in successfully",
            accessToken,
            user: safeUser
        });

    } catch (err) { next(err); }
};
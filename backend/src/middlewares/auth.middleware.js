import jwt from "jsonwebtoken";
import HttpError from "../utils/HttpError.js";

export const protect = (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) return next(new HttpError(401, "Not authorized"));

        const decoded = jwt.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return next(new HttpError(401, "Invalid token"));
    }
};

export const adminOnly = (req, res, next) => {
    if (req.user.role !== "admin") {
        return next(new HttpError(403, "Admins only"));
    }
    next();
};
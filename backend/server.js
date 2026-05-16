import app from './src/app.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const port = process.env.PORT || 3000;


mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("Connected to MongoDB");
        app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });
    })
    .catch((err) => {
        console.error("DB connection failed:", err.message);
        process.exit(1);
    });
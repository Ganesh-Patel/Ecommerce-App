import express from 'express';
import cors from 'cors';
import connectDB from './Config/connectToDatabase.js';
import routes from './Routes/userProfileRoute.js';
import dotenv from 'dotenv/config';
import cookieParser from "cookie-parser";

const corsOptions = {
    origin: 'http://localhost:5173',  // Your frontend origin
    credentials: true, // This allows the server to accept cookies
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"], // Allowed methods
    
  };

const app = express();
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use('/profile-picture', express.static("profilePics"));
app.use(express.urlencoded({ extended: true }));
connectDB();

app.use('/api',routes);

const PORT = process.env.PORT || 3006;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
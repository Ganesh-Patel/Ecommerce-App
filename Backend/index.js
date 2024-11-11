import express from 'express';
import cors from 'cors';
import connectDB from './Config/connectToDatabase.js';
import UserRouter from './Routes/userProfileRoute.js';
import ProductRouter from './Routes/ProductRouter.js';
import ReviewRouter from './Routes/ReviewRouter.js'
import dotenv from 'dotenv/config';
import cookieParser from "cookie-parser";
import CartRouter from './Routes/CartRouter.js';
import CouponRouter from './Routes/CouponsRouter.js';
import addressRoutes from './Routes/addressRoutes.js'
import orderRouter from './Routes/orderRoutes.js';

const allowedOrigins = [
  'http://localhost:5173', 
  'https://apni-shop-eight.vercel.app' 
];

const corsOptions = {
  origin: function (origin, callback) {
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
          callback(null, true);
      } else {
          callback(new Error('Not allowed by CORS'));
      }
  },
  credentials: true, 
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
};

const app = express();
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use('/profile-picture', express.static("profilePics"));
app.use(express.urlencoded({ extended: true }));
connectDB();

app.use('/api/user',UserRouter);
app.use('/api/product',ProductRouter);
app.use('/api/review',ReviewRouter)
app.use('/api/cart',CartRouter)
app.use('/api/addresses', addressRoutes);
app.use('/api/coupons',CouponRouter)
app.use('/api/orders',orderRouter)

const PORT = process.env.PORT || 3006;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

app.use((err, req, res, next) => {
  console.error(err.stack);
  if (err.status) {
      res.status(err.status).json({ message: err.message });
  } else {
      res.status(500).json({ message: 'Internal Server Error' });
  }
});
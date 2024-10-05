import express from "express";
import {
  createCoupon,
  getAllCoupons,
  getCouponById,
  updateCoupon,
  deleteCoupon,
} from "../Controllers/CouponsController.js";
import authMiddleware from "../Middleware/authMiddleware.js";

const CouponRouter = express.Router();

CouponRouter.post("/create-coupon",authMiddleware, createCoupon);
CouponRouter.get("/get-coupons",authMiddleware, getAllCoupons);
CouponRouter.get("/get-single-coupon/:id", authMiddleware,getCouponById);
CouponRouter.put("/update-coupon/:id",authMiddleware, updateCoupon);
CouponRouter.delete("/delete/:id",authMiddleware, deleteCoupon);

export default CouponRouter;

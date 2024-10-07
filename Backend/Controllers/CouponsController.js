import Coupon from "../Models/couponModel.js";

// Create a new coupon
export const createCoupon = async (req, res) => {
  try {
    const { code, discount, isPercentage, expiryDate, isActive, minimumPurchaseAmount, usageLimit } = req.body;

    const newCoupon = new Coupon({
      code,
      discount,
      isPercentage,
      expiryDate,
      isActive,
      minimumPurchaseAmount,
      usageLimit,
    });

    await newCoupon.save();
    return res.status(201).json({ message: "Coupon created successfully", coupon: newCoupon });
  } catch (error) {
    console.error('Error creating coupon:', error);
    return res.status(500).json({ message: "Error creating coupon" });
  }
};

// Get all coupons
export const getAllCoupons = async (req, res) => {
  try {
    const coupons = await Coupon.find();
    return res.status(200).json(coupons);
  } catch (error) {
    console.error('Error fetching coupons:', error);
    return res.status(500).json({ message: "Error fetching coupons" });
  }
};

// Get a single coupon by ID
export const getCouponById = async (req, res) => {
  try {
    const { id } = req.params;
    const coupon = await Coupon.findById(id);
    if (!coupon) {
      return res.status(404).json({ message: "Coupon not found" });
    }
    return res.status(200).json(coupon);
  } catch (error) {
    console.error('Error fetching coupon:', error);
    return res.status(500).json({ message: "Error fetching coupon" });
  }
};

// Update a coupon by ID
export const updateCoupon = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const updatedCoupon = await Coupon.findByIdAndUpdate(id, updatedData, { new: true });

    if (!updatedCoupon) {
      return res.status(404).json({ message: "Coupon not found" });
    }
    return res.status(200).json({ message: "Coupon updated successfully", coupon: updatedCoupon });
  } catch (error) {
    console.error('Error updating coupon:', error);
    return res.status(500).json({ message: "Error updating coupon" });
  }
};

// Delete a coupon by ID
export const deleteCoupon = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedCoupon = await Coupon.findByIdAndDelete(id);
    if (!deletedCoupon) {
      return res.status(404).json({ message: "Coupon not found" });
    }
    return res.status(200).json({ message: "Coupon deleted successfully" });
  } catch (error) {
    console.error('Error deleting coupon:', error);
    return res.status(500).json({ message: "Error deleting coupon" });
  }
};

export const validateCoupon = async (req, res) => {
    try {
        const {couponCode, totalPrice } = req.body;
        console.log(couponCode)

        // Find the coupon in the database
        const coupon = await Coupon.findOne({ code: couponCode.toUpperCase() });

        // Check if coupon exists
        if (!coupon) {
            return res.status(404).json({ message: 'Coupon not found' });
        }

        // Check if the coupon is active
        if (!coupon.isActive) {
            return res.status(400).json({ message: 'Coupon is not active' });
        }

        // Check if the coupon has expired
        if (new Date() > coupon.expiryDate) {
            return res.status(400).json({ message: 'Coupon has expired' });
        }

        // Check if the total amount meets the minimum purchase requirement
        if (totalPrice < coupon.minimumPurchaseAmount) {
            return res.status(400).json({ message: `Minimum purchase amount of ${coupon.minimumPurchaseAmount} is required` });
        }

        // Check if the usage limit has been exceeded
        if (coupon.usageLimit !== null && coupon.usedCount >= coupon.usageLimit) {
            return res.status(400).json({ message: 'Coupon usage limit has been reached' });
        }
        // If all checks pass, return the discount
        return res.status(200).json({
            message: 'Coupon is valid',
            isValid: true,
            discount: coupon.discount,
            isPercentage: coupon.isPercentage,
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

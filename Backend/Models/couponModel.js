import { Schema, model } from "mongoose";

const couponSchema = new Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
    },
    discount: {
      type: Number,
      required: true,
    },
    isPercentage: {
      type: Boolean,
      default: false,
    },
    expiryDate: {
      type: Date,
      default: function () {
        return new Date(Date.now() + 21 * 24 * 60 * 60 * 1000);
      },
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    applicableProducts: [
      {
        type: Schema.Types.ObjectId,
        ref: "product",
      },
    ],
    applicableCategories: [
        {
          type: String, 
          required: true,
        },
      ],
    minimumPurchaseAmount: {
      type: Number,
      default: 0,
    },
    usageLimit: {
      type: Number,
      default: null,
    },
    usedCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const couponModel = model("Coupon", couponSchema);

export default couponModel;
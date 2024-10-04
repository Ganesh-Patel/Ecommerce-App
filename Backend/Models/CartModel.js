import { Schema, model } from "mongoose";

const cartSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "user", 
      required: true,
    },
    products: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: "product", 
          required: true,
        },
        price: {
          type: Number, 
          required: true,
        },
        count: {
          type: Number,
          required: true,
          min: 1, 
        },
        attributes: [
          {
            type: String,
            value: String,
          },
        ],
      },
    ],
    cartTotal: {
        type: Number,
        default: 0,
      },
      discount: {
        type: Number,
        default: 0,
      },
      flatDiscount: {
        type: Number, // Flat discount amount, like 100, 200, etc.
        default: 0,
      },
      discountCode: {
        type: String,
        default: null,
      },
      expiresAt: {
        type: Date,
        default: () => new Date(+new Date() + 30*24*60*60*1000), // Expires in 30 days
        index: { expires: '30d' }, // TTL index to auto-delete the cart after 30 days
      },
  },
  { timestamps: true }
);
// Calculate the total value of the cart
cartSchema.methods.calculateCartTotal = function () {
    const productTotal = this.products.reduce((total, product) => {
      return total + product.price * product.count;
    }, 0);

    const percentageDiscountAmount = this.discount > 0 ? (productTotal * this.discount) / 100 : 0;

    const flatDiscountAmount = this.flatDiscount > 0 ? this.flatDiscount : 0;
  
    this.cartTotal = productTotal - percentageDiscountAmount - flatDiscountAmount;
  
    return this.cartTotal;
  };
  
  cartSchema.methods.applyDiscount = function (code, discountValue, type = 'percentage') {
    this.discountCode = code;

    if (type === 'percentage') {
      this.discount = discountValue;
      this.flatDiscount = 0; 
    } else if (type === 'flat') {
      this.flatDiscount = discountValue;
      this.discount = 0; 
    }
  
    this.calculateCartTotal();
  };
  
const cartModel = model("Cart", cartSchema);
export default cartModel;

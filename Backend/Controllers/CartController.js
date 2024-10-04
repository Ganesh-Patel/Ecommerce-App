import mongoose from 'mongoose';
import  Cart from '../Models/CartModel.js'; 
import { productModel as Product } from '../Models/ProductModel.js';

// Add product to cart
export const addToCart = async (req, res) => {
  try {
    const userId = req.user._id; // Extract the user ID from the authenticated request
    const { productId, quantity, attributes } = req.body; // Expecting product ID, quantity, and optional attributes in request body

    // Fetch the product details from the database
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Check if the cart already exists for the user
    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      // If the cart doesn't exist, create a new cart for the user
      cart = new Cart({ user: userId, products: [] });
    }

    // Check if the product already exists in the cart
    const existingProductIndex = cart.products.findIndex(p => p.product.toString() === productId);

    if (existingProductIndex > -1) {
      // If the product already exists, update the quantity
      cart.products[existingProductIndex].count += quantity;
    } else {
      // Otherwise, add the new product to the cart
      cart.products.push({
        product: productId,
        price: product.price,
        count: quantity,
        attributes: attributes || []
      });
    }

    // Recalculate the cart total
    cart.calculateCartTotal();

    // Save the updated cart
    await cart.save();

    return res.status(200).json({ message: 'Product added to cart', cart });
  } catch (error) {
    console.error('Error adding product to cart:', error);
    return res.status(500).json({ message: 'An error occurred while adding to the cart' });
  }
};

// Get user cart
export const getCart = async (req, res) => {
  try {
    const userId = req.user._id; // Extract the user ID from the authenticated request

    // Find the user's cart
    const cart = await Cart.findOne({ user: userId }).populate('products.product'); // Populate product details

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    return res.status(200).json({ cart });
  } catch (error) {
    console.error('Error fetching cart:', error);
    return res.status(500).json({ message: 'An error occurred while fetching the cart' });
  }
};

// Remove product from cart
export const removeFromCart = async (req, res) => {
  try {
    const userId = req.user._id;
    const { productId } = req.body;  

    console.log('removing this product from the cart ',productId);

    // Find the user's cart
    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    const productObjectId =new mongoose.Types.ObjectId(productId);

    // Ensure the product exists in the cart
    const productExists = cart.products.some(p => p.product.equals(productObjectId));
    
    if (!productExists) {
      return res.status(404).json({ message: 'Product not found in cart' });
    }
    // Remove the product from the cart
    cart.products = cart.products.filter(p => p.product.equals(productObjectId));
    // Recalculate the cart total
    cart.calculateCartTotal();
    // Save the updated cart
    await cart.save();

    return res.status(200).json({ message: 'Product removed from cart', cart });
  } catch (error) {
    console.error('Error removing product from cart:', error);
    return res.status(500).json({ message: 'An error occurred while removing the product from the cart' });
  }
};


// Clear the cart
export const clearCart = async (req, res) => {
  try {
    const userId = req.user._id; // Extract the user ID from the authenticated request

    // Find the user's cart
    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    // Clear all products in the cart
    cart.products = [];

    // Recalculate the cart total (should be 0 now)
    cart.calculateCartTotal();

    // Save the cleared cart
    await cart.save();

    return res.status(200).json({ message: 'Cart cleared', cart });
  } catch (error) {
    console.error('Error clearing cart:', error);
    return res.status(500).json({ message: 'An error occurred while clearing the cart' });
  }
};

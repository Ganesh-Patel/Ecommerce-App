import mongoose from 'mongoose';
import  Cart from '../Models/CartModel.js'; 
import { productModel as Product } from '../Models/ProductModel.js';

// Add product to cart
export const addToCart = async (req, res) => {
  try {
    const userId = req.user._id; 
    const { productId, quantity, attributes } = req.body; 

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
    const updatedCart=await Cart.findOne({ user: userId }).populate('products.product');

    return res.status(200).json({ message: 'Product added to cart', updatedCart });
  } catch (error) {
    console.error('Error adding product to cart:', error);
    return res.status(500).json({ message: 'An error occurred while adding to the cart' });
  }
};

// Get user cart
export const getCart = async (req, res) => {
  try {
    const userId = req.user._id; 
    console.log('user id for which are you finding cart ',userId)
    const cart = await Cart.findOne({ user: userId }).populate('products.product'); 
    console.log(cart)

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' ,cart});
    }
    return res.status(200).json({ cart });
  } catch (error) {
    console.error('Error fetching cart:', error);
    return res.status(500).json({ message: 'An error occurred while fetching the cart' });
  }
};

export const updateQuantity = async (req, res) => {
  try {
    const userId = req.user._id; 
    console.log('user id ',userId)
    const { productId, newQuantity } = req.body; 

    console.log(productId, newQuantity, userId  )
    // Validate input
    if (!productId || typeof newQuantity !== 'number' || newQuantity < 0) {
      return res.status(400).json({ message: 'Invalid product ID or quantity' });
    }
    // Find the user's cart
    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }
    // Find the product in the cart
    const productIndex = cart.products.findIndex(item => item._id.toString() === productId);

    if (productIndex === -1) {
      return res.status(404).json({ message: 'Product not found in cart' });
    }

    // Update the quantity
    if (newQuantity === 0) {
      // Remove the product if the new quantity is zero
      cart.products.splice(productIndex, 1);
    } else {
      // Update the quantity
      console.log(productIndex)
      cart.products[productIndex].count = newQuantity;
    }
    // Save the updated cart
    await cart.save();
    const updatedCart=await Cart.findOne({ user: userId }).populate('products.product');

    return res.status(200).json({ message: 'Quantity updated successfully', updatedCart });
  } catch (error) {
    console.error('Error updating quantity:', error);
    return res.status(500).json({ message: 'An error occurred while updating the quantity' });
  }
};


export const removeFromCart = async (req, res) => {
  try {
    const userId = req.user._id;
    const { productId } = req.body; 
    // Find the user's cart
    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }
    const productObjectId = mongoose.Types.ObjectId.isValid(productId)
      ? new mongoose.Types.ObjectId(productId)
      : productId;

    // Ensure the product exists in the cart by comparing _id fields
    const productExists = cart.products.some(p => {
      console.log('Checking product:', p._id.toString(), 'against:', productObjectId.toString());
      return p._id.toString() === productObjectId.toString();
    });

    console.log(productExists);
    if (!productExists) {
      return res.status(404).json({ message: 'Product not found in cart' });
    }
    // Remove the product from the cart
    cart.products = cart.products.filter(p => p._id.toString() !== productObjectId.toString());
    cart.calculateCartTotal();
    await cart.save();
    const updatedCart = await Cart.findOne({ user: userId }).populate('products.product');

    return res.status(200).json({ message: 'Product removed from cart', updatedCart });
  } catch (error) {
    console.error('Error removing product from cart:', error);
    return res.status(500).json({ message: 'An error occurred while removing the product from the cart' });
  }
};

// Clear the cart
export const clearCart = async (req, res) => {
  try {
    const userId = req.user._id;
    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }
    cart.products = [];
    cart.calculateCartTotal();
    await cart.save();
    const updatedCart = await Cart.findOne({ user: userId }).populate('products.product');
    return res.status(200).json({ message: 'Cart cleared', updatedCart });
  } catch (error) {
    console.error('Error clearing cart:', error);
    return res.status(500).json({ message: 'An error occurred while clearing the cart' });
  }
};

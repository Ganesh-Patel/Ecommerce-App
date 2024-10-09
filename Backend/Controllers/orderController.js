// controllers/addressModelController.js
import {addressModel as Order} from '../Models/orderModal.js';


export const placeOrder = async (req, res) => {
    try {
      const {
        totalPrice,
        discountedPrice,
        paymentMethod,
        addressId,
        products,
      } = req.body;
      const userId = req.user._id;  // Extract user ID from auth middleware
  
      const orderId = `ORDER-${Date.now()}`;
      const orderDate = new Date();
  
      const newOrder = new Order({
        orderId,
        userId,
        totalPrice,
        discountedPrice: discountedPrice || totalPrice,
        paymentMethod,
        orderDate,
        addressId,
        products,
      });
  
      await newOrder.save();
  
      res.status(201).json({
        message: 'Order placed successfully',
        order: newOrder,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  // Get all orders (admin or user-specific)
  export const getAllOrders = async (req, res) => {
    try {
      const { userId, role } = req.user;
  
      const orders = role === 'admin' 
        ? await Order.find().populate('userId addressId products.productId')  // Populate user, address, and product details
        : await Order.find({ userId }).populate('addressId products.productId');
  
      res.status(200).json({
        message: 'Orders retrieved successfully',
        orders,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  // Get order by ID
  export const getOrderById = async (req, res) => {
    try {
      const { orderId } = req.params;
      const order = await Order.findOne({ orderId }).populate('userId addressId products.productId');
  
      if (!order) {
        return res.status(404).json({ message: 'Order not found' });
      }
  
      res.status(200).json({
        message: 'Order retrieved successfully',
        order,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  // Update order status
  export const updateOrderStatus = async (req, res) => {
    try {
      const { orderId } = req.params;
      const { status } = req.body;
  
      const order = await Order.findOneAndUpdate(
        { _id:orderId },
        { status },
        { new: true }
      ).populate('userId addressId products.productId');
  
      if (!order) {
        return res.status(404).json({ message: 'Order not found' });
      }
  
      res.status(200).json({
        message: 'Order status updated successfully',
        order,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  // Delete an order
  export const deleteOrder = async (req, res) => {
    try {
      const { orderId } = req.params;
  
      const order = await Order.findOneAndDelete({ orderId });
  
      if (!order) {
        return res.status(404).json({ message: 'Order not found' });
      }
  
      res.status(200).json({
        message: 'Order deleted successfully',
        order,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
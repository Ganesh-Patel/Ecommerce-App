// routes/orderRoutes.js
import express from 'express';
import authMiddleware from '../Middleware/authMiddleware.js';
import { placeOrder, getAllOrders, getOrderById, updateOrderStatus, deleteOrder } from '../Controllers/orderController.js';

const orderRouter = express.Router();

orderRouter.post('/place-order', authMiddleware, placeOrder);
orderRouter.get('/get-all-orders', authMiddleware, getAllOrders);
orderRouter.get('/get-order/:orderId', authMiddleware, getOrderById);
orderRouter.put('/update-order/:orderId', authMiddleware, updateOrderStatus);
orderRouter.delete('/delete-order/:orderId', authMiddleware, deleteOrder);

export default orderRouter;

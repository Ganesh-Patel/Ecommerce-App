import { Router } from 'express';
import authMiddleware from '../Middleware/authMiddleware.js';
import multer from 'multer';
import {
  addToCart,
  getCart,
  removeFromCart,
  clearCart
} from '../Controllers/CartController.js';

const storage = multer.memoryStorage();
const uploadPicsCloud = multer({ storage });

const CartRouter = Router();
CartRouter.post('/addproduct', authMiddleware, addToCart);
CartRouter.get('/getcart', authMiddleware, getCart);
CartRouter.post('/removeproduct', authMiddleware, removeFromCart);
CartRouter.post('/clearcart', authMiddleware, clearCart);

export default CartRouter;

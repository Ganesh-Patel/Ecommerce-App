// routes/addressRoutes.js
import express from 'express';
import {
    createAddress,
    getAllAddresses,
    getAddressById,
    updateAddress,
    deleteAddress,
} from '../Controllers/addressController.js';
import authMiddleware from '../Middleware/authMiddleware.js';

const addressRouter = express.Router();

addressRouter.post('/create',authMiddleware, createAddress);

addressRouter.get('/getallAdress/:userId',authMiddleware, getAllAddresses);
addressRouter.get('/getsingleaddress/:id',authMiddleware, getAddressById);

addressRouter.put('/update/:id',authMiddleware, updateAddress);

addressRouter.delete('/delete/:id',authMiddleware, deleteAddress);

export default addressRouter;

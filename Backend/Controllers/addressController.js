// controllers/addressController.js
import { addressModel } from '../Models/addressModel.js';


export const createAddress = async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            mobileNumber,
            street,
            city,
            state,
            country,
            zipCode,
            label,
            isForSelf
        } = req.body;

        console.log(req.user._id); 
        const userId = req.user._id; 

        const newAddress = new addressModel({
            firstName,
            lastName,
            mobileNumber,
            street,
            city,
            state,
            country,
            zipCode,
            label,
            isForSelf,
            user: userId.toString(),
        });
        await newAddress.save();
        res.status(201).json({message:"address Saved Sucessfully",newAddress}); 
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message }); 
    }
};


// Read all addresses for a specific user
export const getAllAddresses = async (req, res) => {

    const { userId } = req.params;
    try {
        const addresses = await addressModel.find({ user: userId});
        res.status(200).json(addresses);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

// Read a single address by ID
export const getAddressById = async (req, res) => {
    try {
        const address = await addressModel.findById(req.params.id);
        if (!address) {
            return res.status(404).json({ error: 'Address not found' });
        }
        res.status(200).json(address);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

// Update an address
export const updateAddress = async (req, res) => {
    try {
        const address = await addressModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!address) {
            return res.status(404).json({ error: 'Address not found' });
        }
        res.status(200).json(address);
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: error.message });
    }
};

// Delete an address
export const deleteAddress = async (req, res) => {
    try {
        const address = await addressModel.findByIdAndDelete(req.params.id);
        if (!address) {
            return res.status(404).json({ error: 'Address not found' });
        }
        res.status(204).send(); // No content to return
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

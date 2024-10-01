import {ReviewModel}  from '../Models/ReviewModel.js';
import  {productModel}  from '../Models/ProductModel.js';
import uploadToCloudinary from '../Services/uploadToCloudinary.js'
import mongoose from 'mongoose';

// Add a new review
export const addReview = async (req, res) => {
    console.log('Adding a review');
    try {
        const { productId, rating, comment } = req.body;

        // Validate input data
        if (!productId || !rating || !comment) {
            return res.status(400).json({ message: 'Product ID, rating, and comment are required' });
        }

        let reviewImageUrl = 'default.jpg';
        // Check if a file was uploaded
        if (req.file) {
            console.log('File received, starting Cloudinary upload');
            try {
                const uploadResult = await uploadToCloudinary(req.file.buffer);
                reviewImageUrl = uploadResult.secure_url;
                console.log('Uploaded image URL:', reviewImageUrl);
            } catch (uploadError) {
                console.error('Error during Cloudinary upload:', uploadError);
                return res.status(500).json({ message: 'Error uploading image to Cloudinary' });
            }
        }

        const userId = req.user._id; 
        console.log('Your user ID is:', userId);

        // Check if the product exists
        const product = await productModel.findById(productId);
        if (!product) {
            console.error('Product not found:', productId);
            return res.status(404).json({ message: 'Product not found' });
        }

        // Check if the user has already reviewed this product
        const existingReview = await ReviewModel.findOne({ productId, addedBy: userId });

        if (existingReview) {
            // Update the existing review
            existingReview.rating = rating;
            existingReview.comment = comment;
            existingReview.images = [reviewImageUrl]; // Update the image if provided
            await existingReview.save();
            console.log('Review updated successfully');

            // Update the product's average rating
            const allReviews = await ReviewModel.find({ productId });
            const totalRating = allReviews.reduce((sum, review) => sum + review.rating, 0); 
            const avgRating = (totalRating / allReviews.length).toFixed(1); 
            await productModel.findByIdAndUpdate(productId, { rating: avgRating });

            return res.status(200).json({ message: 'Review updated successfully', review: existingReview });
        } else {
            // Create a new review if it doesn't exist
            const newReview = new ReviewModel({
                productId,
                images: [reviewImageUrl],
                rating,
                comment,
                addedBy: userId
            });

            await newReview.save();

            // Update the product's average rating
            const allReviews = await ReviewModel.find({ productId });
            const totalRating = allReviews.reduce((sum, review) => sum + review.rating, 0); 
            const avgRating = (totalRating / allReviews.length).toFixed(1); 
            await productModel.findByIdAndUpdate(productId, { rating: avgRating });

            return res.status(201).json({ message: 'Review added successfully', review: newReview });
        }
    } catch (err) {
        console.error('Error adding review:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Get all reviews for a product (optional filtering by product)
export const getAllReview = async (req, res) => {
    try {
        const { id } = req.params; 

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid product ID" });
        }
        const reviews = await ReviewModel.find({ productId:new mongoose.Types.ObjectId(id) })
            .populate('addedBy', 'username email') 
            .populate('productId', 'name');
        res.status(200).json(reviews);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Get a single review by ID
export const getSingleReview = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid product ID" });
        }
        
        // Find review by ID
        const review = await ReviewModel.findById(id)
            .populate('addedBy', 'username email')
            .populate('productId', 'name');

        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }

        res.status(200).json(review);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Update a review by ID
export const updateReview = async (req, res) => {
    try {
        const { id } = req.params;
        const { rating, comment } = req.body;
        // Find review by ID and update it
        const updatedReview = await ReviewModel.findByIdAndUpdate(
            id,
            {
                rating,
                comment
            },
            { new: true } 
        );

        if (!updatedReview) {
            return res.status(404).json({ message: 'Review not found' });
        }

        res.status(200).json({ message: 'Review updated successfully', review: updatedReview });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Delete a single review by ID
export const deleteSingleReview = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedReview = await ReviewModel.findByIdAndDelete(id);

        if (!deletedReview) {
            return res.status(404).json({ message: 'Review not found' });
        }

        res.status(200).json({ message: 'Review deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

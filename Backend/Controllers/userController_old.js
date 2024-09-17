import express from 'express';
import userModel from '../Models/UserModel.js';
import dotenv from 'dotenv/config';
import sendEmail from '../Services/sendEmail.js'
import uploadToCloudinary from '../Services/uploadToCloudinary.js'


// Signup route
export const registerUser = async (req, res)  => {
    try {
        let { firstname, lastname, email, password, role } = req.body;
        let profilePicUrl = 'default.jpg'; 
        // Check if a file was uploaded
        if (req.file) {
            console.log('File received, starting Cloudinary upload');
            try {
                const uploadResult = await uploadToCloudinary(req.file.buffer);
                profilePicUrl = uploadResult.secure_url;   
            } catch (uploadError) {
                console.error('Error during Cloudinary upload:', uploadError);
                return res.status(500).send('Error uploading image to Cloudinary');
            }
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        password = hashedPassword;
        const user = new userModel({profilePicUrl,firstname, lastname, email, password, role });
        await user.save();       
        await sendEmail(email,firstname,lastname);
        console.log('User registered successfully');
        res.status(201).send('User signed up successfully!');
    } catch (error) {
        console.error('Error in saving user:', error);
        res.status(500).send('Internal Server Error');
    }
};


export const loginUser = async (req, res)  => {

    const { email, password } = req.body;

    try {
        const checkUser = await userModel.findOne({ email: email }).exec();

        if (!checkUser) {
            return res.status(404).json({ message: 'User not found or invalid credentials' });
        }
        const check = bcrypt.compare(password, checkUser.password);
        if (!check) res.status(404).json({ error: "Invalid Credentials" });

        const jwtToken=generateToken();
        console.log(generateToken());
        res.status(200).json({
            userName: checkUser.username,
            userEmail: checkUser.email,
            profileUrl: checkUser.profilePic,
            jwtToken:jwtToken
        });
    } catch (error) {
        // Handle any errors
        console.error(error);
        res.status(500).json({ message: 'An error occurred' });
    }
};


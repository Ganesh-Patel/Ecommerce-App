
import {userModel} from '../Models/UserModel.js';
import dotenv from 'dotenv/config';
import bcrypt from "bcrypt";
import sendEmail from '../Services/sendEmail.js'
import uploadToCloudinary from '../Services/uploadToCloudinary.js'
import { generateToken } from "../Services/tokenGenerate.js";

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
                console.log('profilepicurl',profilePicUrl)  
            } catch (uploadError) {
                console.error('Error during Cloudinary upload:', uploadError);
                return res.status(500).send('Error uploading image to Cloudinary');
            }
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        password = hashedPassword;
        console.log('profilepicurl',profilePicUrl) 
        const user = new userModel(
            {profilePic:profilePicUrl,
                firstname,
                 lastname, 
                 email,
                password,
                 role 
            });
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
    console.log('we get Your req and processing it ')
    const { email, password } = req.body;
    try {
        const checkUser = await userModel.findOne({ email: email }).exec();
        console.log(checkUser)

        if (!checkUser) {
            return res.status(404).json({ message: 'User not found or invalid credentials' });
        }
        const check = bcrypt.compare(password, checkUser.password);
        if (!check) return res.status(404).json({ error: "Invalid Credentials" });

        const jwtToken=generateToken(checkUser);
        console.log(generateToken(checkUser))

        res
        .cookie("auth_token", jwtToken, {
          httpOnly: true,
          secure: false, //as we are working with localhost, which runs on http, not on https
          sameSite: "lax",
          maxAge: 3600000,
        })
        .status(200)
        .json({
          message: "Login Successful",
            firstname: checkUser.firstname,
            lastname: checkUser.lastname,
            userEmail: checkUser.email,
            profileUrl: checkUser.profilePic,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred' });
    }
};

export const logOutUser=async (req,res)=>{
    console.log("now you are going to logged out")
    try {
        res.clearCookie("auth_token", {
            httpOnly: true,
            secure: false, // Same as when you set it during login
            sameSite: "none", // Match the sameSite attribute if you used it
            path: "/",       // Ensure you use the correct path
          });
        res.status(200).json({ message: "Logout successfully" });
      } catch (err) {
        res.status(500).json({ error: err });
    }
}

export function isUserLoggedIn(req, res) {
    res.json({ user: req.user });
  }



export const fetchUsers=async (req,res)=>{
    console.log("you are fetching all the users ")
    try {
        const allUsers = await userModel.find();
        console.log(allUsers)
        res.status(200).json({ message: "users fetched successfully" ,allUsers});
      } catch (err) {
        res.status(500).json({ error: err });
    }
}
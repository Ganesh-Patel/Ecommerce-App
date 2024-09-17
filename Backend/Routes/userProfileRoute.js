import express from 'express';
import {registerUser,loginUser} from '../Controllers/userController.js';
import multer from 'multer';



// Multer setup to process files in memory only
const storage = multer.memoryStorage(); 
const uploadPicsCloud = multer({ storage });

const router = express.Router();

// Route for signing up a user
router.post('/user/register', uploadPicsCloud.single('profilePic'), registerUser);
// Route for getting a user
router.post('/user/login', loginUser);


export default router;

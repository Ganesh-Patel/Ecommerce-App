import express from 'express';
import {registerUser,loginUser, logOutUser,isUserLoggedIn,fetchUsers} from '../Controllers/userController.js';
import  authMiddleware  from '../Middleware/authMiddleware.js';
import multer from 'multer';


// Multer setup to process files in memory only
const storage = multer.memoryStorage(); 
const uploadPicsCloud = multer({ storage });

const router = express.Router();

// Route for signing up a user
router.post('/user/register', uploadPicsCloud.single('profilePic'), registerUser);
// Route for getting a user
router.post('/user/login', loginUser);
router.get("/user/loggedIn", authMiddleware, isUserLoggedIn);
router.post('/user/logoutuser',logOutUser);
router.post('/user/updateuser', uploadPicsCloud.single('profilePic'), registerUser);
router.delete('/user/deleteuser',registerUser);
router.get('/user/fetchusers',fetchUsers)


export default router;

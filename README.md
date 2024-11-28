# E-commerce Platform  

Welcome to the **E-commerce Platform**, a robust and feature-rich application designed to elevate the online shopping experience. This platform offers dynamic interfaces for users and admins, secure transactions, and optimized checkout processes for an enjoyable shopping journey.  

---

## Live Demo  
[Live Demo](https://ecommerce-app-psi-seven.vercel.app/)  

---

## About the E-commerce Platform  

This platform is a modern solution for online shopping, integrating essential e-commerce features like user authentication, payment processing, and real-time order tracking. It ensures seamless operations and a delightful shopping experience for both customers and administrators.  

### Our Mission  
To create an intuitive and efficient e-commerce solution that simplifies online shopping for users and streamlines management for administrators.  

---

## Features  

- **Dynamic Interfaces**: Separate and optimized interfaces for users and admins.  
- **Authentication**: Secure login and signup with JSON Web Tokens (JWT).  
- **Wishlist**: Save favorite products for future purchases.  
- **Shopping Cart**: Add, edit, and remove products with ease.  
- **Payment Integration**: Seamless and secure payment processing using Razorpay.  
- **Dynamic Pages**: Real-time updates for About Us and FAQs pages.  
- **Coupons**: Redeemable discount codes for enhanced savings.  
- **Reviews**: Submit and view product reviews for informed purchasing.  
- **Order Status**: Real-time tracking of order progress.  
- **Express Rate Limiter**: Ensures API efficiency, reducing checkout time by 40%.  

---

## Technologies Used  

### Frontend  
- **React JS**: Interactive user interface development.  
- **Tailwind CSS**: Modern and responsive design.  
- **React Icons**: Enhanced UI with customizable icons.  

### Backend  
- **Node JS**: Server-side application logic.  
- **Express.js**: Backend framework for building APIs.  
- **MongoDB**: NoSQL database for efficient data management.  
- **Multer**: Middleware for file uploads.  
- **JSON Web Tokens (JWT)**: Secure user authentication.  

## Environment Variables

Below are the required environment variables for configuring and running the application:

### Cloudinary Configuration
These variables are used for managing image uploads and storage using Cloudinary:
- `CLOUDINARY_API_KEY` - API key for Cloudinary authentication.
- `CLOUDINARY_API_SECRET` - API secret for Cloudinary authentication.
- `CLOUDINARY_CLOUD_NAME` - Your Cloudinary account's cloud name.
- `CLOUDINARY_URL` - Complete Cloudinary URL (optional if the above three are set separately).

### Database Configuration
- `DB` - Database name.
- `MONGO_URI` - MongoDB connection string.

### Server Configuration
- `PORT` - Port number where the server will run (default: `3000`).
- `SECRET` - Secret key for JWT token generation.

### Email Configuration
These variables are required for email services:
- `EMAIL_USER` - Email address used for sending emails (e.g., for password resets).
- `EMAIL_PASS` - App password or SMTP password for the email account.


### Payment Integration  
- **Razorpay**: Fast and secure payment gateway integration.  

---

# API Documentation

This document contains all API endpoints used in the application.

---

## User Routes
| **Method** | **Endpoint**                                     | **Description**                                    |
|------------|--------------------------------------------------|----------------------------------------------------|
| `POST`     | `/api/user/register`                            | Register a new user with a profile picture.       |
| `POST`     | `/api/user/login`                               | User login.                                       |
| `GET`      | `/api/user/loggedIn`                            | Check if the user is logged in.                   |
| `POST`     | `/api/user/logoutuser`                          | Logout the user.                                  |
| `GET`      | `/api/user/verifyuser`                          | Verify a user's details.                          |
| `POST`     | `/api/user/forgotpassword/verifyemail`          | Verify if the email is registered.               |
| `POST`     | `/api/user/forgotpassword/sendotp`              | Send OTP to the user's email.                     |
| `POST`     | `/api/user/forgotpassword/validateotp`          | Validate the OTP sent to the user's email.        |
| `POST`     | `/api/user/forgotpassword/changepassword`       | Change the user's password.                       |
| `POST`     | `/api/user/updateuser`                          | Update user details with an optional profile picture. |
| `DELETE`   | `/api/user/deleteuser/:id`                      | Delete an existing user by ID.                    |
| `GET`      | `/api/user/fetchusers`                          | Fetch a list of users (search functionality available). |

---

## Product Routes
| **Method** | **Endpoint**                                     | **Description**                                    |
|------------|--------------------------------------------------|----------------------------------------------------|
| `POST`     | `/api/product/addproduct`                       | Add a new product with an image.                  |
| `GET`      | `/api/product/getallproducts`                   | Fetch all products.                               |
| `GET`      | `/api/product/getsingleproduct/:id`             | Fetch a single product by ID.                     |
| `DELETE`   | `/api/product/deletesingleproduct/:id`          | Delete a single product by ID.                    |
| `PATCH`    | `/api/product/editproduct/:id`                  | Update a product with an image.                   |
| `POST`     | `/api/product/addToWishlist/:productID`         | Add a product to the wishlist by product ID.      |
| `GET`      | `/api/product/wishlist/:userId`                 | Fetch all wishlist products for a user.           |

---

## Review Routes
| **Method** | **Endpoint**                                     | **Description**                                    |
|------------|--------------------------------------------------|----------------------------------------------------|
| `POST`     | `/api/review/addreview`                         | Add a review with an optional image.              |
| `GET`      | `/api/review/getallreview/:id`                  | Fetch all reviews for a product.                  |
| `GET`      | `/api/review/getsinglereview/:id`               | Fetch a single review by ID.                      |
| `DELETE`   | `/api/review/deletesinglereview/:id`            | Delete a review by ID.                            |
| `PATCH`    | `/api/review/editreview/:id`                    | Update a review by ID.                            |

---

## Cart Routes
| **Method** | **Endpoint**                                     | **Description**                                    |
|------------|--------------------------------------------------|----------------------------------------------------|
| `POST`     | `/api/cart/addproduct`                          | Add a product to the cart.                        |
| `GET`      | `/api/cart/getcart`                             | Fetch the user's cart.                            |
| `POST`     | `/api/cart/removeproduct`                       | Remove a product from the cart.                   |
| `POST`     | `/api/cart/clearcart`                           | Clear all products from the cart.                 |
| `PUT`      | `/api/cart/update-quantity`                     | Update the quantity of a product in the cart.     |

---

## Address Routes
| **Method** | **Endpoint**                                     | **Description**                                    |
|------------|--------------------------------------------------|----------------------------------------------------|
| `POST`     | `/api/addresses/create`                         | Create a new address for the user.                |
| `GET`      | `/api/addresses/getallAdress/:userId`           | Fetch all addresses for a specific user.          |
| `GET`      | `/api/addresses/getsingleaddress/:id`           | Fetch a single address by ID.                     |
| `PUT`      | `/api/addresses/update/:id`                     | Update an existing address by ID.                 |
| `DELETE`   | `/api/addresses/delete/:id`                     | Delete an address by ID.                          |

---

## Coupon Routes
| **Method** | **Endpoint**                                     | **Description**                                    |
|------------|--------------------------------------------------|----------------------------------------------------|
| `POST`     | `/api/coupons/create-coupon`                    | Create a new coupon.                              |
| `GET`      | `/api/coupons/get-coupons`                      | Fetch all coupons.                                |
| `POST`     | `/api/coupons/validate-coupon`                  | Validate a coupon code.                           |
| `GET`      | `/api/coupons/get-single-coupon/:id`            | Fetch details of a single coupon by ID.           |
| `PUT`      | `/api/coupons/update-coupon/:id`                | Update an existing coupon by ID.                  |
| `DELETE`   | `/api/coupons/delete/:id`                       | Delete a coupon by ID.                            |

---

## Order Routes
| **Method** | **Endpoint**                                     | **Description**                                    |
|------------|--------------------------------------------------|----------------------------------------------------|
| `POST`     | `/api/orders/place-order`                       | Place a new order.                                |
| `GET`      | `/api/orders/get-all-orders`                    | Fetch all orders.                                 |
| `GET`      | `/api/orders/get-order/:orderId`                | Fetch details of a single order by ID.            |
| `PUT`      | `/api/orders/update-order/:orderId`             | Update the status of an order by ID.              |
| `DELETE`   | `/api/orders/delete-order/:orderId`             | Delete an order by ID.                            |

---

## Screenshots  

### 1. Home Page  
![Home Page](https://github.com/user-attachments/assets/d9dea40d-8cb3-4d8e-95da-1ceb2fdb8230) 



*Explore products with a user-friendly interface.*  

### 2. Products   
![Products](https://github.com/user-attachments/assets/f864221b-1fa6-403b-bd0a-11fe41a22a60)  
*Manage your selected products easily.*   

---

## Deployment  

- **Backend**: Hosted on **Render** for scalable and reliable API services.  
- **Frontend**: Deployed on **Vercel** for fast and responsive access.  

---

## Author  

**Ganesh Patel**  
[GitHub Profile](https://github.com/Ganesh-Patel)  

---

## License  

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.  

---

© 2024 E-commerce Platform. All rights reserved.  

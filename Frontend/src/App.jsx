import React, { useContext, useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Home from './Components/Home/Home.jsx';
import Login from './Components/Auth/Login.jsx';
import SignUp from './Components/Auth/SignUp.jsx';
import { UserContext } from './Components/Context/UserContext.jsx';
import ProtectedRoute from './Components/Route/ProtectedRoute.jsx'; 
import UserAccount from './Components/Pages/UserAccount/UserAccount.jsx';
import AdminDashboard from './Components/Admin/AdminDashboard.jsx';
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import ManageUsers from './Components/ManageUsers/ManageUsers.jsx';
import ForgetPassword from './Components/Auth/ForgetPassword.jsx';
import VerifyEmail from './Components/Auth/VerifyEmail.jsx';

function App() {
  const { isLoggedIn } = useContext(UserContext);
  const location = useLocation(); 
  // Pages that should NOT have the Header and Footer
  const noHeaderFooterRoutes = ['/login', '/', '/signup', '/forgotpassword','/verifyemail','/VerifyEmail'];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Conditionally render Header and Footer if the route is not in noHeaderFooterRoutes */}
      {!noHeaderFooterRoutes.includes(location.pathname) && <Header />}
      <div className="flex-grow">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<SignUp />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgotpassword" element={<ForgetPassword />} />
          <Route path="/verifyemail" element={<VerifyEmail />} />

          {/* Protected Routes - only accessible if logged in */}
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/userAccount"
            element={
              <ProtectedRoute>
                <UserAccount />
              </ProtectedRoute>
            }
          />
          <Route
            path="/adminpanel"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

        <Route
            path="/users"
            element={
              <ProtectedRoute>
                <ManageUsers />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>

      {/* Conditionally render Footer */}
      {!noHeaderFooterRoutes.includes(location.pathname) && <Footer />}
    </div>
  );
}
export default App;

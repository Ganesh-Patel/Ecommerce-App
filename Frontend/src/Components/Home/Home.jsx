import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../Context/UserContext';
import { FaBars, FaTimes } from 'react-icons/fa';
import CryptoJS from 'crypto-js';
import { toast } from 'react-toastify';
import {logoutUser} from '../../utils/api';

function Home({setIsLoggedIn,isLoggedIn}) {


  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  

  useEffect(() => {
    const checkAuthToken = () => {
        const cookies = document.cookie.split(';');
        const authToken = cookies.find(cookie => cookie.trim().startsWith('auth_token='));

        if (authToken) {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
    };

    checkAuthToken();
    if (isLoggedIn) {
        navigate('/home'); 
    } else {
        navigate('/login'); 
    }
}, [isLoggedIn, navigate]);
 


  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
         <div className="flex-grow container mx-auto py-12">
          <h1 className="text-4xl font-bold text-center mb-8">Welcome to MyApp!</h1>
          <p className="text-center text-gray-700">Explore our features and projects, and feel free to reach out to us anytime.</p>
      </div>
    </div>
  );
}

export default Home;

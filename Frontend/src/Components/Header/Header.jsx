import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { logoutUser } from '../../utils/api'; 
import { UserContext } from '../../Components/Context/UserContext';

function Header() { 
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const {user ,setIsLoggedIn} = useContext(UserContext);
  console.log(user);
  const handleLogout = () => {
    logoutUser(setIsLoggedIn);
    toast('Logged out successfully');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return (
    <nav className="bg-teal-600 text-white shadow-md py-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <img
            src="https://e7.pngegg.com/pngimages/480/581/png-clipart-logo-e-commerce-digital-marketing-brand-trade-ecommerce-text-service.png"
            alt="App Logo"
            className="h-10 w-10 mr-2"
          />
          <span className="text-2xl font-bold">MyApp</span>
        </div>

        <div className="hidden md:flex space-x-8">
          <Link to="/home" className="hover:underline">Home</Link>
          <Link to="/adminpanel" className="hover:underline">About</Link>
          <Link to="/userAccount" className="hover:underline">Account</Link>
        </div>
        <div className="hidden md:flex items-center space-x-4">
          {user && (
            <div className="flex items-center">
              <img
                src={user.profileUrl || 'https://via.placeholder.com/40'}
                alt="User Profile"
                className="h-10 w-10 rounded-full"
              />
              <span className="ml-2">{user.name}</span>
            </div>
          )}
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>

        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-white focus:outline-none">
            {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-teal-700">
          <div className="flex flex-col items-center space-y-4 py-4">
            <Link to="/home" className="hover:underline" onClick={toggleMenu}>Home</Link>
            <Link to="/adminpanel" className="hover:underline" onClick={toggleMenu}>About</Link>
            <Link to="/userAccount" className="hover:underline" onClick={toggleMenu}>Account</Link>
            {user && (
              <div className="flex flex-col items-center">
                <img
                  src={user.profileUrl || 'https://via.placeholder.com/40'}
                  alt="User Profile"
                  className="h-10 w-10 rounded-full"
                />
                <span className="mt-2">{user.name}</span>
              </div>
            )}
            <button
              onClick={() => {
                handleLogout();
                toggleMenu();
              }}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Header;

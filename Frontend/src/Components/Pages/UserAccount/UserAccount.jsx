import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {UserContext} from '../../Context/UserContext';

function UserAccount() {
  const [profilePic, setProfilePic] = useState(null);
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const {user}=useContext(UserContext);

  // Fetch user details on component mount
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        console.log('user',user)
        setFirstname(user.firstname);
        setLastname(user.lastname);
        setEmail(user.userEmail);
        setProfilePic(user.profileUrl);
      } catch (error) {
        toast.error('Failed to load user data.');
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserDetails();
  }, []);

  // Handle profile update
  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append('firstname', firstname);
    formData.append('lastname', lastname);
    formData.append('email', email);
    if (profilePic) {
      formData.append('profilePic', profilePic);
    }

    try {
      const response = await axios.put('http://localhost:3006/api/user/updateProfile', formData);
      toast.success('Profile updated successfully!');
      console.log('Profile updated:', response.data);
    } catch (error) {
      toast.error('Failed to update profile.');
      console.error('Error updating profile:', error);
    }

    setLoading(false);
  };

  // Handle account deletion
  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action is irreversible.')) {
      try {
        await axios.delete('http://localhost:3006/api/user/delete');
        toast.success('Account deleted successfully.');
      } catch (error) {
        toast.error('Failed to delete account.');
        console.error('Error deleting account:', error);
      }
    }
  };

  // Handle profile picture upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePic(file);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <ToastContainer />
      <div className="w-full max-w-2xl p-8 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-bold mb-6 text-center text-teal-600">User Account</h2>

        <form onSubmit={handleProfileUpdate} className="space-y-4">
          <div className="flex flex-col items-center">
            {profilePic ? (
              <img src={profilePic} alt="Profile" className="w-24 h-24 rounded-full object-cover mb-4" />
            ) : (
              <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center mb-4">
                <span className="text-gray-500">No Image</span>
              </div>
            )}
            <input
              type="file"
              name="profilePic"
              onChange={handleImageUpload}
              className="mb-4"
            />
          </div>

          <div>
            <label htmlFor="firstname" className="block text-sm font-medium text-gray-700">First Name</label>
            <input
              type="text"
              id="firstname"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
            />
          </div>

          <div>
            <label htmlFor="lastname" className="block text-sm font-medium text-gray-700">Last Name</label>
            <input
              type="text"
              id="lastname"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
            />
          </div>

          <button
            type="submit"
            className={`w-full bg-teal-500 text-white py-2 px-4 rounded-md hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={loading}
          >
            {loading ? 'Updating Profile...' : 'Update Profile'}
          </button>
        </form>

        <button
          onClick={handleDeleteAccount}
          className="w-full mt-4 bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
        >
          Delete Account
        </button>
      </div>
    </div>
  );
}

export default UserAccount;

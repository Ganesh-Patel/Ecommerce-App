import axios from 'axios';

// const API_URL = 'https://ecommerce-app-oqjy.onrender.com/api/';
const API_URL = 'http://localhost:3008/api/';

export const registerUser = async (user) => {
  try {
    const response = await axios.post(`${API_URL}/user/register`, user);
    console.log('User Register successfully:', { user, response: response.data });
 
    return response.data;
  } catch (error) {
    console.error('Error in Register user:', { user, error: error.message });
    throw error; 
  }
};
export const loginUser = async (user) => {
  try {
    const response = await axios.post(`${API_URL}user/login`,user,{
      withCredentials: true});
      console.log('Cookies from browser:', document.cookie);
    console.log('user Logged in Successfully:', { response: response});
    return response;
  } catch (error) {
    console.error('Error fetching tasks:', { error: error.message });
    throw error;
  }
};

export const updateUser = async (id, updates) => {
  try {
    const response = await axios.put(`${API_URL}user/updateuser`, updates);
    console.log(`Task ${id} updated successfully:`, { updates, response: response.data });
    return response.data;
  } catch (error) {
    console.error(`Error updating task ${id}:`, { updates, error: error.message });
    throw error;
  }
};

export const deleteUser= async (id) => {
  try {
    const response = await axios.delete(`${API_URL}user/deleteuser`, { data: { id } });
    console.log(`Task ${id} deleted successfully:`, { response: response.data });
    return response.data;
  } catch (error) {
    console.error(`Error deleting task ${id}:`, { error: error.message });
    throw error;
  }
};
export const logoutUser= async (id) => {
  try {
    const response = await axios.delete(`${API_URL}user/logoutuser`, { }, {
      withCredentials: true,
    });
    console.log(`logged out successfully:`, { response: response.data });
    return response.data;
  } catch (error) {
    console.error(`Error in logging out ${id}:`, { error: error.message });
    throw error;
  }
};
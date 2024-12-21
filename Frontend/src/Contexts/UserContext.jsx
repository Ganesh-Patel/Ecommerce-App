
import React, { createContext, useEffect, useState } from 'react';
import {isUserLoggedIn} from '../Utils/api.js'
import { Navigate, useNavigate } from 'react-router-dom';
import { Puff } from 'react-loader-spinner';
export const UserContext = createContext();
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); 
  const [isLoggedIn,setIsLoggedIn]=useState(false);
  const navigate=useNavigate();
  const [loading, setLoading] = useState(true);
  

  useEffect(() => {
    const checkLoginStatus = async () => {
      await isUserLoggedIn(setIsLoggedIn,setUser);
      console.log(user);
      
      setLoading(false);
    };
    checkLoginStatus();

  }, []);
  console.log(isLoggedIn)
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
      <Puff
        height={80}
        width={80}
        radius={1}
        color="#38b2ac"
        ariaLabel="loading"
        visible={true}
      />
      <h1>Render is taking time please wait Loading....</h1>
    </div>
    );
  }
  return (
    <UserContext.Provider value={{ user, setUser,isLoggedIn,setIsLoggedIn,loading }}>
      {children}
    </UserContext.Provider>
  );
};

import React, { useState } from 'react';
import ProductHome from '../Pages/Products/ProductHome/ProductHome'


function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
         <div className="flex-grow container mx-auto py-12">
          <h1 className="text-4xl font-bold text-center mb-8">Welcome to MyApp!</h1>
          <p className="text-center text-gray-700">Explore our features and projects, and feel free to reach out to us anytime.</p>
          <ProductHome />
      </div>
    </div>
  );
}

export default Home;

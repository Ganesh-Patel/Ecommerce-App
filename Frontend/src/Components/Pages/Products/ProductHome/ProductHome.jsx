import React from 'react';
import CreateCard from '../../Cards/CreateCard';

const ProductHome = () => {
  const productData = {
    id: 1,
    name: "Wireless Headphones",
    description: "Enjoy superior sound quality with these lightweight, comfortable wireless headphones.",
    price: 99.99,
    discount: 20, 
    rating: 4.5,
    inStock: true,
    image: "https://via.placeholder.com/150" 
  };

  return (
    <div className="flex flex-wrap justify-center">
      <CreateCard product={productData} />
    </div>
  );
};

export default ProductHome;

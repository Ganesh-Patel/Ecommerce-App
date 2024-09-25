import React from 'react';

const CreateCard = ({ product }) => {
  const { name, description, price, discount, rating, inStock, image } = product;
  const discountedPrice = price - (price * (discount / 100));

  return (
    <div className="bg-white rounded-lg shadow-lg max-w-sm w-full m-4 transition-transform transform hover:scale-105">
      <img src={image} alt={name} className="rounded-t-lg w-full h-48 object-cover" />
      <div className="p-4">
        <h2 className="text-xl font-semibold text-gray-800">{name}</h2>
        <p className="text-gray-600 mt-1">{description}</p>
        <div className="flex items-baseline mt-2">
          <span className="text-lg font-bold text-pink-600">${discountedPrice.toFixed(2)}</span>
          <span className="text-sm line-through text-gray-500 ml-2">${price.toFixed(2)}</span>
          <span className="bg-pink-500 text-white text-xs font-medium rounded-full px-2 ml-auto">{discount}% Off</span>
        </div>
        <div className="flex justify-between items-center mt-2">
          <span className="text-sm text-yellow-500">⭐ {rating}</span>
          <span className={`text-sm font-semibold ${inStock ? 'text-green-600' : 'text-red-600'}`}>
            {inStock ? 'In Stock' : 'Out of Stock'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CreateCard;

import React, { useState, useEffect,useRef } from 'react';
import './ShopNav.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'; // Make sure you have react-router-dom installed

const categories = [
  {
    name: 'Men',
    subcategories: [
      'T-shirts',
      'Shirts',
      'Jeans',
      'Jackets',
      'Suits',
      'Shorts',
      'Sweaters',
      'Activewear',
      'Underwear',
      'Ethnic Wear',
      'Accessories',
      'Footwear',
    ],
  },
  {
    name: 'Women',
    subcategories: [
      'Dresses',
      'Tops',
      'Jeans',
      'Jackets',
      'Skirts',
      'Leggings',
      'Activewear',
      'Ethnic Wear',
      'Sarees',
      'Handbags',
      'Footwear',
      'Accessories',
    ],
  },
  {
    name: 'Kids',
    subcategories: [
      'T-shirts',
      'Shorts',
      'Dresses',
      'Jackets',
      'Trousers',
      'Ethnic Wear',
      'Activewear',
      'Footwear',
      'Accessories',
    ],
  },
  {
    name: 'Footwear',
    subcategories: [
      'Sneakers',
      'Sandals',
      'Boots',
      'Formal Shoes',
      'Casual Shoes',
      'Flip Flops',
      'Heels',
      'Ballet Flats',
      'Loafers',
    ],
  },
  {
    name: 'Electronics',
    subcategories: [
      'Mobile Phones',
      'Laptops',
      'Tablets',
      'Cameras',
      'Headphones',
      'Smart Watches',
      'Televisions',
      'Gaming Consoles',
      'Accessories',
    ],
  },
  {
    name: 'Home',
    subcategories: [
      'Furniture',
      'Bedding',
      'Decor',
      'Kitchenware',
      'Dining',
      'Storage & Organization',
      'Lighting',
      'Carpets & Rugs',
      'Curtains & Blinds',
    ],
  },
  {
    name: 'Beauty & Personal Care',
    subcategories: [
      'Skincare',
      'Makeup',
      'Hair Care',
      'Fragrances',
      'Oral Care',
      'Personal Care',
      'Men\'s Grooming',
      'Bath & Body',
      'Nail Care',
    ],
  },
  {
    name: 'Sports',
    subcategories: [
      'Fitness Equipment',
      'Outdoor Gear',
      'Cycling',
      'Running',
      'Yoga',
      'Team Sports',
      'Racket Sports',
      'Swimming',
      'Sports Accessories',
    ],
  },
  {
    name: 'Books',
    subcategories: [
      'Fiction',
      'Non-Fiction',
      'Children\'s Books',
      'Educational Books',
      'Comics & Graphic Novels',
      'Magazines',
      'E-Books',
      'Self-Help',
      'Cookbooks',
    ],
  },
  {
    name: 'Groceries',
    subcategories: [
      'Fruits & Vegetables',
      'Dairy Products',
      'Snacks',
      'Beverages',
      'Breads & Bakery',
      'Cereals',
      'Condiments & Sauces',
      'Frozen Foods',
      'Meat & Seafood',
    ],
  },
  {
    name: 'Baby Products',
    subcategories: [
      'Toys',
      'Baby Gear',
      'Nursery Furniture',
      'Feeding',
      'Bathing & Skin Care',
      'Diapers',
      'Playtime',
      'Learning Toys',
      'Safety & Health',
    ],
  },
];

const ShopNav = () => {
  const [activeCategory, setActiveCategory] = useState(null); // Tracks active category
  const navigate = useNavigate();

  const handleCategoryClick = (categoryName) => {
    // Set the active category
    setActiveCategory((prev) => (prev === categoryName ? null : categoryName));
    navigate(`/shop`);
  };

  const handleSubcategoryClick = (subcategory) => {
    console.log(`Navigating to subcategory: ${subcategory}`);
    navigate(`/shop/${subcategory.toLowerCase()}`);
  };

  return (
    <nav className="bg-gray-200 text-black border-b border-t border-gray-400">
      <div className="container mx-auto px-4 py-3 flex gap-4 items-center overflow-x-auto scrollbar-hide">
        <ul className="flex space-x-4">
          {categories.map((category) => (
            <li
              key={category.name}
              className={`relative whitespace-nowrap px-4 py-2 rounded-md border cursor-pointer transition-all font-extrabold duration-200 ${
                activeCategory === category.name
                  ? "bg-teal-500 text-white border-teal-700"
                  : "hover:bg-slate-500 hover:text-white border-transparent"
              }`}
              onClick={() => handleCategoryClick(category.name)}
            >
              <Link
                to="#"
                onClick={(e) => e.preventDefault()} // Prevent default link behavior
              >
                {category.name}
              </Link>
              {/* Subcategories dropdown */}
              {activeCategory === category.name && (
                <ul className="absolute left-0 top-full mt-2 bg-white shadow-lg rounded-md z-50 w-max">
                  {category.subcategories.map((subcategory) => (
                    <li
                      key={subcategory}
                      className="px-4 py-2 hover:bg-teal-200 whitespace-nowrap"
                      onClick={() => handleSubcategoryClick(subcategory)}
                    >
                      <Link
                        to="#"
                        onClick={(e) => e.preventDefault()} // Prevent default link behavior
                      >
                        {subcategory}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default ShopNav;
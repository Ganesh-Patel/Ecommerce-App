// Components/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto text-center">
        <p>&copy; {new Date().getFullYear()} MyApp. All rights reserved.</p>
        <div className="space-x-4 mt-2">
          <Link to="/privacy-policy" className="hover:underline">Privacy Policy</Link>
          <Link to="/terms-of-service" className="hover:underline">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

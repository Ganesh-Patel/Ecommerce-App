import React, { useState } from 'react';
import axios from 'axios';
import Enquiry from "../../../../public/Enquiry.mp4";

const ContactForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [formStatus, setFormStatus] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const nameRegex = /^[a-zA-Z\s]+$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const minMessageLength = 10;

  const submit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!name || !email || !message) {
      setFormStatus('Please fill out all fields.');
      setIsLoading(false);
      return;
    }

    if (!nameRegex.test(name)) {
      setFormStatus('Please enter a valid name (letters and spaces only).');
      setIsLoading(false);
      return;
    }

    if (!emailRegex.test(email)) {
      setFormStatus('Please enter a valid email address.');
      setIsLoading(false);
      return;
    }

    if (message.length < minMessageLength) {
      setFormStatus(`Message must be at least ${minMessageLength} characters long.`);
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post('https://contact-form-pgqm.onrender.com/submit-form', {
        name,
        email,
        message,
      });

      if (response.status === 200) {
        setFormStatus('Thank you for your message! We will be in touch soon.');
        setName('');
        setEmail('');
        setMessage('');
      } else {
        setFormStatus('Failed to send message. Please try again later.');
      }
    } catch (error) {
      setFormStatus('Failed to send message. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full px-6 sm:px-8 md:px-16 lg:px-72 flex flex-col gap-8 mt-20">
      {/* Map Section */}
      <div className="w-full">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3697.691502314736!2d77.58949647483884!3d12.832025487470682!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae6b22cb513a67%3A0x16752638e41c5ae7!2sHYKI!5e1!3m2!1sen!2sin!4v1734423073353!5m2!1sen!2sin"
          width="100%"
          height="400"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          className="rounded-lg shadow-md "
        ></iframe>
      </div>

      {/* Contact Form Section */}
      <div className="flex flex-col sm:flex-row gap-8 justify-between m-4">
        {/* Left: Location Details */}
        <div className="sm:w-1/2 p-6 bg-white shadow-lg rounded-lg border border-gray-300">
          <h2 className="text-xl sm:text-2xl font-semibold text-teal-600 mb-4">Location</h2>
          <p>📍 <strong>Address:</strong>  Apni-Shop , near Mahadev Temple,New Delhi 110019, India</p>
          <p>📞 <strong>Phone:</strong> +918755582068</p>
          <p>✉️ <strong>Email:</strong> <a href="mailto:kamakhyaenterprises.srg@gmail.com" className="text-blue-600 hover:text-blue-500">support@apnishop.com</a></p>
          <p>🕒 <strong>Office Hours:</strong> Mon-Fri, 9AM - 5PM</p>
          <img
            src="https://i.pinimg.com/736x/b6/89/96/b68996b0aeb13339740f961ada455a77.jpg"
            className="mt-4 rounded-lg shadow-md"
            alt="Location"
          />
        </div>

        {/* Right: Contact Form */}
        <div className="sm:w-1/2 p-6 bg-white shadow-lg rounded-lg border border-gray-300">
          <div className="flex items-center flex-wrap gap-4 justify-center sm:justify-start">
            <h2 className="text-2xl sm:text-3xl font-bold text-teal-600 mb-6">Enquiry Here</h2>
            <video
              src={Enquiry}
              autoPlay
              muted
              loop
              playsInline
              className="w-20 sm:w-24 rounded-full"
              style={{ display: "block", pointerEvents: "none" }}
            ></video>
          </div>

          <form onSubmit={submit} className="space-y-4">
            <div className="form-group">
              <input
                type="text"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                placeholder="Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
            <div className="form-group">
              <textarea
                placeholder="Your Message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 h-32 resize-none"
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-2 px-4 bg-teal-500 text-white rounded-lg transition duration-300 ${isLoading ? 'bg-teal-300 cursor-not-allowed' : 'hover:bg-teal-600'
                }`}
            >
              {isLoading ? 'Sending...' : 'Send Message'}
            </button>
            {formStatus && (
              <p className={`mt-4 text-center ${formStatus.includes('Failed') ? 'text-red-500' : 'text-green-500'}`}>
                {formStatus}
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;

import React, { useState, useEffect } from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import { IoIosArrowUp } from "react-icons/io";
import { Link } from "react-router-dom";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.pageYOffset > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setIsValid(e.target.validity.valid);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValid) {
      console.log("Subscribed with email:", email);
      setEmail("");
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-gray-800 text-white w-full">
      <div className="container mx-auto sm:px-16 px-8 py-8 max-w-[2000px]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4 ">
            <h3 className="text-xl font-bold">About Us</h3>
            <div className="flex space-y-5 flex-col">
              <p className="w-[80%] font-medium tracking-wider">
                We offer you the best quality images and videos for free.
              </p>
              <div className="flex space-x-4">
                <a
                  href="https://www.facebook.com"
                  target="_blank"
                  className="hover:text-blue-400 transition duration-300"
                  aria-label="Facebook"
                >
                  <FaFacebook size={24} />
                </a>
                <a
                  href="https://x.com/home"
                  target="_blank"
                  className="hover:text-blue-400 transition duration-300"
                  aria-label="Twitter"
                >
                  <FaTwitter size={24} />
                </a>
                <a
                  href="https://www.instagram.com/"
                  target="_blank"
                  className="hover:text-pink-400 transition duration-300"
                  aria-label="Instagram"
                >
                  <FaInstagram size={24} />
                </a>
                <a
                  href="https://www.linkedin.com/feed/"
                  target="_blank"
                  className="hover:text-blue-600 transition duration-300"
                  aria-label="LinkedIn"
                >
                  <FaLinkedin size={24} />
                </a>
              </div>
            </div>
          </div>
          <div className="space-y-4 ">
            <h3 className="text-xl font-bold">Quick Links</h3>
            <ul className="space-y-2">
              {/* <li>
                <Link
                  to="/"
                  className="hover:text-gray-300 transition duration-300"
                >
                  Home
                </Link>
              </li> */}
              <li>
                <Link
                  to=""
                  className="hover:text-gray-300 transition duration-300"
                >
                  Images
                </Link>
              </li>
              <li>
                <Link
                  to="/videos"
                  className="hover:text-gray-300 transition duration-300"
                >
                  Videos
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="hover:text-gray-300 transition duration-300"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4 ">
            <h3 className="text-xl font-bold">Subscribe</h3>
            <form onSubmit={handleSubmit} className="space-y-2">
              <input
                type="email"
                value={email}
                onChange={handleEmailChange}
                placeholder="Enter your email"
                className={`w-full px-3 py-2 text-gray-700 bg-white rounded-md focus:outline-none focus:ring-2 ${
                  isValid ? "focus:ring-blue-400" : "focus:ring-red-400"
                }`}
                required
              />
              <button
                type="submit"
                className="w-full px-3 py-2 text-white bg-emerald-500 rounded-md hover:bg-emerald-600 transition duration-300 font-semibold"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700 text-center fade-in">
          <p>&copy; 2024 Pixera. All rights reserved.</p>
        </div>
      </div>
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-5 right-4 bg-emerald-500 text-white p-2 rounded-full hover:bg-emerald-600 transition duration-300"
          aria-label="Scroll to top"
        >
          <IoIosArrowUp size={30} />
        </button>
      )}
    </footer>
  );
};

export default Footer;

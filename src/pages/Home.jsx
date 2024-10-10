import React from "react";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";

const HomePage = ({ query, setQuery, handleSearch }) => {
  return (
    <>
      {/* Background Image Container */}
      <div className="relative w-full h-[80vh] sm:h-[500px]">
        <div className="absolute left-0 top-0 w-full h-full bg-black/55 z-10"></div>
        <div className="w-full h-full">
          <img
            // src="https://ishaangupta122.github.io/Clipora/assets/image-15286.jpg"
            src="https://images.pexels.com/photos/552785/pexels-photo-552785.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
            // src="https://images.pexels.com/photos/1624496/pexels-photo-1624496.jpeg"
            className="size-full object-cover"
          />
          <div className="flex items-center flex-col absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-full gap-10 sm:gap-3">
            <p className="text-[1.6rem] text-pretty font-mono font-bold text-white px-10 text-center leading-[45px] max-w-[800px]">
              "Discover the high-quality images and videos and download for
              free."
            </p>
            <form
              onSubmit={handleSearch}
              className="flex justify-center w-full px-10 h-[50px]"
            >
              <input
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                }}
                placeholder="Search.... "
                className="w-[90%] text-lg font-semibold bg-white rounded-l-md h-full pl-5 pr-7  max-w-[600px] placeholder:text-[1.3rem] placeholder:text-gray-400 placeholder:font-medium focus:-outline-offset-2 focus:outline-emerald-500"
              />
              <button
                type="submit"
                className="flex justify-center items-center px-4 rounded-r-md h-full bg-emerald-500 hover:bg-emerald-600 cursor-pointer"
              >
                <FaSearch className="text-xl text-white" />
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Layout Links */}
      <div className="w-full flex my-10 justify-center gap-2 text-xl font-semibold px-3 flex-wrap">
        <Link
          to="/"
          className="px-5 py-2 rounded-3xl hover:bg-black hover:text-white hover:shadow-sm hover:shadow-black/90"
        >
          Images
        </Link>
        <Link
          to="/videos"
          className="px-5 py-2 rounded-3xl hover:bg-black hover:text-white hover:shadow-sm hover:shadow-black/90"
        >
          Videos
        </Link>
        <Link
          to="/contact"
          className="px-5 py-2 rounded-3xl hover:bg-black hover:text-white hover:shadow-sm hover:shadow-black/90"
        >
          Contact
        </Link>
      </div>
    </>
  );
};

export default HomePage;

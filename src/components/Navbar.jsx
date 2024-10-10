import { useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineMenu } from "react-icons/ai";
import { FaCamera } from "react-icons/fa";

function Navbar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const style = {
    background: "linear-gradient(45deg, #ff6f61 10%, #ffd700 30%,  #00cffd )",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  };

  return (
    <div className="relative flex justify-center">
      <nav className="absolute top-0 z-30 bg-transparent  py-6 px-8 w-full max-w-[2000px] h-[80px]">
        <div className="w-full mx-auto flex justify-between items-center">
          <div className="text-white text-2xl font-bold" style={style}>
            <Link to="/" className="flex items-center justify-center gap-1">
              {/* <i className="fa-brands fa-pied-piper text-3xl mt-[1px]"></i> */}
              <i className="fa-solid fa-camera text-2xl mt-[1px]"></i>
              Pixera.
            </Link>
          </div>
          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6 text-lg font-semibold text-white">
            {/* <Link to="/" className=" hover:text-white">
              Home
            </Link> */}
            <Link to="/" className=" hover:text-gray-200">
              Images
            </Link>
            <Link to="/videos" className=" hover:text-gray-200">
              Videos
            </Link>
            <Link to="/contact" className=" hover:text-gray-200">
              Contact
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleSidebar}
              className="text-3xl text-white focus:outline-none"
            >
              <AiOutlineMenu />
            </button>
          </div>
        </div>
      </nav>

      {/* Sidebar for Mobile */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-gray-800 text-white transition-transform transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } z-40`}
      >
        <div className="flex flex-col justify-between h-full">
          <div>
            <div className="text-2xl font-semibold p-4 mx-2 border-b border-slate-700">
              Clipora.
            </div>
            <ul className="space-y-4 p-4">
              <li>
                <Link
                  to="/"
                  className="block py-2 px-4 text-lg rounded hover:bg-gray-300 hover:text-black"
                  onClick={toggleSidebar}
                >
                  Images
                </Link>
              </li>
              {/* <li>
                <Link
                  to="/"
                  className="block py-2 px-4 text-lg rounded hover:bg-gray-300 hover:text-black"
                  onClick={toggleSidebar}
                >
                  Images
                </Link>
              </li> */}
              <li>
                <Link
                  to="/videos"
                  className="block py-2 px-4 text-lg rounded hover:bg-gray-300 hover:text-black"
                  onClick={toggleSidebar}
                >
                  Videos
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="block py-2 px-4 text-lg rounded hover:bg-gray-300 hover:text-black"
                  onClick={toggleSidebar}
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div className="p-4 mx-2 border-t border-slate-700">
            <p className="text-sm">© 2024 Clipora.</p>
          </div>
        </div>
      </div>

      {/* Overlay when sidebar is open */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={toggleSidebar}
        />
      )}
    </div>
  );
}

export default Navbar;

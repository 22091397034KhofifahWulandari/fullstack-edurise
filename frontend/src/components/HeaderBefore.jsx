import React from 'react';
import { useNavigate, Link } from 'react-router-dom';

const HeaderBefore = () => {
  const navigate = useNavigate();

  return (
    <header>
      <nav className="bg-white shadow-md h-[100px] relative">
        <div className="container mx-auto px-4 h-full flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center mr-10">
            <div className="w-[84px] h-[84px] rounded-full overflow-hidden flex items-center justify-center bg-white">
              <img src="/img/eduriselanding/Ellipse 1.png" alt="EduRise Logo" className="w-[50px] h-[50px] object-contain" />
            </div>
          </Link>

          {/* Mobile Toggle Button */}
          <button
            className="lg:hidden p-2 rounded-md focus:outline-none"
            type="button"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="block w-6 h-0.5 bg-gray-800 my-1"></span>
            <span className="block w-6 h-0.5 bg-gray-800 my-1"></span>
            <span className="block w-6 h-0.5 bg-gray-800 my-1"></span>
          </button>

          {/* Navigation Links */}
          <div className="hidden lg:flex lg:items-center lg:ml-5 flex-grow" id="navbarNav">
            <ul className="flex gap-10 items-center">
              <li>
                <Link to="/" className="px-4 py-2.5 font-bold text-[#3375CC] underline"><u>HOME</u></Link>
              </li>
            </ul>
          </div>

          {/* Login Button */}
          <div>
            {/* Nanti jika button ditekan, akan mengarahkan ke halaman loginuserPage.jsx */}
            <Link to="/login">
              <button
                className="w-[67px] h-[36px] flex items-center justify-center rounded-lg bg-[#3375CC] text-white font-semibold text-sm shadow-md hover:bg-[#295ea3] hover:-translate-y-0.3 transition duration-200"
              >
                Login
              </button>
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default HeaderBefore;
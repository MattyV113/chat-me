import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import BurgerBar from './BurgerBar';
import { BsToggleOn, BsToggleOff } from 'react-icons/bs';
import { useAuth } from '../Context/AuthContext';
import Cookies from 'universal-cookie';

const Navbar = () => {
  const navigate = useNavigate();
  const { auth } = useAuth();

  const cookies = new Cookies();

  const handleLogout = async () => {
    sessionStorage.removeItem('user');
    cookies.remove('token');
    navigate('/login');
  };

  const handleSignUp = () => {
    navigate('/sign-up');
  };

  return (
    <div className="w-100 border-b dark:border-white  border-black">
      <nav className="h-[150px] w-[92%] flex items-center justify-between mx-auto">
        <div className="flex gap-[10px] flex-row">
          <Link className="hover:text-gray-500" to="/">
            {' '}
            <img className="hidden sm:block w-[80px]" src={''} alt="" />
          </Link>
          <h3 className="light:text-black mt-[23px] ">ChatMe</h3>
        </div>
        <div className="md:static absolute md:min-h-fit min-h-[60vh] md:w-auto left-0 top-[-100%] w-full flex items-center px-5   ">
          <ul className="flex md:flex-row text-xl md:text-[18px] flex-col md:items-center mt-[20px] list-none gap-8 md:gap-[4vw]">
            <li>
              <Link
                className="hover:text-gray-500 light:text-black no-underline"
                to="/"
              >
                Home
              </Link>
            </li>

            <li>
              <Link
                className="hover:text-gray-500 light:text-black no-underline"
                to={`/`}
              >
                Profile
              </Link>
            </li>
          </ul>
        </div>
        <div className="flex  items-center gap-4">
          {auth ? (
            <button
              className="bg-match-orange  drop-shadow-xl no-underline mt-3 text-black font-[Poppins] hidden sm:block  py-2 px-6 rounded md:ml-8 hover:bg-orange-500
            duration-500"
              onClick={handleLogout}
            >
              {' '}
              Logout{' '}
            </button>
          ) : (
            <button
              className="bg-match-orange  drop-shadow-xl no-underline mt-3 text-black font-[Poppins] hidden sm:block  py-2 px-6 rounded md:ml-8 hover:bg-orange-500
            duration-500"
              onClick={handleSignUp}
            >
              Sign Up
            </button>
          )}

          <BurgerBar />
        </div>
      </nav>
    </div>
  );
};

export default Navbar;

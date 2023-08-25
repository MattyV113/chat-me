import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { RxHamburgerMenu } from 'react-icons/rx';

import { AiOutlineClose } from 'react-icons/ai';

function BurgerBar() {
  const [isClicked, setIsCLicked] = useState(false);

  const navigate = useNavigate();

  let [currentUser, setCurrentUser] = useState(false);

  const handleLogout = async () => {
    navigate('/login');
  };

  const handleSignUp = () => {
    navigate('/register');
  };

  const handleBurger = (e) => {
    e.preventDefault();

    if (!isClicked) {
      setIsCLicked(true);
    } else {
      setIsCLicked(false);
    }
  };
  return (
    <>
      {isClicked ? (
        <>
          <button className="md:hidden mt-[15px]" onClick={handleBurger}>
            <AiOutlineClose />
          </button>

          <div className="md:static absolute md:min-h-fit bg-white min-h-[60vh] md:w-auto left-0 top-[16%] w-full flex items-center px-5   ">
            <ul className="flex md:flex-row text-xl md:text-[18px] flex-col md:items-center mt-[20px] list-none gap-8 md:gap-[4vw]">
              <li>
                <Link
                  className="hover:text-gray-500 text-black no-underline"
                  to="/"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  className="hover:text-gray-500 text-black no-underline"
                  to="/create-post"
                >
                  Create Post
                </Link>
              </li>
              <li>
                <Link
                  className="hover:text-gray-500 text-black no-underline"
                  to="/users/:id"
                >
                  Profile
                </Link>
              </li>
              <li>
                {currentUser ? (
                  <Link
                    className="bg-match-orange  drop-shadow-xl no-underline mt-3 text-black font-[Poppins]  py-2 px-6 rounded md:ml-8 hover:bg-orange-500
                  duration-500"
                    onClick={handleLogout}
                  >
                    {' '}
                    Logout{' '}
                  </Link>
                ) : (
                  <Link
                    className="bg-match-orange  drop-shadow-xl no-underline mt-3 text-black font-[Poppins]  py-2 px-6 rounded md:ml-8 hover:bg-orange-500
                  duration-500"
                    onClick={handleSignUp}
                  >
                    Sign Up
                  </Link>
                )}
              </li>
            </ul>
          </div>
        </>
      ) : (
        <button className="md:hidden mt-[15px]" onClick={handleBurger}>
          <RxHamburgerMenu />
        </button>
      )}
    </>
  );
}

export default BurgerBar;

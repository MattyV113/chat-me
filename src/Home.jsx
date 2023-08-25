import './index.css';
import { useState, useEffect } from 'react';
import Navbar from './components/NavBar/Navbar';
import { BsSun } from 'react-icons/bs';
import { MdDarkMode } from 'react-icons/md';
import axios from 'axios';
import { io } from 'socket.io-client';
import { useAuth } from './components/Context/AuthContext';
import { Link } from 'react-router-dom';
import Cookies from 'universal-cookie';
import UserChat from './components/ChatBox/UserChat';

function Home() {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState(null);
  const { darkMode, setDarkMode, auth, ws } = useAuth();

  const cookies = new Cookies();
  const token = cookies.get('token');

  useEffect(() => {
    setLoading(true);
    const fetchUsers = async () => {
      await axios
        .get('http://localhost:3000/users')
        .then((res) => {
          let data = res.data;
          setUsers(data);
          setLoading(false);
        })
        .catch((err) => console.log(err));
    };
    fetchUsers();
  }, [token]);

  const toggleDark = () => {
    setDarkMode((prev) => !prev);
  };

  return (
    <div className={`${darkMode ? 'dark' : 'light'}`}>
      <Navbar />

      <div className="flex relative flex-col h-[100vh]">
        <div className="ml-10 sticky ">
          {darkMode ? (
            <MdDarkMode onClick={toggleDark} />
          ) : (
            <BsSun onClick={toggleDark} />
          )}
        </div>
        <h1 className="md:text-3xl text-center text-xl mt-4 ">
          Hey, Chat with Friends or Someone new!
        </h1>
        <div className="h-100vh p-2 w-[100%] flex flex-row m-auto">
          <div className="border m-auto dark:border-white rounded border-black h-[600px] w-[25%]">
            <h1 className="text-center border-b-[1px] p-4 mt-2 text-2xl">
              Other Users
            </h1>
            {!loading ? (
              users?.map((user, i) => {
                if (user.username !== auth.username) {
                  return (
                    <>
                      <Link
                        key={i}
                        to={`/${user.id}`}
                        className="flex h-[80px]  text-xl pl-2  border-b-[3px] rounded dark:border-white  flex-row  "
                      >
                        <img
                          className="rounded-full mt-3 w-[50px] h-[50px] ml-4 "
                          src={user.profileImage}
                          alt="avatar"
                        />

                        <p className="ml-4 pt-6">{user.username}</p>
                      </Link>
                    </>
                  );
                }
              })
            ) : (
              <p className=" h-[80px]  text-xl pl-2 pt-6 dark:border-white">
                loading users...
              </p>
            )}
          </div>
          <div className="h-[600px] relative  md:w-[800px]  p-2  dark:border-white rounded border border-black m-auto">
            <div className="text-black dark:text-white gap-[60px] mt-6 justify-center flex flex-col m-auto">
              <h1 className="text-2xl  text-center">
                Welcome {auth?.username}! Select a User to Chat With!
              </h1>
              <img
                src={auth?.profileImage}
                alt="user-image"
                className="rounded-full m-auto w-[100px] object-fit mt-6"
              />
              <p className="text-3xl text-center">{auth?.username}</p>
              <p>Hobbies: {auth?.hobbies}</p>
              <p>Favorite Food: {auth?.favFood}</p>
            </div>{' '}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;

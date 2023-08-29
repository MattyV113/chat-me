import { useEffect, useState } from 'react';
import Navbar from '../NavBar/Navbar';
import { BsSun } from 'react-icons/bs';
import { MdDarkMode } from 'react-icons/md';
import { useAuth } from '../Context/AuthContext';
import { useParams } from 'react-router';
import axios from 'axios';
import { io } from 'socket.io-client';
import Cookies from 'universal-cookie';

function UserChat() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState(['']);
  const [room, setRoom] = useState('');
  const { darkMode, setDarkMode, auth, socket } = useAuth();
  const { id } = useParams();

  useEffect(() => {
    const fetchUser = async () => {
      await axios
        .get(`http://localhost:3000/rooms/${id}`)
        .then((res) => {
          setRoom(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    fetchUser();

    socket.on('connection', () => {
      socket.emit('username', auth.username);
    });

    socket.on('send-message', (data) => {
      setMessages((prev) => [...prev, data]);
      console.log(data);
    });
    return () => {
      socket.disconnect();
    };
  }, [auth.username, socket, id]);

  const toggleDark = () => {
    setDarkMode((prev) => !prev);
  };

  return (
    <div className={`${darkMode ? 'dark' : 'light'}`}>
      <Navbar />
      <div className="h-[100vh]">
        <div className="ml-10 sticky  ">
          {darkMode ? (
            <MdDarkMode onClick={toggleDark} />
          ) : (
            <BsSun onClick={toggleDark} />
          )}
        </div>
        <div className="h-[600px] relative  md:w-[800px]   p-2  dark:border-white rounded border border-black m-auto">
          <h1>Room: {room.id}</h1>
          <div className="text-black dark:text-white m-auto">
            {messages?.map((message, id) => {
              return (
                <p
                  className="p-2 w-[10%] mt-4 bg-blue-400 rounded-xl text-white ml-[20px] "
                  key={id}
                >
                  {message}
                </p>
              );
            })}
          </div>
          <div className="p-[10px] flex flex-row absolute bottom-0 ">
            <input
              type="text"
              placeholder="Write message"
              className="mr-5 p-1 rounded min-w-[300px] max-w-[400px] dark:bg-black text-white"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button className="border p-1 dark:bg-black  border-black dark:text-white rounded w-[60px]">
              SEND
            </button>
          </div>{' '}
        </div>
      </div>
    </div>
  );
}

export default UserChat;

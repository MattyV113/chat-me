import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router';

function MakeRoom({ setShowModal }) {
  const [room, setRoom] = useState('');
  console.log(room);
  const navigate = useNavigate('');
  const createRoom = async (e) => {
    e.preventDefault();
    await axios
      .post('http://localhost:3000/rooms', {
        name: room,
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.log(err));
    setRoom('');
  };
  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative md:max-w-[650px]   mx-auto w-[370px] text-black">
          <div className="border-0 h-[300px] rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            <form className="m-auto gap-4" onSubmit={createRoom}>
              <h3 className="m-auto mt-5 text-lg text-center">Create Room</h3>

              <input
                className="mt-4 mb-4 p-2"
                value={room}
                placeholder="Enter a room number"
                onChange={(e) => setRoom(e.target.value)}
              />
              <div className="flex gap-4 flex-row m-auto">
                <button
                  className="hover:text-gray-500 duration-500 transition-all drop-shadow-xl  h-[40px] w-[70px] text-black bg-green-400 hover:bg-green-500 p-2 rounded no-underline"
                  onClick={createRoom}
                >
                  Create
                </button>
                <button
                  className="hover:text-gray-500 duration-500 transition-all drop-shadow-xl  h-[40px] w-[70px] text-black bg-red-400 hover:bg-red-500 p-2 rounded no-underline"
                  onClick={() => setShowModal(false)}
                >
                  Return
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
}

export default MakeRoom;

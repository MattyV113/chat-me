import React from 'react';

function JoinRoom({ setShowModal }) {
  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative md:max-w-[650px]  my-6 mx-auto max-w-[270px]">
          {/*content*/}
          <div className="border-0 h-[300px] rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            <div>
              <h3 className="m-auto mt-5 p-4 text-lg text-center">
                Hey! This Feature is a work in progress.
              </h3>
            </div>
            <div className="flex gap-4 flex-row m-auto">
              <button
                className="hover:text-gray-500 duration-500 transition-all drop-shadow-xl  h-[40px] w-[70px] text-black hover:bg-red-500 p-2 rounded no-underline"
                onClick={() => setShowModal(false)}
              >
                Return
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
}

export default JoinRoom;

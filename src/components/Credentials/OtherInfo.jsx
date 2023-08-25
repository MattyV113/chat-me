import PropTypes from 'prop-types';

function OtherInfo({ hobbies, setHobbies, favFood, setFavFood }) {
  return (
    <div>
      <form className=" w-[80%] m-auto flex flex-col">
        <label htmlFor="username">Hobbies</label>
        <input
          className="border m-auto border-black rounded p-2 w-[50%]"
          id="username"
          type="text"
          value={hobbies}
          onChange={(e) => setHobbies(e.target.value)}
        />
        <label htmlFor="email">Favorite Food</label>
        <input
          className="border m-auto border-black rounded p-2 w-[50%]"
          id="email"
          type="email"
          value={favFood}
          onChange={(e) => setFavFood(e.target.value)}
        />
      </form>
    </div>
  );
}

OtherInfo.propTypes = {
  hobbies: PropTypes.string,
  setHobbies: PropTypes.func,
  favFood: PropTypes.string,
  setFavFood: PropTypes.func,
};

export default OtherInfo;

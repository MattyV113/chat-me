import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Credentials from './Credentials';
import OtherInfo from './OtherInfo';
import ProfilePicture from './ProfilePicture';
function SignUp() {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [page, setPage] = useState(0);
  const [profileImage, setProfileImage] = useState('');
  const [isError, setIsError] = useState(false);
  const [hobbies, setHobbies] = useState('');
  const [favFood, setFavFood] = useState('');

  const FormTiles = [
    'Welcome',
    'More info about you',
    'Choose your Profile Picture',
  ];

  const pageChange = () => {
    if (page === 0) {
      return (
        <Credentials
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
          email={email}
          setEmail={setEmail}
        />
      );
    }
    if (page === 1) {
      return (
        <OtherInfo
          setHobbies={setHobbies}
          hobbies={hobbies}
          setFavFood={setFavFood}
          favFood={favFood}
        />
      );
    } else {
      return (
        <ProfilePicture
          profileImage={profileImage}
          setProfileImage={setProfileImage}
        />
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post('http://localhost:3000/users/signup', {
        username,
        email,
        password,
        profileImage,
        hobbies,
        favFood,
      })
      .then((res) => {
        console.log(res.data);
        navigate('/login');
      })
      .catch((err) => {
        const data = err.response.data.msg;
        console.log(err);
        setIsError(true);
        setError(data);
      });
    setUsername('');
    setEmail('');
    setProfileImage('');
    setPassword('');
    setHobbies(''), setFavFood('');
  };

  return (
    <div className="flex m-auto h-[100vh] justify-center">
      <div className="flex flex-col border-2 h-[500px] border-black rounded text-center justify-center align-middle w-[500px] m-auto gap-[20px] p-4">
        <h1>{FormTiles[page]}</h1>
        {isError ? <p className="text-center text-red-600">{error}</p> : ''}

        {pageChange()}
        <div className="flex m-auto flex-row mt-4">
          <button
            className="border w-[100px] h-[50px] rounded bg-red-400 hover:bg-red-200"
            onClick={() => setPage(page - 1)}
            disabled={page === 0}
          >
            Prev
          </button>
          {page < 2 ? (
            <button
              className="border w-[100px] h-[50px] rounded bg-green-400 hover:bg-green-200"
              onClick={() => setPage(page + 1)}
              disabled={page === 2}
            >
              Next
            </button>
          ) : (
            <button
              className="border w-[100px] h-[50px] rounded bg-green-400 hover:bg-green-200"
              onClick={handleSubmit}
            >
              Submit
            </button>
          )}
        </div>
        <p>
          already have an account?{' '}
          <Link className="text-blue-600 underline " to="/login">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignUp;

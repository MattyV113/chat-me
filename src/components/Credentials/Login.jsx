import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../Context/AuthContext';

function Login() {
  const { auth, setAuth } = useAuth();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const userRef = useRef();

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setError('');
  }, [username, password]);

  const navigate = useNavigate();

  const [error, setError] = useState('');
  const [isError, setIsError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post(
        'http://localhost:3000/users/login',
        {
          username,
          password,
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        console.log(res.data);
        setAuth(res.data);
        navigate('/');
      })
      .catch((err) => {
        const data = err.response.data.msg;
        console.log(err);
        setIsError(true);
        setError(data);
      });

    setUsername('');
    setPassword('');
  };

  return (
    <div className="flex m-auto h-[100vh] justify-center">
      <div className="flex flex-row border-2 h-[500px] border-black rounded text-center justify-center align-middle w-[800px] m-auto gap-[20px] p-4">
        <form onSubmit={handleSubmit} className=" w-[50%] flex flex-col">
          <h1 className="text-2xl mb-[20px]">Chat Me</h1>
          {isError ? <p className="text-center text-red-600">{error}</p> : ''}
          <label htmlFor="username">Username</label>
          <input
            className="border m-auto border-black rounded p-2 w-[50%]"
            id="username"
            type="text"
            value={username}
            ref={userRef}
            required
            onChange={(e) => setUsername(e.target.value)}
          />
          <label htmlFor="password">Password</label>
          <input
            className="border m-auto border-black rounded p-2 w-[50%]"
            id="password"
            type="password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            onClick={handleSubmit}
            className="border bg-green-400 border-black rounded p-2 w-[100px] m-auto"
          >
            Log In
          </button>
          <p>
            Dont have an account?{' '}
            <Link className="text-blue-600 underline" to="/sign-up">
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;

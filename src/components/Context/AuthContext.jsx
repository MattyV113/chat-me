import { useState, createContext, useContext, useEffect, useRef } from 'react';
import { PropTypes } from 'prop-types';
import { io } from 'socket.io-client';
import Cookies from 'universal-cookie';

const AuthContext = createContext();

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export function useAuth() {
  return useContext(AuthContext);
}

function setSessionStorage(key, value) {
  try {
    sessionStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.log(e);
    // catch possible errors:
    // https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API
  }
}

function getSessionStorage(key, initialValue) {
  try {
    const value = sessionStorage.getItem(key);
    return value ? JSON.parse(value) : initialValue;
  } catch (e) {
    if (e) return initialValue;
    console.log(e);
  }
}

function AuthProvider(props) {
  const [auth, setAuth] = useState(() => getSessionStorage('user', {}));
  const [darkMode, setDarkMode] = useState(true);
  const cookies = new Cookies();
  const token = cookies.get('token');
  const ws = new WebSocket(`ws://localhost:3001/?token=${token}`);

  useEffect(() => {
    setSessionStorage('user', auth);
  }, [auth]);

  return (
    <AuthContext.Provider
      value={{
        darkMode,
        setDarkMode,
        auth,
        setAuth,
        ws,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;

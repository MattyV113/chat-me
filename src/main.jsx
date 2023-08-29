import React from 'react';
import ReactDOM from 'react-dom/client';
import Home from './Home';
import SignUp from './components/Credentials/SignUp';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ErrorPage from './components/RouteError';
import { io } from 'socket.io-client';
import Login from './components/Credentials/Login';
import UserChat from './components/ChatBox/UserChat';
import AuthProvider, { useAuth } from './components/Context/AuthContext';
import Cookies from 'universal-cookie';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/sign-up',
    element: <SignUp />,
  },
  {
    path: `/rooms/:id`,
    element: <UserChat />,
  },
  {
    path: '/login',
    element: <Login />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);

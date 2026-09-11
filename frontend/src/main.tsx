import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AuthLayout from './pages/auth/authLayout.tsx';
import Login from './pages/auth/login/Login.tsx';
import Register from './pages/auth/register/Register.tsx';
import VerifyMail from './pages/auth/verifyEmail/verifyMail.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  // Authentifaction routes
  {
    element: <AuthLayout />,
    children: [
      { path: '/login', element: <Login /> },
      { path: '/register', element: <Register /> },
      { path: '/verify-email', element: <VerifyMail /> },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);

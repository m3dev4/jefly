import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './index.css';
import App from './App.tsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AuthLayout from './pages/auth/authLayout.tsx';
import Login from './pages/auth/login/Login.tsx';
import Register from './pages/auth/register/Register.tsx';
import VerifyMail from './pages/auth/verifyEmail/verifyMail.tsx';
import PasswordRecovery from './pages/auth/passwordRecovery/passwordRecovery.tsx';
import NewPassword from './pages/auth/newPassword/newPassword.tsx';
import { Toaster } from './components/ui/toast';
import Onboarding from './pages/auth/onboarding.tsx';

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
      { path: '/password-recovery', element: <PasswordRecovery /> },
      { path: '/new-password', element: <NewPassword /> },
    ],
  },
  {
    path: '/onboarding',
    element: <Onboarding />,
  },
]);

const queryClient = new QueryClient();
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Toaster>
        <RouterProvider router={router} />
      </Toaster>
    </QueryClientProvider>
  </StrictMode>
);

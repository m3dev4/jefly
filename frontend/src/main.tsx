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
import Onboarding from './pages/onboarding/onboarding.tsx';
import ProtectedRoute from './components/protectedRoute.tsx';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

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
    element: (
      <ProtectedRoute>
        <Onboarding />
      </ProtectedRoute>
    ),
  },
]);

const queryClient = new QueryClient();
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Toaster>
        <RouterProvider router={router} />
        <ReactQueryDevtools initialIsOpen={false} />
      </Toaster>
    </QueryClientProvider>
  </StrictMode>
);

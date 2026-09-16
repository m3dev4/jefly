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
import PublicOnlyRoute from './components/publicOnlyRoute.tsx';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import EspaceLayout from './pages/espace/espaceLayout.tsx';
import DashboardOverview from './pages/espace/DashboardOverview.tsx';
import PlaceholderPage from './pages/espace/PlaceholderPage.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  // Authentication routes (accessible only when not logged in)
  {
    element: (
      <PublicOnlyRoute>
        <AuthLayout />
      </PublicOnlyRoute>
    ),
    children: [
      { path: '/login', element: <Login /> },
      { path: '/register', element: <Register /> },
      { path: '/verify-email', element: <VerifyMail /> },
      { path: '/password-recovery', element: <PasswordRecovery /> },
      { path: '/new-password', element: <NewPassword /> },
    ],
  },
  // Onboarding route (protected)
  {
    path: '/onboarding',
    element: (
      <ProtectedRoute>
        <Onboarding />
      </ProtectedRoute>
    ),
  },
  // Espace Dashboard routes (protected)
  {
    path: '/espace',
    element: (
      <ProtectedRoute>
        <EspaceLayout />
      </ProtectedRoute>
    ),
    children: [
      { path: '', element: <DashboardOverview /> },
      // Freelance routes
      {
        path: 'missions',
        element: (
          <PlaceholderPage
            title="Rechercher une mission"
            description="Découvrez les missions disponibles qui correspondent à vos compétences."
          />
        ),
      },
      {
        path: 'candidatures',
        element: (
          <PlaceholderPage
            title="Mes candidatures"
            description="Suivez l'état de vos propositions et candidatures envoyées aux annonceurs."
          />
        ),
      },
      {
        path: 'mes-missions',
        element: (
          <PlaceholderPage
            title="Mes missions"
            description="Consultez vos missions en cours, livrables et contrats validés."
          />
        ),
      },
      {
        path: 'paiements-recus',
        element: (
          <PlaceholderPage
            title="Paiements reçus"
            description="Historique de vos paiements et revenus perçus sur JeFly."
          />
        ),
      },
      // Annonceur routes
      {
        path: 'publier-mission',
        element: (
          <PlaceholderPage
            title="Publier une mission"
            description="Rédigez une annonce pour recruter rapidement des freelances qualifiés."
          />
        ),
      },
      {
        path: 'mes-annonces',
        element: (
          <PlaceholderPage
            title="Mes annonces"
            description="Gérez la visibilité, les détails et le statut de vos missions publiées."
          />
        ),
      },
      {
        path: 'candidatures-recues',
        element: (
          <PlaceholderPage
            title="Candidatures reçues"
            description="Consultez et évaluez les profils des freelances ayant postulé à vos annonces."
          />
        ),
      },
      {
        path: 'paiements-effectues',
        element: (
          <PlaceholderPage
            title="Paiements effectués"
            description="Suivez vos paiements sécurisés et factures de prestations."
          />
        ),
      },
      // Shared routes
      {
        path: 'messages',
        element: (
          <PlaceholderPage
            title="Messagerie"
            description="Échangez directement avec vos clients et collaborateurs."
          />
        ),
      },
      {
        path: 'profil',
        element: (
          <PlaceholderPage
            title="Mon profil"
            description="Consultez et personnalisez les informations visibles sur votre profil."
          />
        ),
      },
      {
        path: 'parametres',
        element: (
          <PlaceholderPage
            title="Paramètres"
            description="Gérez vos préférences de compte, mot de passe et notifications."
          />
        ),
      },
      {
        path: 'aide',
        element: (
          <PlaceholderPage
            title="Centre d'aide"
            description="Consultez notre documentation et guides pour utiliser au mieux JeFly."
          />
        ),
      },
      {
        path: 'documents',
        element: (
          <PlaceholderPage
            title="Documents"
            description="Accédez à l'ensemble de vos contrats, factures et documents officiels."
          />
        ),
      },
    ],
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

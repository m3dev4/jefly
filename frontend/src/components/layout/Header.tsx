import { useNavigate } from 'react-router-dom';
import { LogoJefly } from '../../assets/images';
import { NAV_LINKS } from '../../constants/utils';
import { useQuery } from '@tanstack/react-query';
import getCurrentUser from '../../utils/getUser';
import { Button } from '../ui/button';

export default function Header() {
  const navigate = useNavigate();
  const { data: user } = useQuery({
    queryKey: ['currentUser'],
    queryFn: getCurrentUser,
    retry: false,
  });
  return (
    <header className="sticky top-0 z-50 bg-[#F7F7F5]/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <a href="#top" className="flex items-center gap-2">
          <img
            src={LogoJefly}
            alt="Jëfly"
            className="h-10 w-auto object-contain"
          />
        </a>

        <nav className="hidden items-center gap-2 lg:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="rounded-lg px-3 py-2 font-sans text-sm font-medium text-[#1E1E24] transition hover:bg-black/5 hover:text-[#F2994A]"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {user ? (
          <>
            <Button
              onClick={() => navigate('/espace')}
              className="py-2.5 px-5 cursor-pointer bg-secondary-jefly hover:bg-secondary-jefly/95 text-black font-heading font-semibold shadow-xs"
            >
              Mon espace
            </Button>
          </>
        ) : (
          <div className="flex items-center gap-3">
            <Button
              type="button"
              className="rounded-lg border border-black/10 px-5 py-2.5 font-sans text-sm font-medium text-[#1E1E24] transition hover:bg-black/5"
              onClick={() => navigate('/login')}
            >
              Se connecter
            </Button>
            <Button
              type="button"
              className="rounded-lg bg-[#F2994A] px-5 py-2.5 font-sans text-sm font-semibold text-[#1E1E24] transition hover:bg-[#e28a3a]"
              onClick={() => navigate('/register')}
            >
              S'inscrire
            </Button>
          </div>
        )}
      </div>
    </header>
  );
}

import { useForm } from 'react-hook-form';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Loader2, Lock, Mail } from 'lucide-react';
import { Button } from '../ui/button';
import { Google } from '../../assets/icons';
import { Link } from 'react-router-dom';
import type { Login } from '../../interfaces/authInterface';
import { useLogin } from '../../hooks/useAuth';

const LoginComponent = () => {
  const loginMutation = useLogin();
  const { register, handleSubmit } = useForm<Login>({
    defaultValues: { email: '', password: '' },
  });

  return (
    <div className="flex flex-col items-start justify-start w-full mt-4">
      <form
        noValidate
        className="space-y-4 w-full"
        onSubmit={handleSubmit((data) => loginMutation.mutate(data))}
      >
        <div className="flex flex-col space-y-1.5">
          <Label
            htmlFor="email"
            className="text-xs sm:text-sm text-neutral-700 font-medium"
          >
            Adresse Email
          </Label>
          <div className="relative">
            <Mail
              className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none"
            />
            <Input
              id="email"
              className="w-full bg-neutral-50 border border-neutral-200 focus:border-[#1b4b6b] focus:bg-white text-xs sm:text-sm pl-9 pr-3 py-2.5 rounded-lg transition-colors placeholder:text-neutral-400"
              placeholder="exemple@test.com"
              type="email"
              {...register('email', { required: "L'email est obligatoire." })}
            />
          </div>
        </div>

        <div className="flex flex-col space-y-1.5">
          <div className="flex items-center justify-between">
            <Label
              htmlFor="password"
              className="text-xs sm:text-sm text-neutral-700 font-medium"
            >
              Mot de passe
            </Label>
            <Link
              to="/password-recovery"
              className="text-xs text-[#1b4b6b] hover:text-[#133852] font-medium hover:underline transition-colors"
            >
              Mot de passe oublié ?
            </Link>
          </div>
          <div className="relative">
            <Lock
              className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none"
            />
            <Input
              id="password"
              className="w-full bg-neutral-50 border border-neutral-200 focus:border-[#1b4b6b] focus:bg-white text-xs sm:text-sm pl-9 pr-3 py-2.5 rounded-lg transition-colors placeholder:text-neutral-400"
              placeholder="••••••••••••"
              type="password"
              {...register('password', {
                required: 'Le mot de passe est obligatoire.',
              })}
            />
          </div>
        </div>

        <div className="pt-1">
          <Button
            type="submit"
            disabled={loginMutation.isPending}
            className="w-full h-11 bg-[#f2994a] hover:bg-[#e0893a] text-white font-semibold rounded-lg shadow-xs transition-colors cursor-pointer text-xs sm:text-sm"
          >
            {loginMutation.isPending ? (
              <Loader2 className="w-4 h-4 animate-spin text-white" />
            ) : (
              'Se connecter'
            )}
          </Button>
        </div>

        <div className="flex items-center justify-center space-x-3 py-1">
          <div className="flex-1 h-px bg-neutral-200" />
          <p className="text-xs text-neutral-400 font-medium">ou</p>
          <div className="flex-1 h-px bg-neutral-200" />
        </div>

        <div>
          <button
            type="button"
            className="w-full h-11 bg-white hover:bg-neutral-50 text-neutral-700 font-medium border border-neutral-200 rounded-lg flex items-center justify-center gap-2.5 transition-colors cursor-pointer text-xs sm:text-sm"
          >
            <img src={Google} alt="Google" className="w-4 h-4 object-contain" />
            <span>Se connecter avec Google</span>
          </button>
        </div>

        <div className="pt-2 text-center">
          <p className="text-xs sm:text-sm text-neutral-500">
            Vous n'avez pas de compte ?{' '}
            <Link
              to="/register"
              className="text-[#1b4b6b] font-semibold hover:underline transition-colors"
            >
              S'inscrire
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginComponent;

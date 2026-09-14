import { useForm } from 'react-hook-form';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Loader, Loader2, Lock, Mail } from 'lucide-react';
import { Button } from '../ui/button';
import { Google } from '../../assets/icons';
import { Link } from 'react-router-dom';
import type { Register } from '../../interfaces/authInterface';
import { useRegister } from '../../hooks/useAuth';

const RegisterComponent = () => {
  const registerMutation = useRegister();
  const { register, handleSubmit, formState } = useForm<Register>({
    defaultValues: { email: '', password: '', confirmPassword: '' },
  });

  return (
    <div className="flex flex-col items-start justify-start w-full h-full mt-5">
      <form
        noValidate
        className="space-y-3 w-full"
        onSubmit={handleSubmit((data) => registerMutation.mutate(data))}
      >
        <div className="flex flex-col space-y-1">
          <Label
            htmlFor="email"
            className="font-inter px-0.5 text-sm text-text-jefly font-medium"
          >
            Adresse Email
          </Label>
          <div className="relative">
            <Input
              id="email"
              className="w-full bg-gray-200 py-3.5 rounded-sm px-8"
              placeholder="exemple@test.com"
              type="email"
              {...register('email', { required: "L'email est obligatoire." })}
            />
            <Mail
              size={14}
              className="absolute top-0 transform translate-y-2.5 mx-2"
            />
          </div>
        </div>
        <div className="flex flex-col space-y-1">
          <Label
            htmlFor="password"
            className="font-inter px-0.5 text-sm text-text-jefly font-medium"
          >
            Mot de passe
          </Label>
          <div className="relative">
            <Input
              id="password"
              className="w-full bg-gray-200 py-3.5 rounded-sm px-8"
              placeholder="*****************"
              type="password"
              {...register('password', {
                required: 'Le mot de passe est obligatoire.',
              })}
            />
            <Lock
              size={14}
              className="absolute top-0 transform translate-y-2.5 mx-2"
            />
          </div>
        </div>
        <div className="flex flex-col space-y-1">
          <Label
            htmlFor="Confirmpassword"
            className="font-inter px-0.5 text-sm text-text-jefly font-medium"
          >
            Confirmer le mot de passe
          </Label>
          <div className="relative">
            <Input
              id="confirmPassword"
              className="w-full bg-gray-200 py-3.5 rounded-sm px-8"
              placeholder="*****************"
              type="password"
              {...register('confirmPassword', {
                required: 'La confirmation est obligatoire.',
              })}
            />
            <Lock
              size={14}
              className="absolute top-0 transform translate-y-2.5 mx-2"
            />
          </div>
        </div>
        <div className="mt-2">
          <Button
            type="submit"
            disabled={registerMutation.isPending}
            className="w-full bg-secondary-jefly text-text-jefly p-5"
          >
            {registerMutation.isPending ? (
              <Loader2 className="animate-spin" />
            ) : (
              "S'inscrire"
            )}
          </Button>
          {formState.errors.email && (
            <p className="text-sm text-red-600">
              {formState.errors.email.message}
            </p>
          )}
        </div>
        <div className="mt-3">
          <div className="flex items-center justify-center space-x-2">
            <div className="flex-1 h-0.5 bg-gray-300" />
            <p>ou</p>
            <div className="flex-1 h-0.5 bg-gray-300" />
          </div>
        </div>
        <div className="mt-2 relative">
          <div className="flex items-center justify-center">
            <img
              src={Google}
              width={18}
              height={18}
              className="absolute left-50"
            />
            <Button className="w-full bg-slate-300 text-text-jefly hover:bg-slate-400 p-5">
              S'inscrire avec Google
            </Button>
          </div>
        </div>
        <div className="mt-3 flex items-center justify-center">
          <p className="text-sm text-text-jefly font-sans">
            Déjà un compte ?{' '}
            <Link to="/login" className="text-primary-jefly hover:underline">
              Se connecter
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default RegisterComponent;

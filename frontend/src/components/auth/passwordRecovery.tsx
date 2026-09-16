import { ArrowLeftIcon, Mail } from 'lucide-react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom';

const PasswordRecoveryComponent = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-start justify-start w-full mt-4">
      <form noValidate className="space-y-4 w-full">
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
            />
          </div>
        </div>

        <div className="pt-1">
          <Button
            type="submit"
            className="w-full h-11 bg-[#f2994a] hover:bg-[#e0893a] text-white font-semibold rounded-lg shadow-xs transition-colors cursor-pointer text-xs sm:text-sm"
          >
            Envoyer le lien de réinitialisation
          </Button>
        </div>

        <div className="flex items-center justify-center mt-4 pt-2">
          <button
            type="button"
            className="flex items-center gap-2 text-xs text-neutral-500 hover:text-neutral-800 transition-colors cursor-pointer p-2 rounded-lg hover:bg-neutral-100"
            onClick={() => navigate('/login')}
          >
            <ArrowLeftIcon className="w-3.5 h-3.5" />
            <span>Retour à la connexion</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default PasswordRecoveryComponent;

import { ArrowLeftIcon, Mail } from 'lucide-react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';

const PasswordRecoveryComponent = () => {
  return (
    <div className="flex flex-col items-start justify-start w-full h-full mt-5">
      <form noValidate className="space-y-3 w-full mt-10">
        <div className="flex flex-col space-y-1">
          <Label
            htmlFor="email"
            className="font-inter px-0.5 text-sm text-text-jefly font-medium"
          >
            Adresse Email
          </Label>
          <div className="relative">
            <Input
              className="w-full bg-gray-200 py-5 rounded-sm px-8"
              placeholder="exemple@test.com"
              type="email"
            />
            <Mail
              size={14}
              className="absolute top-0 transform translate-y-3.5 mx-2"
            />
          </div>
        </div>
        <Button className="w-full bg-secondary-jefly text-text-jefly p-5 mt-5">
          Envoyer le lien de réinitialisation
        </Button>
        <div className="flex items-center justify-center mt-9">
        <Button variant="ghost" className="cursor-pointer">
          <ArrowLeftIcon size={14} />
          <span className="font-sans">Retour à la connexion</span>
        </Button>
      </div>
      </form>
    </div>
  );
};

export default PasswordRecoveryComponent;

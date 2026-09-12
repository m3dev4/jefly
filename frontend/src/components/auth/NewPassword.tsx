import React from 'react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Lock } from 'lucide-react';
import { Button } from '../ui/button';

const NewPasswordComponent = () => {
  return (
    <div className="flex flex-col items-start justify-start w-full h-full mt-5">
      <form noValidate className="space-y-5 w-full mt-5">
        <div className="flex flex-col space-y-1">
          <Label
            htmlFor="password"
            className="font-inter px-0.5 text-sm text-text-jefly font-medium"
          >
            Mot de passe
          </Label>
          <div className="relative">
            <Input
              className="w-full bg-gray-200 py-3.5 rounded-sm px-8"
              placeholder="*****************"
              type="password"
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
              className="w-full bg-gray-200 py-3.5 rounded-sm px-8"
              placeholder="*****************"
              type="password"
            />
            <Lock
              size={14}
              className="absolute top-0 transform translate-y-2.5 mx-2"
            />
          </div>
        </div>
        <div className="mt-5">
          <Button className="w-full bg-secondary-jefly text-text-jefly p-5">
            Réinitialiser le mot de passe
          </Button>
        </div>
      </form>
    </div>
  );
};

export default NewPasswordComponent;

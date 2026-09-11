import React, { useRef } from 'react';
import OptCode from '../optCode';
import { Button } from '../ui/button';
import { ArrowLeftIcon } from 'lucide-react';

const VerifyMailComponent = () => {
  const inputRef = useRef([]);

  const handleKeyDown = () => {};
  return (
    <form noValidate className="w-full flex flex-col items-center gap-8 mt-15">
      <div className="flex justify-between gap-3 w-full">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <OptCode
            key={i}
            index={i}
            inputRefs={inputRef}
            onKeyDown={handleKeyDown}
          />
        ))}
      </div>
      <div className="flex flex-col items-center justify-center gap-3">
        <p className="text-gray-400">Vous n'avez pas reçu de code ?</p>
        <div className="flex items-center justify-center gap-7">
          <Button variant="ghost">Renvoyer le code</Button>
          <span>Time</span>
        </div>
      </div>
      <Button
        className="w-full p-5 bg-secondary-jefly text-text-jefly font-sans"
        disabled
      >
        Vérifier
      </Button>
      <div className="flex items-center justify-center mt-9">
        <Button variant="ghost" className="cursor-pointer">
          <ArrowLeftIcon size={14} />
          <span className="font-sans">Retour à la connexion</span>
        </Button>
      </div>
    </form>
  );
};

export default VerifyMailComponent;

import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import OptCode from '../optCode';
import { Button } from '../ui/button';
import { ArrowLeftIcon, Loader2 } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import type { VerifyEmail } from '../../interfaces/authInterface';
import { useVerifyEmail } from '../../hooks/useAuth';

const VerifyMailComponent = () => {
  const inputRef = useRef<(HTMLInputElement | null)[]>([]);
  const verifyMutation = useVerifyEmail();
  const navigate = useNavigate();
  const location = useLocation();
  const stateEmail = (location.state as { email?: string } | null)?.email;
  const [otp, setOtp] = useState<string[]>(Array(6).fill(''));
  const { register, setValue, handleSubmit, watch } = useForm<VerifyEmail>({
    defaultValues: {
      email: stateEmail ?? sessionStorage.getItem('verification_email') ?? '',
      code: '',
    },
  });
  const email = watch('email');

  const handleCodeChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const digit = event.target.value.replace(/\D/g, '').slice(-1);
    const nextOtp = [...otp];
    nextOtp[index] = digit;
    setOtp(nextOtp);
    setValue('code', nextOtp.join(''), { shouldValidate: true });

    if (digit && index < 5) {
      inputRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (event.key === 'Backspace' && !otp[index] && index > 0) {
      inputRef.current[index - 1]?.focus();
    }
  };

  return (
    <form
      noValidate
      className="w-full flex flex-col items-center gap-8 mt-15"
      onSubmit={handleSubmit((data) => verifyMutation.mutate(data))}
    >
      <input
        type="email"
        placeholder="exemple@test.com"
        className="w-full rounded-sm bg-gray-200 px-3 py-2"
        {...register('email', { required: "L'email est obligatoire." })}
      />
      <input type="hidden" {...register('code')} />
      <div className="flex justify-between gap-3 w-full">
        {Array.from({ length: 6 }, (_, i) => i).map((i) => (
          <OptCode
            key={i}
            index={i}
            inputRefs={inputRef}
            onChange={handleCodeChange}
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
        type="submit"
        className="w-full p-5 bg-secondary-jefly text-text-jefly font-sans"
        disabled={
          verifyMutation.isPending || !email || otp.join('').length !== 6
        }
      >
        {verifyMutation.isPending ? (
          <Loader2 className="animate-spin" />
        ) : (
          'Vérifier'
        )}
      </Button>
      <div className="flex items-center justify-center mt-9">
        <Button
          type="button"
          variant="ghost"
          className="cursor-pointer"
          onClick={() => navigate('/login')}
        >
          <ArrowLeftIcon size={14} />
          <span className="font-sans">Retour à la connexion</span>
        </Button>
      </div>
    </form>
  );
};

export default VerifyMailComponent;

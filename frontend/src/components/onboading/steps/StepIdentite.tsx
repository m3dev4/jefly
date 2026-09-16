import React, { useState } from 'react';
import { ArrowRight, Loader2 } from 'lucide-react';

interface StepIdentiteProps {
  initialData?: {
    first_name?: string;
    last_name?: string;
    number_phone?: string;
  };
  stepNumber: number;
  totalSteps: number;
  onSubmit: (data: { first_name: string; last_name: string; number_phone: string }) => void;
  isLoading?: boolean;
}

export const StepIdentite: React.FC<StepIdentiteProps> = ({
  initialData,
  stepNumber,
  totalSteps,
  onSubmit,
  isLoading = false,
}) => {
  const [firstName, setFirstName] = useState(initialData?.first_name || '');
  const [lastName, setLastName] = useState(initialData?.last_name || '');
  const [phoneNumber, setPhoneNumber] = useState(initialData?.number_phone || '');
  const [error, setError] = useState('');

  React.useEffect(() => {
    if (initialData?.first_name) setFirstName(initialData.first_name);
    if (initialData?.last_name) setLastName(initialData.last_name);
    if (initialData?.number_phone) setPhoneNumber(initialData.number_phone);
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName.trim() || !lastName.trim() || !phoneNumber.trim()) {
      setError('Veuillez remplir tous les champs obligatoires.');
      return;
    }
    setError('');
    onSubmit({
      first_name: firstName.trim(),
      last_name: lastName.trim(),
      number_phone: phoneNumber.trim(),
    });
  };

  return (
    <div className="w-full max-w-xl mx-auto flex flex-col justify-center">
      {/* Badge Step */}
      <div className="mb-4">
        <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-orange-50 text-[#f2994a] border border-orange-100">
          Étape {stepNumber} sur {totalSteps}
        </span>
      </div>

      {/* Header */}
      <h1 className="text-2xl sm:text-3xl font-bold text-neutral-900 tracking-tight mb-2">
        Commençons par faire connaissance
      </h1>
      <p className="text-neutral-500 text-sm sm:text-base mb-8">
        Entrez vos informations personnelles pour créer votre compte.
      </p>

      {error && (
        <div className="mb-6 p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm">
          {error}
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-neutral-800 mb-2">
              Prénom
            </label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="Ex: Jean"
              className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-[#1b4b6b]/20 focus:border-[#1b4b6b] transition-all placeholder:text-neutral-300 text-neutral-900"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-neutral-800 mb-2">
              Nom
            </label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Ex: Dupont"
              className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-[#1b4b6b]/20 focus:border-[#1b4b6b] transition-all placeholder:text-neutral-300 text-neutral-900"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-neutral-800 mb-2">
            Numéro de téléphone
          </label>
          <input
            type="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="Ex: 07 12 34 56 78"
            className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-[#1b4b6b]/20 focus:border-[#1b4b6b] transition-all placeholder:text-neutral-300 text-neutral-900"
            required
          />
        </div>

        <div className="flex justify-end pt-4">
          <button
            type="submit"
            disabled={isLoading}
            className="inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-[#f2994a] hover:bg-[#e0893a] text-white font-medium shadow-sm transition-all duration-150 disabled:opacity-50 cursor-pointer"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Chargement...</span>
              </>
            ) : (
              <>
                <span>Continuer</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

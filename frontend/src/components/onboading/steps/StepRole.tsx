import React, { useState } from 'react';
import { User, Briefcase, HelpCircle, ArrowRight, ArrowLeft, Loader2 } from 'lucide-react';

interface StepRoleProps {
  initialRole?: string;
  stepNumber: number;
  totalSteps: number;
  onBack: () => void;
  onSubmit: (role: 'freelance' | 'annonceur') => void;
  isLoading?: boolean;
}

export const StepRole: React.FC<StepRoleProps> = ({
  initialRole,
  stepNumber,
  totalSteps,
  onBack,
  onSubmit,
  isLoading = false,
}) => {
  const [selectedRole, setSelectedRole] = useState<'freelance' | 'annonceur'>(
    (initialRole as 'freelance' | 'annonceur') || 'freelance'
  );

  React.useEffect(() => {
    if (initialRole === 'freelance' || initialRole === 'annonceur') {
      setSelectedRole(initialRole);
    }
  }, [initialRole]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedRole) {
      onSubmit(selectedRole);
    }
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
        Quel est votre profil ?
      </h1>
      <p className="text-neutral-500 text-sm sm:text-base mb-8">
        Choisissez le rôle qui correspond à votre activité sur Jefly.
      </p>

      {/* Roles selection */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Freelance Option */}
        <div
          onClick={() => setSelectedRole('freelance')}
          className={`w-full p-5 rounded-2xl cursor-pointer flex items-center justify-between transition-all duration-200 ${
            selectedRole === 'freelance'
              ? 'border-2 border-[#1b4b6b] bg-[#F2F7FA] shadow-xs'
              : 'border border-neutral-200 bg-white hover:border-neutral-300'
          }`}
        >
          <div className="flex items-center gap-4">
            <div
              className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                selectedRole === 'freelance'
                  ? 'bg-white text-[#1b4b6b] shadow-xs'
                  : 'bg-neutral-100 text-neutral-500'
              }`}
            >
              <User className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-neutral-900 text-base mb-0.5">Freelance</h3>
              <p className="text-xs sm:text-sm text-neutral-500">
                Je propose mes services et mon expertise aux annonceurs.
              </p>
            </div>
          </div>

          {/* Radio indicator */}
          <div className="shrink-0 ml-3">
            <div
              className={`w-5 h-5 rounded-full flex items-center justify-center border-2 transition-all ${
                selectedRole === 'freelance'
                  ? 'border-[#1b4b6b]'
                  : 'border-neutral-300 bg-transparent'
              }`}
            >
              {selectedRole === 'freelance' && (
                <div className="w-2.5 h-2.5 rounded-full bg-[#f2994a]" />
              )}
            </div>
          </div>
        </div>

        {/* Annonceur Option */}
        <div
          onClick={() => setSelectedRole('annonceur')}
          className={`w-full p-5 rounded-2xl cursor-pointer flex items-center justify-between transition-all duration-200 ${
            selectedRole === 'annonceur'
              ? 'border-2 border-[#1b4b6b] bg-[#F2F7FA] shadow-xs'
              : 'border border-neutral-200 bg-white hover:border-neutral-300'
          }`}
        >
          <div className="flex items-center gap-4">
            <div
              className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                selectedRole === 'annonceur'
                  ? 'bg-white text-[#1b4b6b] shadow-xs'
                  : 'bg-neutral-100 text-neutral-500'
              }`}
            >
              <Briefcase className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-neutral-900 text-base mb-0.5">Annonceur</h3>
              <p className="text-xs sm:text-sm text-neutral-500">
                Je recherche des talents pour réaliser mes projets.
              </p>
            </div>
          </div>

          {/* Radio indicator */}
          <div className="shrink-0 ml-3">
            <div
              className={`w-5 h-5 rounded-full flex items-center justify-center border-2 transition-all ${
                selectedRole === 'annonceur'
                  ? 'border-[#1b4b6b]'
                  : 'border-neutral-300 bg-transparent'
              }`}
            >
              {selectedRole === 'annonceur' && (
                <div className="w-2.5 h-2.5 rounded-full bg-[#f2994a]" />
              )}
            </div>
          </div>
        </div>

        {/* Navigation buttons */}
        <div className="flex items-center justify-between pt-6">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-neutral-200 bg-white text-neutral-700 font-medium hover:bg-neutral-50 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Retour</span>
          </button>

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

        {/* Helper guide box */}
        <div className="mt-8 p-4 rounded-2xl bg-[#FAF9F6] border border-neutral-200/80 flex items-center gap-3.5">
          <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center text-[#1b4b6b] shrink-0 shadow-2xs">
            <HelpCircle className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-semibold text-neutral-900">Besoin d'aide ?</h4>
            <p className="text-xs text-neutral-500">
              Consultez notre guide pour choisir le profil qui vous convient le mieux.
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};

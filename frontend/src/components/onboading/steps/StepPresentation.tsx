import React, { useState } from 'react';
import { Lightbulb, ArrowRight, ArrowLeft, Loader2 } from 'lucide-react';

interface StepPresentationProps {
  initialData?: {
    title?: string;
    description?: string;
    githubUrl?: string;
    linkedinUrl?: string;
  };
  stepNumber: number;
  totalSteps: number;
  onBack: () => void;
  onSubmit: (data: { title: string; description: string; githubUrl?: string; linkedinUrl?: string }) => void;
  isLoading?: boolean;
}

export const StepPresentation: React.FC<StepPresentationProps> = ({
  initialData,
  stepNumber,
  totalSteps,
  onBack,
  onSubmit,
  isLoading = false,
}) => {
  const [title, setTitle] = useState(initialData?.title || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [error, setError] = useState('');

  React.useEffect(() => {
    if (initialData?.title) setTitle(initialData.title);
    if (initialData?.description) setDescription(initialData.description);
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Le titre professionnel est obligatoire.');
      return;
    }
    if (description.trim().length < 20) {
      setError('Veuillez fournir une description détaillée (au moins 20 caractères).');
      return;
    }
    setError('');
    onSubmit({
      title: title.trim(),
      description: description.trim(),
      githubUrl: initialData?.githubUrl || '',
      linkedinUrl: initialData?.linkedinUrl || '',
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
        Parlez-nous de vous
      </h1>
      <p className="text-neutral-500 text-sm sm:text-base mb-8">
        Présentez votre activité en quelques mots pour attirer les annonceurs.
      </p>

      {error && (
        <div className="mb-6 p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Titre du profil */}
        <div>
          <label className="block text-sm font-semibold text-neutral-800 mb-2">
            Titre du profil
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="ex: Designer Produit Senior"
            className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-[#1b4b6b]/20 focus:border-[#1b4b6b] transition-all placeholder:text-neutral-300 text-neutral-900 text-sm"
            required
          />
        </div>

        {/* Description */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-semibold text-neutral-800">
              Description
            </label>
            <span className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider">
              MIN. 100 CARACTÈRES
            </span>
          </div>
          <div className="relative">
            <textarea
              rows={5}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Décrivez votre parcours, vos points forts et ce que vous pouvez apporter à vos futurs clients..."
              className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-[#1b4b6b]/20 focus:border-[#1b4b6b] transition-all placeholder:text-neutral-300 text-neutral-900 text-sm resize-none"
              maxLength={2000}
              required
            />
            <div className="absolute bottom-3 right-3 text-xs text-neutral-400">
              {description.length} / 2000
            </div>
          </div>
        </div>

        {/* Navigation buttons */}
        <div className="flex items-center justify-between pt-4">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-neutral-200 bg-white text-neutral-700 font-medium hover:bg-neutral-50 transition-colors cursor-pointer text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Retour</span>
          </button>

          <button
            type="submit"
            disabled={isLoading}
            className="inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-[#f2994a] hover:bg-[#e0893a] text-white font-medium shadow-sm transition-all duration-150 disabled:opacity-50 cursor-pointer text-sm"
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

        {/* Conseil d'expert box */}
        <div className="mt-8 p-4 rounded-2xl bg-[#FAF9F6] border border-neutral-200/80 flex items-center gap-3.5">
          <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center text-[#1b4b6b] shrink-0 shadow-2xs">
            <Lightbulb className="w-5 h-5 text-[#1b4b6b]" />
          </div>
          <div>
            <h4 className="text-xs font-semibold text-neutral-900">Conseil d'expert</h4>
            <p className="text-xs text-neutral-500">
              Les profils avec une description détaillée et un titre précis reçoivent en moyenne 4x plus de propositions directes.
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};

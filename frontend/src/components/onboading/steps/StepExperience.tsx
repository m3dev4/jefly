import React, { useState } from 'react';
import { ArrowRight, ArrowLeft, Loader2, Plus, Trash2 } from 'lucide-react';

interface ExperienceItem {
  entreprise: string;
  poste: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  description?: string;
}

interface StepExperienceProps {
  initialData?: ExperienceItem[];
  stepNumber: number;
  totalSteps: number;
  onBack: () => void;
  onSkip: () => void;
  onSubmit: (data: ExperienceItem[]) => void;
  isLoading?: boolean;
}

export const StepExperience: React.FC<StepExperienceProps> = ({
  initialData = [],
  stepNumber,
  totalSteps,
  onBack,
  onSkip,
  onSubmit,
  isLoading = false,
}) => {
  const [experiences, setExperiences] = useState<ExperienceItem[]>(
    initialData.length > 0
      ? initialData
      : [
          {
            entreprise: '',
            poste: '',
            startDate: '',
            endDate: '',
            current: true,
            description: '',
          },
        ]
  );

  const addExperience = () => {
    setExperiences((prev) => [
      ...prev,
      {
        entreprise: '',
        poste: '',
        startDate: '',
        endDate: '',
        current: false,
        description: '',
      },
    ]);
  };

  const removeExperience = (index: number) => {
    setExperiences((prev) => prev.filter((_, i) => i !== index));
  };

  const updateExperience = (index: number, field: keyof ExperienceItem, value: any) => {
    setExperiences((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const valid = experiences.filter((exp) => exp.entreprise && exp.poste && exp.startDate);
    if (valid.length === 0) {
      onSkip();
      return;
    }
    onSubmit(valid);
  };

  return (
    <div className="w-full max-w-xl mx-auto flex flex-col justify-center">
      <div className="mb-4">
        <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-orange-50 text-[#f2994a] border border-orange-100">
          Étape {stepNumber} sur {totalSteps}
        </span>
      </div>

      <div className="flex items-start justify-between mb-2">
        <h1 className="text-2xl sm:text-3xl font-bold text-neutral-900 tracking-tight">
          Expérience professionnelle
        </h1>
        <button
          type="button"
          onClick={onSkip}
          className="text-xs font-semibold text-neutral-400 hover:text-neutral-700 underline cursor-pointer mt-1"
        >
          Passer
        </button>
      </div>
      <p className="text-neutral-500 text-sm mb-6">
        Renseignez vos postes marquants ou sautez cette étape.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-4 max-h-[320px] overflow-y-auto pr-1">
          {experiences.map((exp, index) => (
            <div
              key={index}
              className="p-4 rounded-2xl border border-neutral-200 bg-white space-y-3 relative"
            >
              {experiences.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeExperience(index)}
                  className="absolute top-3 right-3 text-neutral-400 hover:text-red-500"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    Entreprise
                  </label>
                  <input
                    type="text"
                    value={exp.entreprise}
                    onChange={(e) => updateExperience(index, 'entreprise', e.target.value)}
                    placeholder="Ex: Google, Freelance..."
                    className="w-full px-3 py-2 text-sm rounded-xl border border-neutral-200 focus:outline-none focus:border-[#1b4b6b]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    Poste
                  </label>
                  <input
                    type="text"
                    value={exp.poste}
                    onChange={(e) => updateExperience(index, 'poste', e.target.value)}
                    placeholder="Ex: Senior Frontend Dev"
                    className="w-full px-3 py-2 text-sm rounded-xl border border-neutral-200 focus:outline-none focus:border-[#1b4b6b]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    Date de début
                  </label>
                  <input
                    type="date"
                    value={exp.startDate}
                    onChange={(e) => updateExperience(index, 'startDate', e.target.value)}
                    className="w-full px-3 py-2 text-sm rounded-xl border border-neutral-200 focus:outline-none focus:border-[#1b4b6b]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    Date de fin
                  </label>
                  <input
                    type="date"
                    disabled={exp.current}
                    value={exp.current ? '' : exp.endDate || ''}
                    onChange={(e) => updateExperience(index, 'endDate', e.target.value)}
                    className="w-full px-3 py-2 text-sm rounded-xl border border-neutral-200 focus:outline-none focus:border-[#1b4b6b] disabled:bg-neutral-100 disabled:opacity-50"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id={`current-${index}`}
                  checked={exp.current}
                  onChange={(e) => updateExperience(index, 'current', e.target.checked)}
                  className="rounded text-[#1b4b6b] focus:ring-[#1b4b6b]"
                />
                <label htmlFor={`current-${index}`} className="text-xs text-neutral-600">
                  Poste actuel
                </label>
              </div>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={addExperience}
          className="w-full py-2.5 rounded-xl border border-dashed border-neutral-300 text-neutral-600 hover:text-neutral-900 hover:border-neutral-400 text-xs font-medium flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Ajouter une autre expérience</span>
        </button>

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
      </form>
    </div>
  );
};

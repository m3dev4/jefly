import React, { useState, useEffect } from 'react';
import { ArrowRight, ArrowLeft, Loader2, Code2, Check } from 'lucide-react';
import { useTechnologies } from '../../../hooks/useOnboarding';

interface StepTechnologiesProps {
  initialTechIds?: number[];
  stepNumber: number;
  totalSteps: number;
  onBack: () => void;
  onSubmit: (techIds: number[]) => void;
  isLoading?: boolean;
}

export const StepTechnologies: React.FC<StepTechnologiesProps> = ({
  initialTechIds = [],
  stepNumber,
  totalSteps,
  onBack,
  onSubmit,
  isLoading = false,
}) => {
  const { data: rawTech, isLoading: isTechLoading } = useTechnologies();
  const [selectedIds, setSelectedIds] = useState<number[]>(initialTechIds);
  const [error, setError] = useState('');

  // Handle both array and paginated response
  const techList = React.useMemo(() => {
    if (!rawTech) return [];
    if (Array.isArray(rawTech)) return rawTech;
    if (typeof rawTech === 'object' && 'results' in rawTech && Array.isArray((rawTech as any).results)) {
      return (rawTech as any).results;
    }
    return [];
  }, [rawTech]);

  useEffect(() => {
    if (initialTechIds.length > 0) {
      setSelectedIds(initialTechIds);
    }
  }, [initialTechIds]);

  const toggleTech = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedIds.length === 0) {
      setError('Veuillez sélectionner au moins une technologie dans le catalogue.');
      return;
    }
    setError('');
    onSubmit(selectedIds);
  };

  return (
    <div className="w-full max-w-xl mx-auto flex flex-col justify-center">
      {/* Badge Step */}
      <div className="mb-4">
        <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-orange-50 text-[#f2994a] border border-orange-100">
          Étape {stepNumber} sur {totalSteps}
        </span>
      </div>

      <h1 className="text-2xl sm:text-3xl font-bold text-neutral-900 tracking-tight mb-2">
        Quelles technologies maîtrisez-vous ?
      </h1>
      <p className="text-neutral-500 text-sm sm:text-base mb-6">
        Sélectionnez dans le catalogue les outils et frameworks que vous maîtrisez (sélection multiple).
      </p>

      {error && (
        <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm">
          {error}
        </div>
      )}

      {isTechLoading ? (
        <div className="flex flex-col items-center justify-center py-12 gap-2 text-neutral-400">
          <Loader2 className="w-8 h-8 animate-spin text-[#1b4b6b]" />
          <span className="text-xs">Chargement des technologies depuis la base de données...</span>
        </div>
      ) : techList.length === 0 ? (
        <div className="p-6 rounded-2xl bg-neutral-50 border border-neutral-200 text-center text-neutral-500 text-sm">
          Aucune technologie disponible dans le catalogue pour le moment.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-[290px] overflow-y-auto p-1">
            {techList.map((tech: { id: number; name: string; imgUrl?: string }) => {
              const isSelected = selectedIds.includes(tech.id);
              return (
                <div
                  key={tech.id}
                  onClick={() => toggleTech(tech.id)}
                  className={`p-3 rounded-2xl cursor-pointer flex items-center gap-3 transition-all duration-150 select-none ${
                    isSelected
                      ? 'border-2 border-[#1b4b6b] bg-[#F2F7FA] shadow-xs'
                      : 'border border-neutral-200 bg-white hover:border-neutral-300'
                  }`}
                >
                  {/* Tech Logo / Icon */}
                  <div className="w-8 h-8 rounded-lg bg-neutral-100 flex items-center justify-center shrink-0 overflow-hidden">
                    {tech.imgUrl ? (
                      <img
                        src={tech.imgUrl}
                        alt={tech.name}
                        className="w-full h-full object-contain p-1"
                        onError={(e) => {
                          // Fallback on broken image
                          (e.currentTarget as HTMLElement).style.display = 'none';
                        }}
                      />
                    ) : (
                      <Code2 className="w-4 h-4 text-neutral-500" />
                    )}
                  </div>

                  <span
                    className={`text-xs sm:text-sm tracking-tight flex-1 truncate ${
                      isSelected ? 'font-bold text-neutral-900' : 'font-medium text-neutral-700'
                    }`}
                  >
                    {tech.name}
                  </span>

                  {isSelected && (
                    <div className="w-4 h-4 rounded-full bg-[#1b4b6b] text-white flex items-center justify-center shrink-0">
                      <Check className="w-2.5 h-2.5 stroke-[3]" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

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
              disabled={isLoading || selectedIds.length === 0}
              className="inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-[#f2994a] hover:bg-[#e0893a] text-white font-medium shadow-sm transition-all duration-150 disabled:opacity-50 cursor-pointer text-sm"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Chargement...</span>
                </>
              ) : (
                <>
                  <span>Continuer ({selectedIds.length})</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

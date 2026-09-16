import React, { useState, useEffect } from 'react';
import {
  Layers,
  Star,
  ArrowRight,
  ArrowLeft,
  Loader2,
  Check,
} from 'lucide-react';
import { useServices } from '../../../hooks/useOnboarding';

interface StepServicesProps {
  initialServiceId?: number;
  stepNumber: number;
  totalSteps: number;
  onBack: () => void;
  onSubmit: (serviceId: number) => void;
  isLoading?: boolean;
}

export const StepServices: React.FC<StepServicesProps> = ({
  initialServiceId,
  stepNumber,
  totalSteps,
  onBack,
  onSubmit,
  isLoading = false,
}) => {
  const { data: rawServices, isLoading: isServicesLoading } = useServices();
  const [selectedId, setSelectedId] = useState<number | null>(initialServiceId || null);
  const [error, setError] = useState('');

  // Handle both array and paginated response
  const servicesList = React.useMemo(() => {
    if (!rawServices) return [];
    if (Array.isArray(rawServices)) return rawServices;
    if (typeof rawServices === 'object' && 'results' in rawServices && Array.isArray((rawServices as any).results)) {
      return (rawServices as any).results;
    }
    return [];
  }, [rawServices]);

  useEffect(() => {
    if (initialServiceId) {
      setSelectedId(initialServiceId);
    } else if (servicesList.length > 0 && selectedId === null) {
      setSelectedId(servicesList[0].id);
    }
  }, [initialServiceId, servicesList, selectedId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedId) {
      setError('Veuillez sélectionner un service parmi ceux disponibles.');
      return;
    }
    setError('');
    onSubmit(selectedId);
  };

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col justify-center">
      {/* Badge Step */}
      <div className="mb-3">
        <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-orange-50 text-[#f2994a] border border-orange-100">
          Étape {stepNumber} sur {totalSteps}
        </span>
      </div>

      {/* Header */}
      <h1 className="text-2xl sm:text-3xl font-bold text-neutral-900 tracking-tight mb-2">
        Quel service proposez-vous ?
      </h1>
      <p className="text-neutral-500 text-sm sm:text-base mb-6">
        Sélectionnez le service principal qui correspond à votre expertise dans notre catalogue.
      </p>

      {error && (
        <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm">
          {error}
        </div>
      )}

      {isServicesLoading ? (
        <div className="flex flex-col items-center justify-center py-12 gap-2 text-neutral-400">
          <Loader2 className="w-8 h-8 animate-spin text-[#1b4b6b]" />
          <span className="text-xs">Chargement des services depuis la base de données...</span>
        </div>
      ) : servicesList.length === 0 ? (
        <div className="p-6 rounded-2xl bg-neutral-50 border border-neutral-200 text-center text-neutral-500 text-sm">
          Aucun service configuré dans le catalogue pour le moment.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Services Grid strictly from database */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 max-h-[300px] overflow-y-auto p-1">
            {servicesList.map((service: { id: number; name: string; description?: string }) => {
              const isSelected = selectedId === service.id;

              return (
                <div
                  key={service.id}
                  onClick={() => setSelectedId(service.id)}
                  className={`relative p-4 rounded-2xl cursor-pointer flex flex-col items-start justify-between min-h-[95px] transition-all duration-150 ${
                    isSelected
                      ? 'border-2 border-[#1b4b6b] bg-[#F2F7FA] shadow-xs'
                      : 'border border-neutral-200 bg-white hover:border-neutral-300'
                  }`}
                >
                  {/* Active Indicator */}
                  {isSelected && (
                    <span className="absolute top-3 right-3 w-2 h-2 rounded-full bg-[#f2994a]" />
                  )}

                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center mb-3 ${
                      isSelected
                        ? 'bg-white text-[#1b4b6b] shadow-2xs'
                        : 'bg-neutral-100 text-neutral-600'
                    }`}
                  >
                    <Layers className="w-4.5 h-4.5" />
                  </div>

                  <div>
                    <span className="font-semibold text-xs sm:text-sm text-neutral-900 tracking-tight block">
                      {service.name}
                    </span>
                    {service.description && (
                      <span className="text-[11px] text-neutral-500 line-clamp-1 mt-0.5 block">
                        {service.description}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Navigation buttons */}
          <div className="flex items-center justify-between pt-2">
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
              disabled={isLoading || !selectedId}
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

          {/* Conseil de visibilité box */}
          <div className="p-4 rounded-2xl bg-[#FAF9F6] border border-neutral-200/80 flex items-center gap-3.5">
            <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center text-[#f2994a] shrink-0 shadow-2xs">
              <Star className="w-5 h-5 fill-[#f2994a]" />
            </div>
            <div>
              <h4 className="text-xs font-semibold text-neutral-900">Conseil de visibilité</h4>
              <p className="text-xs text-neutral-500">
                Sélectionnez votre service principal pour un positionnement clair auprès des clients.
              </p>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

import React from 'react';
import { Construction } from 'lucide-react';

interface PlaceholderPageProps {
  title: string;
  description?: string;
}

export const PlaceholderPage: React.FC<PlaceholderPageProps> = ({
  title,
  description = "Cette section est en cours de développement et sera bientôt disponible.",
}) => {
  return (
    <div className="max-w-4xl mx-auto flex flex-col items-center justify-center p-12 text-center bg-white rounded-3xl border border-[#EFECE6] min-h-[420px] shadow-2xs">
      <div className="w-16 h-16 rounded-2xl bg-amber-50 text-[#f2994a] flex items-center justify-center mb-4">
        <Construction className="w-8 h-8" />
      </div>
      <h2 className="text-2xl font-bold text-neutral-900 tracking-tight mb-2">
        {title}
      </h2>
      <p className="text-neutral-500 text-sm max-w-md">
        {description}
      </p>
    </div>
  );
};

export default PlaceholderPage;

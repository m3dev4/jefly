import React, { useDeferredValue, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { ArrowRight, Clock3, Search, SlidersHorizontal, WalletCards } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getMissions, type Mission } from '../../api/missionsApi';

const formatBudget = (value: number) => `${new Intl.NumberFormat('fr-FR').format(value)} FCFA`;
const formatDate = (value: string | null) => value ? new Intl.DateTimeFormat('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' }).format(new Date(`${value}T00:00:00`)) : 'Flexible';

const MissionCardSkeleton = () => (
  <div className="animate-pulse rounded-lg border border-[#ebe8e2] bg-white p-4">
    <div className="mb-4 flex items-center justify-between"><div className="h-4 w-20 rounded bg-[#eeeae4]" /><div className="h-3 w-12 rounded bg-[#f3f0eb]" /></div>
    <div className="mb-2 h-4 w-4/5 rounded bg-[#eeeae4]" /><div className="mb-5 h-9 w-full rounded bg-[#f3f0eb]" />
    <div className="mb-4 flex gap-2"><div className="h-5 w-14 rounded-full bg-[#f3f0eb]" /><div className="h-5 w-16 rounded-full bg-[#f3f0eb]" /></div>
    <div className="flex justify-between border-t border-[#f3f0eb] pt-3"><div className="h-3 w-20 rounded bg-[#eeeae4]" /><div className="h-3 w-14 rounded bg-[#eeeae4]" /></div>
  </div>
);

const FreelanceMissionsPage: React.FC = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const deferredSearch = useDeferredValue(search);
  const missionsQuery = useQuery({ queryKey: ['available-missions'], queryFn: getMissions });

  const missions = (missionsQuery.data || []).filter((mission) => `${mission.title} ${mission.description}`.toLowerCase().includes(deferredSearch.toLowerCase()));

  return (
    <div className="mx-auto max-w-[1080px] pb-8">
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div><p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#f2994a]">Opportunités</p><h1 className="font-heading text-xl font-semibold tracking-tight text-[#20252a]">Rechercher une mission</h1><p className="mt-1 text-[11px] text-neutral-400">Trouvez les projets qui correspondent à votre expertise.</p></div>
        <span className="text-[10px] text-neutral-400">{missionsQuery.data ? `${missions.length} mission${missions.length > 1 ? 's' : ''} disponible${missions.length > 1 ? 's' : ''}` : 'Missions disponibles'}</span>
      </div>

      <div className="mb-4 flex flex-col gap-2 sm:flex-row">
        <label className="relative flex-1"><Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-neutral-400" /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Rechercher par titre ou compétence..." className="w-full rounded-md border border-[#e7e3dc] bg-white py-2.5 pl-9 pr-3 text-[11px] outline-none focus:border-[#1b4b6b]" /></label>
        <button type="button" className="inline-flex items-center justify-center gap-2 rounded-md border border-[#e7e3dc] bg-white px-4 py-2.5 text-[11px] font-semibold text-neutral-600 hover:border-[#1b4b6b]"><SlidersHorizontal className="h-3.5 w-3.5" /> Filtres</button>
      </div>
      <div className="mb-5 flex flex-wrap gap-2"><span className="rounded-full bg-[#fff2e8] px-3 py-1.5 text-[10px] font-medium text-[#d8792b]">Toutes les missions</span><span className="rounded-full border border-[#e7e3dc] bg-white px-3 py-1.5 text-[10px] text-neutral-500">Développement</span><span className="rounded-full border border-[#e7e3dc] bg-white px-3 py-1.5 text-[10px] text-neutral-500">Design</span><span className="rounded-full border border-[#e7e3dc] bg-white px-3 py-1.5 text-[10px] text-neutral-500">Marketing</span></div>

      {missionsQuery.isLoading && <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{Array.from({ length: 6 }, (_, index) => <MissionCardSkeleton key={index} />)}</div>}
      {missionsQuery.isError && <div className="rounded-lg border border-red-100 bg-red-50 p-8 text-center text-[11px] text-red-600">Impossible de charger les missions pour le moment.</div>}
      {!missionsQuery.isLoading && !missionsQuery.isError && missions.length === 0 && <div className="rounded-lg border border-dashed border-[#d8d3cb] bg-white p-12 text-center"><p className="font-heading text-sm font-semibold text-neutral-800">Aucune mission trouvée</p><p className="mt-1 text-[11px] text-neutral-400">Essayez un autre terme de recherche.</p></div>}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {missions.map((mission: Mission) => <article key={mission.id} className="flex min-h-[218px] flex-col rounded-lg border border-[#ebe8e2] bg-white p-4 shadow-[0_4px_18px_rgba(31,42,48,0.025)] transition hover:-translate-y-0.5 hover:border-[#cfc7bc] hover:shadow-md">
          <div className="mb-3 flex items-center justify-between"><span className="rounded-full bg-[#eaf7ef] px-2 py-1 text-[9px] font-semibold uppercase text-[#29935a]">Nouveau</span><span className="text-[10px] text-neutral-400">#{mission.id}</span></div>
          <h2 className="mb-2 line-clamp-2 font-heading text-[13px] font-semibold leading-snug text-[#24282b]">{mission.title}</h2>
          <p className="line-clamp-3 text-[11px] leading-relaxed text-neutral-500">{mission.description}</p>
          <div className="mt-auto pt-4"><div className="mb-3 flex flex-wrap gap-1.5"><span className="inline-flex items-center gap-1 rounded-full bg-[#f7f5f1] px-2 py-1 text-[9px] text-neutral-500"><WalletCards className="h-2.5 w-2.5" /> {mission.operateurMobileMoney}</span><span className="inline-flex items-center gap-1 rounded-full bg-[#f7f5f1] px-2 py-1 text-[9px] text-neutral-500"><Clock3 className="h-2.5 w-2.5" /> Échéance</span></div><div className="flex items-end justify-between border-t border-[#f2efeb] pt-3"><div><p className="text-[8px] uppercase tracking-wide text-neutral-400">Budget estimé</p><p className="mt-0.5 text-[11px] font-semibold text-[#1b4b6b]">{formatBudget(mission.budget)}</p></div><button type="button" onClick={() => navigate(`/espace/missions/${mission.id}`)} className="inline-flex items-center gap-1 text-[10px] font-semibold text-[#1b4b6b] hover:underline">Voir la mission <ArrowRight className="h-3 w-3" /></button></div></div>
        </article>)}
      </div>
    </div>
  );
};

export default FreelanceMissionsPage;
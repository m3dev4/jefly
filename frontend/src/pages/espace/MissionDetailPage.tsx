import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { ArrowLeft, CalendarDays, CheckCircle2, Clock3, MapPin, Send, WalletCards } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { getMission, getMissionServices } from '../../api/missionsApi';

const formatBudget = (value: number) => `${new Intl.NumberFormat('fr-FR').format(value)} FCFA`;
const formatDate = (value: string | null) => value ? new Intl.DateTimeFormat('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' }).format(new Date(`${value}T00:00:00`)) : 'Date flexible';

const DetailSkeleton = () => <div className="animate-pulse space-y-4"><div className="h-5 w-24 rounded bg-[#eeeae4]" /><div className="h-8 w-3/4 rounded bg-[#eeeae4]" /><div className="h-24 rounded bg-[#f3f0eb]" /><div className="h-48 rounded-lg bg-[#f3f0eb]" /></div>;

const MissionDetailPage: React.FC = () => {
  const navigate = useNavigate();
  const { missionId } = useParams();
  const missionQuery = useQuery({ queryKey: ['mission', missionId], queryFn: () => getMission(Number(missionId)), enabled: Boolean(missionId) });
  const servicesQuery = useQuery({ queryKey: ['mission-services'], queryFn: getMissionServices });
  const mission = missionQuery.data;
  const serviceName = servicesQuery.data?.find((service) => service.id === mission?.service)?.name || 'Service requis';

  return <div className="mx-auto max-w-[1000px] pb-8">
    <button type="button" onClick={() => navigate('/espace/missions')} className="mb-4 inline-flex items-center gap-2 text-[11px] font-medium text-neutral-500 hover:text-[#1b4b6b]"><ArrowLeft className="h-3.5 w-3.5" /> Retour aux missions</button>
    {missionQuery.isLoading && <DetailSkeleton />}
    {missionQuery.isError && <div className="rounded-lg border border-red-100 bg-red-50 p-8 text-center text-[11px] text-red-600">Cette mission est introuvable ou n'est plus disponible.</div>}
    {mission && <>
      <div className="mb-4 rounded-lg border border-[#ebe8e2] bg-white p-5 shadow-[0_6px_24px_rgba(31,42,48,0.04)] sm:p-7"><div className="mb-4 flex flex-wrap items-center gap-2"><span className="rounded-full bg-[#eaf7ef] px-2.5 py-1 text-[9px] font-semibold uppercase text-[#29935a]">Mission disponible</span><span className="text-[10px] text-neutral-400">Publié récemment</span></div><h1 className="max-w-3xl font-heading text-2xl font-semibold leading-tight tracking-tight text-[#20252a] sm:text-3xl">{mission.title}</h1><div className="mt-5 grid gap-4 border-t border-[#f0ede8] pt-4 sm:grid-cols-3"><div className="flex items-center gap-2.5"><WalletCards className="h-4 w-4 text-[#f2994a]" /><div><p className="text-[9px] uppercase tracking-wide text-neutral-400">Budget estimé</p><p className="text-[12px] font-semibold text-neutral-800">{formatBudget(mission.budget)}</p></div></div><div className="flex items-center gap-2.5"><CalendarDays className="h-4 w-4 text-[#f2994a]" /><div><p className="text-[9px] uppercase tracking-wide text-neutral-400">Date limite</p><p className="text-[12px] font-semibold text-neutral-800">{formatDate(mission.date_deadline)}</p></div></div><div className="flex items-center gap-2.5"><Clock3 className="h-4 w-4 text-[#f2994a]" /><div><p className="text-[9px] uppercase tracking-wide text-neutral-400">Paiement</p><p className="text-[12px] font-semibold text-neutral-800">{mission.operateurMobileMoney}</p></div></div></div></div>
      <div className="grid gap-4 lg:grid-cols-[1fr_280px]"><section className="rounded-lg border border-[#ebe8e2] bg-white p-5 sm:p-7"><h2 className="mb-3 font-heading text-sm font-semibold text-[#20252a]">Description de la mission</h2><p className="whitespace-pre-line text-[12px] leading-7 text-neutral-600">{mission.description}</p><div className="mt-7 border-t border-[#f0ede8] pt-5"><h2 className="mb-3 font-heading text-sm font-semibold text-[#20252a]">Service recherché</h2><span className="inline-flex items-center gap-2 rounded-full bg-[#f7f5f1] px-3 py-2 text-[10px] font-medium text-neutral-600"><CheckCircle2 className="h-3.5 w-3.5 text-[#1b4b6b]" /> {serviceName}</span></div></section><aside className="h-fit rounded-lg border border-[#ebe8e2] bg-white p-5"><p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-neutral-400">Votre candidature</p><p className="mb-5 text-[11px] leading-relaxed text-neutral-500">Cette mission correspond à votre profil ? Envoyez votre proposition à l'annonceur.</p><button type="button" className="mb-2 inline-flex w-full items-center justify-center gap-2 rounded-md bg-[#1b4b6b] px-4 py-2.5 text-[11px] font-semibold text-white hover:bg-[#143b55]"><Send className="h-3.5 w-3.5" /> Postuler à la mission</button><button type="button" onClick={() => navigate('/espace/missions')} className="w-full rounded-md border border-[#e7e3dc] px-4 py-2.5 text-[11px] font-medium text-neutral-600 hover:border-[#1b4b6b]">Retour à la recherche</button><div className="mt-5 border-t border-[#f0ede8] pt-4 text-[10px] text-neutral-400"><p className="mb-2 flex items-center gap-2"><MapPin className="h-3 w-3" /> Travail à distance</p><p>Annonce publiée par un annonceur vérifié.</p></div></aside></div>
    </>}
  </div>;
};

export default MissionDetailPage;
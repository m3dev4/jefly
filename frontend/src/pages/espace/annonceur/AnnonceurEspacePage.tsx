import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  Briefcase,
  CalendarDays,
  Clock,
  Code2,
  ExternalLink,
  Loader2,
  MessageSquare,
  Search,
  UserCheck,
  CheckCircle,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getPropositions, type Proposition } from '../../../api/propositionsApi';

const formatBudget = (value: number) =>
  `${new Intl.NumberFormat('fr-FR').format(value)} FCFA`;

const formatDate = (value: string | null | undefined) =>
  value
    ? new Intl.DateTimeFormat('fr-FR', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      }).format(new Date(value))
    : 'N/A';

const AnnonceurEspacePage: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const { data: propositions = [], isLoading } = useQuery({
    queryKey: ['propositions-announcer-espace'],
    queryFn: () => getPropositions(),
  });

  // Filter only ACCEPTED propositions (missions currently in development)
  const acceptedProjects = propositions.filter((prop: Proposition) => {
    const isAccepted = prop.proposition_status === 'ACCEPTED';
    const matchesSearch =
      prop.mission_title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prop.freelance_info?.first_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prop.freelance_info?.last_name?.toLowerCase().includes(searchTerm.toLowerCase());
    return isAccepted && matchesSearch;
  });

  return (
    <div className="mx-auto max-w-[1080px] pb-12">
      {/* Header */}
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-[#EFECE6] pb-4">
        <div>
          <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#f2994a]">
            Suivi de Projets
          </span>
          <h1 className="font-heading text-xl font-bold tracking-tight text-neutral-900">
            Espace Projets & Développement
          </h1>
          <p className="mt-1 text-[11px] text-neutral-500">
            Missions dont vous avez accepté la candidature et qui sont en phase de réalisation.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-neutral-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Rechercher par titre ou freelance..."
              className="w-56 sm:w-64 rounded-md border border-[#e7e3dc] bg-white py-1.5 pl-8 pr-3 text-[11px] outline-none focus:border-[#1b4b6b]"
            />
          </div>
        </div>
      </div>

      {/* Loading state */}
      {isLoading && (
        <div className="flex h-48 flex-col items-center justify-center gap-3 rounded-lg border border-[#ebe8e2] bg-white p-8">
          <Loader2 className="h-6 w-6 animate-spin text-[#1b4b6b]" />
          <p className="text-[11px] font-medium text-neutral-500">Chargement de vos projets...</p>
        </div>
      )}

      {/* Empty State */}
      {!isLoading && acceptedProjects.length === 0 && (
        <div className="rounded-xl border border-dashed border-[#d8d3cb] bg-white p-12 text-center">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#f0f4f8] text-[#1b4b6b]">
            <Briefcase className="h-6 w-6" />
          </div>
          <h3 className="font-heading text-sm font-semibold text-neutral-900">
            Aucun projet en développement
          </h3>
          <p className="mx-auto mt-1 max-w-sm text-[11px] text-neutral-400 leading-relaxed">
            Lorsque vous acceptez la candidature d'un freelance depuis la page{' '}
            <span className="font-medium text-neutral-600">"Candidatures reçues"</span>, la mission bascule automatiquement ici.
          </p>
          <button
            onClick={() => navigate('/espace/candidatures-recues')}
            className="mt-4 inline-flex items-center gap-2 rounded-md bg-[#1b4b6b] px-4 py-2 text-[11px] font-semibold text-white hover:bg-[#143952] transition-colors cursor-pointer"
          >
            <UserCheck className="h-3.5 w-3.5" /> Voir les candidatures reçues
          </button>
        </div>
      )}

      {/* Projects List */}
      {!isLoading && acceptedProjects.length > 0 && (
        <div className="grid gap-4 md:grid-cols-2">
          {acceptedProjects.map((prop: Proposition) => {
            const freelance = prop.freelance_info;
            const fullName = freelance
              ? `${freelance.first_name} ${freelance.last_name}`.trim()
              : `Freelance #${prop.freelance}`;

            return (
              <div
                key={prop.id}
                className="flex flex-col rounded-xl border border-[#ebe8e2] bg-white p-5 shadow-xs transition-all hover:shadow-md"
              >
                {/* Mission Header */}
                <div className="mb-3 flex items-start justify-between gap-2 border-b border-[#f3f0eb] pb-3">
                  <div>
                    <span className="mb-1 inline-flex items-center gap-1 rounded-full bg-[#eaf7ef] px-2.5 py-0.5 text-[9.5px] font-semibold text-[#29935a]">
                      <CheckCircle className="h-3 w-3" /> En développement
                    </span>
                    <h2 className="font-heading text-sm font-bold text-neutral-900 leading-tight">
                      {prop.mission_title}
                    </h2>
                  </div>
                  <span className="text-[11px] font-bold text-[#1b4b6b] shrink-0">
                    {formatBudget(prop.mission_budget)}
                  </span>
                </div>

                {/* Freelance Assigned Box */}
                <div className="mb-4 rounded-lg bg-[#FAF9F6] border border-[#e7e3dc] p-3 flex items-center gap-3">
                  <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full border border-[#d8d3cb] bg-white flex items-center justify-center">
                    {freelance?.avatar ? (
                      <img
                        src={freelance.avatar}
                        alt={fullName}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="text-xs font-bold text-[#1b4b6b]">
                        {fullName.charAt(0).toUpperCase()}
                      </div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="text-[11px] font-bold text-neutral-900 truncate">{fullName}</p>
                    <p className="text-[10px] text-neutral-500 truncate">
                      {freelance?.titre || 'Développeur Fullstack'}
                    </p>
                    {freelance?.technologies && freelance.technologies.length > 0 && (
                      <div className="mt-1 flex flex-wrap gap-1">
                        {freelance.technologies.slice(0, 3).map((tech, i) => (
                          <span
                            key={i}
                            className="inline-flex items-center gap-0.5 rounded bg-white px-1.5 py-0.2 text-[8.5px] font-medium text-neutral-600 border border-[#e2ded6]"
                          >
                            <Code2 className="h-2 w-2 text-[#f2994a]" /> {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Details */}
                <div className="mb-4 space-y-2 text-[11px] text-neutral-600">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5 text-neutral-400">
                      <CalendarDays className="h-3.5 w-3.5 text-neutral-400" /> Date de livraison prévue:
                    </span>
                    <span className="font-semibold text-neutral-800">
                      {formatDate(prop.date_livraison)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5 text-neutral-400">
                      <Clock className="h-3.5 w-3.5 text-neutral-400" /> Statut mission:
                    </span>
                    <span className="font-semibold text-neutral-800">Mission fermée aux candidatures</span>
                  </div>
                </div>

                {/* Motivation snippet */}
                <div className="mb-4 rounded bg-[#f7f5f0] p-2.5 text-[10.5px] text-neutral-600 italic line-clamp-2">
                  "{prop.lettre_motivation}"
                </div>

                {/* Actions */}
                <div className="mt-auto pt-3 border-t border-[#f3f0eb] flex items-center justify-between gap-2">
                  <button
                    onClick={() => navigate('/espace/messages')}
                    className="inline-flex items-center gap-1.5 rounded-md border border-[#1b4b6b] bg-white px-3 py-1.5 text-[10.5px] font-semibold text-[#1b4b6b] hover:bg-[#f0f4f8] transition-colors cursor-pointer"
                  >
                    <MessageSquare className="h-3.5 w-3.5" /> Contacter le freelance
                  </button>

                  <button
                    onClick={() => navigate(`/espace/missions/${prop.mission}`)}
                    className="inline-flex items-center gap-1 text-[10.5px] font-semibold text-neutral-500 hover:text-neutral-900 cursor-pointer"
                  >
                    Détails mission <ExternalLink className="h-3 w-3" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default AnnonceurEspacePage;

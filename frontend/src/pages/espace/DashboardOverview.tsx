import React from 'react';
import { useQuery } from '@tanstack/react-query';
import getCurrentUser from '../../utils/getUser';
import {
  TrendingUp,
  Clock,
  CheckCircle2,
  Briefcase,
  Search,
  PlusCircle,
  ArrowRight,
} from 'lucide-react';
import { NavLink } from 'react-router-dom';

export const DashboardOverview: React.FC = () => {
  const { data: user } = useQuery({
    queryKey: ['currentUser'],
    queryFn: getCurrentUser,
    retry: false,
  });

  const isFreelance = user?.role === 'freelance';

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#1b4b6b] to-[#2a648b] text-white p-8 shadow-sm">
        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs font-semibold uppercase tracking-wider text-orange-200">
            <span>Espace {isFreelance ? 'Freelance' : 'Annonceur'}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold font-heading tracking-tight">
            Bienvenue, {user?.first_name || 'Utilisateur'} !
          </h1>
          <p className="text-white/80 text-sm sm:text-base leading-relaxed">
            {isFreelance
              ? 'Consultez vos candidatures, vos missions en cours et trouvez de nouvelles opportunités adaptées à votre profil.'
              : 'Gérez vos annonces de missions, découvrez des talents qualifiés et suivez les candidatures reçues.'}
          </p>

          <div className="pt-2 flex flex-wrap gap-3">
            {isFreelance ? (
              <NavLink
                to="/espace/missions"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#f2994a] hover:bg-[#e0893a] text-white text-sm font-semibold transition-all shadow-xs"
              >
                <Search className="w-4 h-4" />
                <span>Trouver une mission</span>
              </NavLink>
            ) : (
              <NavLink
                to="/espace/publier-mission"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#f2994a] hover:bg-[#e0893a] text-white text-sm font-semibold transition-all shadow-xs"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Publier une mission</span>
              </NavLink>
            )}

            <NavLink
              to="/espace/profil"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/15 hover:bg-white/20 text-white text-sm font-medium transition-all backdrop-blur-md"
            >
              <span>Voir mon profil</span>
              <ArrowRight className="w-4 h-4" />
            </NavLink>
          </div>
        </div>

        {/* Decorative background shape */}
        <div className="absolute -right-16 -bottom-16 w-64 h-64 rounded-full bg-white/5 blur-2xl pointer-events-none" />
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {isFreelance ? (
          <>
            <div className="p-5 rounded-2xl bg-white border border-[#EFECE6] flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400 block mb-1">
                  Candidatures actives
                </span>
                <span className="text-2xl font-bold text-neutral-900">12</span>
              </div>
              <div className="w-11 h-11 rounded-xl bg-blue-50 text-[#1b4b6b] flex items-center justify-center">
                <Briefcase className="w-5 h-5" />
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-[#EFECE6] flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400 block mb-1">
                  Missions en cours
                </span>
                <span className="text-2xl font-bold text-neutral-900">3</span>
              </div>
              <div className="w-11 h-11 rounded-xl bg-amber-50 text-[#f2994a] flex items-center justify-center">
                <Clock className="w-5 h-5" />
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-[#EFECE6] flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400 block mb-1">
                  Missions terminées
                </span>
                <span className="text-2xl font-bold text-neutral-900">18</span>
              </div>
              <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5" />
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-[#EFECE6] flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400 block mb-1">
                  Revenus du mois
                </span>
                <span className="text-2xl font-bold text-neutral-900">1 450 €</span>
              </div>
              <div className="w-11 h-11 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                <TrendingUp className="w-5 h-5" />
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="p-5 rounded-2xl bg-white border border-[#EFECE6] flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400 block mb-1">
                  Annonces actives
                </span>
                <span className="text-2xl font-bold text-neutral-900">4</span>
              </div>
              <div className="w-11 h-11 rounded-xl bg-blue-50 text-[#1b4b6b] flex items-center justify-center">
                <Briefcase className="w-5 h-5" />
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-[#EFECE6] flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400 block mb-1">
                  Candidatures reçues
                </span>
                <span className="text-2xl font-bold text-neutral-900">23</span>
              </div>
              <div className="w-11 h-11 rounded-xl bg-amber-50 text-[#f2994a] flex items-center justify-center">
                <Clock className="w-5 h-5" />
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-[#EFECE6] flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400 block mb-1">
                  Missions en cours
                </span>
                <span className="text-2xl font-bold text-neutral-900">2</span>
              </div>
              <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5" />
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-[#EFECE6] flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400 block mb-1">
                  Total engagé
                </span>
                <span className="text-2xl font-bold text-neutral-900">3 200 €</span>
              </div>
              <div className="w-11 h-11 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                <TrendingUp className="w-5 h-5" />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default DashboardOverview;

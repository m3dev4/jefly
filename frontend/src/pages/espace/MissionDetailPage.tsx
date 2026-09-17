import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  Clock3,
  MapPin,
  Send,
  WalletCards,
  PartyPopper,
  Loader2,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { getMission, getMissionServices } from "../../api/missionsApi";
import { checkUserHasApplied, createProposition } from "../../api/propositionsApi";
import { Modal } from "../../components/modal";

const formatBudget = (value: number) =>
  `${new Intl.NumberFormat("fr-FR").format(value)} FCFA`;
const formatDate = (value: string | null) =>
  value
    ? new Intl.DateTimeFormat("fr-FR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }).format(new Date(`${value}T00:00:00`))
    : "Date flexible";

const DetailSkeleton = () => (
  <div className="animate-pulse space-y-4">
    <div className="h-5 w-24 rounded bg-[#eeeae4]" />
    <div className="h-8 w-3/4 rounded bg-[#eeeae4]" />
    <div className="h-24 rounded bg-[#f3f0eb]" />
    <div className="h-48 rounded-lg bg-[#f3f0eb]" />
  </div>
);

// ── Apply Modal ────────────────────────────────────────────────────────────
interface ApplyFormProps {
  missionId: number;
  deadlineDate?: string | null;
  onSuccess?: () => void;
}

function ApplyForm({ missionId, deadlineDate, onSuccess }: ApplyFormProps) {
  const queryClient = useQueryClient();
  const [lettre, setLettre] = useState("");
  const [dateLivraison, setDateLivraison] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [fieldError, setFieldError] = useState<string | null>(null);

  const mutation = useMutation({
    mutationFn: createProposition,
    onSuccess: () => {
      setSubmitted(true);
      queryClient.invalidateQueries({ queryKey: ["has-applied", missionId] });
      onSuccess?.();
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFieldError(null);

    if (deadlineDate && dateLivraison > deadlineDate) {
      setFieldError(`La date de livraison ne peut pas dépasser le ${formatDate(deadlineDate)}.`);
      return;
    }
    if (lettre.trim().length < 50) {
      setFieldError("La lettre de motivation doit contenir au moins 50 caractères.");
      return;
    }

    mutation.mutate({ mission: missionId, lettre_motivation: lettre, date_livraison: dateLivraison });
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center gap-4 py-6 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#eaf7ef]">
          <PartyPopper className="h-7 w-7 text-[#29935a]" />
        </div>
        <h3 className="font-heading text-base font-semibold text-[#20252a]">
          Candidature envoyée !
        </h3>
        <p className="max-w-xs text-[11px] leading-relaxed text-neutral-500">
          Votre proposition a bien été transmise à l'annonceur. Vous serez notifié dès qu'il aura donné suite.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5 px-1 pb-2">
      {/* Error banner */}
      {(fieldError || mutation.isError) && (
        <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-[11px] text-red-700">
          {fieldError ||
            (mutation.error instanceof Error
              ? mutation.error.message
              : "Une erreur est survenue. Veuillez réessayer.")}
        </div>
      )}

      {/* Lettre de motivation */}
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="lettre"
          className="text-[10px] font-semibold uppercase tracking-[0.12em] text-neutral-500"
        >
          Lettre de motivation
        </label>
        <textarea
          id="lettre"
          required
          minLength={50}
          rows={5}
          placeholder="Présentez votre expérience, pourquoi cette mission vous correspond, et comment vous comptez la réaliser…"
          value={lettre}
          onChange={(e) => setLettre(e.target.value)}
          className="w-full resize-none rounded-md border border-[#e0dbd2] bg-[#faf9f7] px-3 py-2.5 text-[12px] leading-relaxed text-neutral-800 placeholder:text-neutral-400 focus:border-[#1b4b6b] focus:outline-none focus:ring-2 focus:ring-[#1b4b6b]/10"
        />
        <span className={`self-end text-[10px] ${lettre.length < 50 ? "text-neutral-400" : "text-[#29935a]"}`}>
          {lettre.length} / 50 min
        </span>
      </div>

      {/* Date de livraison */}
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="date_livraison"
          className="text-[10px] font-semibold uppercase tracking-[0.12em] text-neutral-500"
        >
          Date de livraison proposée
        </label>
        <input
          id="date_livraison"
          type="date"
          required
          min={new Date().toISOString().split("T")[0]}
          max={deadlineDate ?? undefined}
          value={dateLivraison}
          onChange={(e) => setDateLivraison(e.target.value)}
          className="w-full rounded-md border border-[#e0dbd2] bg-[#faf9f7] px-3 py-2.5 text-[12px] text-neutral-800 focus:border-[#1b4b6b] focus:outline-none focus:ring-2 focus:ring-[#1b4b6b]/10"
        />
        {deadlineDate && (
          <span className="text-[10px] text-neutral-400">
            Date limite de la mission : {formatDate(deadlineDate)}
          </span>
        )}
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={mutation.isPending}
        className="mt-1 inline-flex items-center justify-center gap-2 rounded-md bg-[#1b4b6b] px-5 py-2.5 text-[12px] font-semibold text-white transition-colors hover:bg-[#143b55] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {mutation.isPending ? (
          <><Loader2 className="h-3.5 w-3.5 animate-spin" /> Envoi en cours…</>
        ) : (
          <><Send className="h-3.5 w-3.5" /> Envoyer ma candidature</>
        )}
      </button>
    </form>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────
const MissionDetailPage: React.FC = () => {
  const [applyOpen, setApplyOpen] = useState(false);
  const navigate = useNavigate();
  const { missionId } = useParams();
  const missionQuery = useQuery({
    queryKey: ["mission", missionId],
    queryFn: () => getMission(Number(missionId)),
    enabled: Boolean(missionId),
  });
  const servicesQuery = useQuery({
    queryKey: ["mission-services"],
    queryFn: getMissionServices,
  });
  const hasAppliedQuery = useQuery({
    queryKey: ["has-applied", missionId],
    queryFn: () => checkUserHasApplied(Number(missionId)),
    enabled: Boolean(missionId),
  });
  const hasApplied = hasAppliedQuery.data ?? false;
  const mission = missionQuery.data;
  const serviceName =
    servicesQuery.data?.find((service) => service.id === mission?.service)
      ?.name || "Service requis";

  return (
    <div className="mx-auto max-w-250 pb-8">
      <button
        type="button"
        onClick={() => navigate("/espace/missions")}
        className="mb-4 inline-flex items-center gap-2 text-[11px] font-medium text-neutral-500 hover:text-[#1b4b6b]"
      >
        <ArrowLeft className="h-3.5 w-3.5" /> Retour aux missions
      </button>
      {missionQuery.isLoading && <DetailSkeleton />}
      {missionQuery.isError && (
        <div className="rounded-lg border border-red-100 bg-red-50 p-8 text-center text-[11px] text-red-600">
          Cette mission est introuvable ou n'est plus disponible.
        </div>
      )}
      {mission && (
        <>
          <div className="mb-4 rounded-lg border border-[#ebe8e2] bg-white p-5 shadow-[0_6px_24px_rgba(31,42,48,0.04)] sm:p-7">
            <div className="mb-4 flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-[#eaf7ef] px-2.5 py-1 text-[9px] font-semibold uppercase text-[#29935a]">
                Mission disponible
              </span>
              <span className="text-[10px] text-neutral-400">
                Publié récemment
              </span>
            </div>
            <h1 className="max-w-3xl font-heading text-2xl font-semibold leading-tight tracking-tight text-[#20252a] sm:text-3xl">
              {mission.title}
            </h1>
            <div className="mt-5 grid gap-4 border-t border-[#f0ede8] pt-4 sm:grid-cols-3">
              <div className="flex items-center gap-2.5">
                <WalletCards className="h-4 w-4 text-secondary-jefly" />
                <div>
                  <p className="text-[9px] uppercase tracking-wide text-neutral-400">
                    Budget estimé
                  </p>
                  <p className="text-[12px] font-semibold text-neutral-800">
                    {formatBudget(mission.budget)}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <CalendarDays className="h-4 w-4 text-secondary-jefly" />
                <div>
                  <p className="text-[9px] uppercase tracking-wide text-neutral-400">
                    Date limite
                  </p>
                  <p className="text-[12px] font-semibold text-neutral-800">
                    {formatDate(mission.date_deadline)}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock3 className="h-4 w-4 text-secondary-jefly" />
                <div>
                  <p className="text-[9px] uppercase tracking-wide text-neutral-400">
                    Paiement
                  </p>
                  <p className="text-[12px] font-semibold text-neutral-800">
                    {mission.operateurMobileMoney}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="grid gap-4 lg:grid-cols-[1fr_280px]">
            <section className="rounded-lg border border-[#ebe8e2] bg-white p-5 sm:p-7">
              <h2 className="mb-3 font-heading text-sm font-semibold text-[#20252a]">
                Description de la mission
              </h2>
              <p className="whitespace-pre-line text-[12px] leading-7 text-neutral-600">
                {mission.description}
              </p>
              <div className="mt-7 border-t border-[#f0ede8] pt-5">
                <h2 className="mb-3 font-heading text-sm font-semibold text-[#20252a]">
                  Service recherché
                </h2>
                <span className="inline-flex items-center gap-2 rounded-full bg-[#f7f5f1] px-3 py-2 text-[10px] font-medium text-neutral-600">
                  <CheckCircle2 className="h-3.5 w-3.5 text-primary-jefly" />{" "}
                  {serviceName}
                </span>
              </div>
            </section>
            <aside className="h-fit rounded-lg border border-[#ebe8e2] bg-white p-5">
              <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-neutral-400">
                Votre candidature
              </p>
              <p className="mb-5 text-[11px] leading-relaxed text-neutral-500">
                Cette mission correspond à votre profil ? Envoyez votre
                proposition à l'annonceur.
              </p>
               <Modal
                title="Postuler à la mission"
                open={applyOpen}
                setOpen={setApplyOpen}
                trigger={
                  <button
                    type="button"
                    disabled={hasApplied}
                    onClick={() => !hasApplied && setApplyOpen(true)}
                    className="mb-2 inline-flex w-full items-center justify-center gap-2 rounded-md bg-[#1b4b6b] px-4 py-2.5 text-[11px] font-semibold text-white transition-colors hover:bg-[#143b55] disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {hasApplied ? (
                      <><CheckCircle2 className="h-3.5 w-3.5" /> Déjà postulé</>
                    ) : (
                      <><Send className="h-3.5 w-3.5" /> Postuler à la mission</>
                    )}
                  </button>
                }
              >
                <ApplyForm
                  missionId={Number(missionId)}
                  deadlineDate={mission.date_deadline}
                  onSuccess={() => setApplyOpen(false)}
                />
              </Modal>
              {hasApplied && (
                <p className="mb-2 flex items-center justify-center gap-1.5 text-[10px] font-medium text-[#29935a]">
                  <CheckCircle2 className="h-3 w-3" /> Votre candidature est en cours d'examen
                </p>
              )}
              <button
                type="button"
                onClick={() => navigate("/espace/missions")}
                className="w-full rounded-md border border-[#e7e3dc] px-4 py-2.5 text-[11px] font-medium text-neutral-600 hover:border-[#1b4b6b]"
              >
                Retour à la recherche
              </button>
              <div className="mt-5 border-t border-[#f0ede8] pt-4 text-[10px] text-neutral-400">
                <p className="mb-2 flex items-center gap-2">
                  <MapPin className="h-3 w-3" /> Travail à distance
                </p>
                <p>Annonce publiée par un annonceur vérifié.</p>
              </div>
            </aside>
          </div>
        </>
      )}
    </div>
  );
};

export default MissionDetailPage;

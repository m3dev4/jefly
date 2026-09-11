import { Hug, IdUser, Power } from "../assets/icons";

export default function HowItWorks() {
  return (
    <section className="relative w-full overflow-hidden bg-neutral-100 px-6 py-24 sm:px-10 sm:py-32 lg:px-24 lg:py-40">
      {/* Cercles décoratifs d'arrière-plan */}
      <div className="pointer-events-none absolute -left-24 -top-24 h-[300px] w-[300px] rounded-full bg-orange-400 opacity-5 sm:h-[450px] sm:w-[450px] lg:h-[600px] lg:w-[600px]" />
      <div className="pointer-events-none absolute -right-24 top-1/2 h-[350px] w-[350px] rounded-full bg-orange-400 opacity-5 sm:h-[550px] sm:w-[550px] lg:h-[814px] lg:w-[800px]" />
      <div className="pointer-events-none absolute left-0 top-[420px] hidden h-px w-full bg-gradient-to-r from-orange-400/0 via-orange-400/20 to-orange-400/0 lg:block" />

      <div className="relative mx-auto flex max-w-7xl flex-col items-start gap-16 lg:gap-28">
        {/* En-tête de section */}
        <div className="flex w-full max-w-3xl flex-col items-start gap-6 sm:gap-8">
          <div className="flex items-center gap-4">
            <span className="h-px w-12 flex-none bg-orange-400" />
            <span className="font-sans text-xs font-bold uppercase leading-5 tracking-[2px] text-orange-400 sm:text-sm sm:tracking-[2.8px]">
              +200 missions déjà réalisées
            </span>
          </div>

          <h2 className="font-heading text-4xl font-extrabold leading-tight text-neutral-800 sm:text-6xl lg:text-8xl lg:leading-[1.05]">
            Comment <span className="text-orange-400">ça marche</span>
          </h2>

          <p className="font-sans max-w-2xl text-base font-normal leading-relaxed text-neutral-800/80 sm:text-xl sm:leading-9">
            Passez de l&apos;informel des groupes WhatsApp à une plateforme
            structurée où vos compétences réelles vous connectent aux meilleures
            opportunités.
          </p>
        </div>

        {/* Grille des 3 cartes - spacieuses et parfaitement alignées */}
        <div className="grid w-full grid-cols-1 gap-8 md:grid-cols-3 md:gap-8 lg:gap-10 items-stretch">
          {/* ───────── Étape 01 : Créez votre profil ───────── */}
          <div className="flex flex-col items-start gap-6 sm:gap-8 h-full">
            <div className="flex w-full items-end justify-between px-1 sm:px-2">
              <span className="font-heading text-6xl font-extrabold leading-none tracking-tight text-neutral-800/40 sm:text-7xl lg:text-8xl">
                01
              </span>
              <div className="flex items-center justify-center rounded-2xl bg-neutral-800 p-3.5 outline outline-1 -outline-offset-1 outline-white/10 sm:p-4">
                <img src={IdUser} alt="user icon" />
              </div>
            </div>

            <div className="flex w-full flex-1 flex-col justify-between rounded-[2.5rem] bg-[#1E1E24] p-8 sm:p-9 lg:p-10 border border-white/5 shadow-md">
              {/* En-tête de la carte */}
              <div className="flex flex-col items-start space-y-4">
                <h3 className="font-heading text-xl font-bold leading-snug text-neutral-100 sm:text-2xl">
                  Créez votre profil
                </h3>
                <p className="font-sans text-sm font-normal leading-relaxed text-neutral-100/75 sm:text-[15px]">
                  Mettez en avant vos compétences techniques, vos expériences
                  passées et vos tarifs pour maximiser votre visibilité.
                </p>
              </div>

              {/* Widget intérieur spacieux */}
              <div className="w-full my-6 sm:my-8 rounded-2xl bg-[#141418] p-5 sm:p-6 border border-white/5 space-y-5">
                <div className="flex w-full items-center gap-4">
                  <img
                    className="h-14 w-14 flex-none rounded-2xl object-cover shadow-sm"
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=160&auto=format&fit=crop&q=80"
                    alt="Alexia Martin"
                  />
                  <div className="flex flex-col">
                    <span className="font-heading text-lg font-bold text-neutral-100">
                      Alexia Martin
                    </span>
                    <span className="font-sans text-sm font-medium text-[#F2994A]">
                      UI Designer
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap items-start gap-2 pt-1">
                  {["Figma", "React", "Framer"].map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-white/5 px-3 py-1 font-sans text-xs font-medium text-neutral-200 border border-white/10"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex w-full items-center justify-between border-t border-white/5 pt-3.5">
                  <div className="flex items-center gap-1.5">
                    <svg
                      className="w-3.5 h-3.5 fill-[#F2994A]"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="font-sans text-sm font-bold text-neutral-100">
                      5.0
                    </span>
                  </div>
                  <span className="font-sans text-xs text-gray-400">
                    24 Projets
                  </span>
                </div>
              </div>

              {/* Ligne de séparation et note basse */}
              <div className="w-full pt-6 border-t border-white/10 flex items-center gap-3">
                <span className="h-2 w-2 flex-none rounded-full bg-[#F2994A]" />
                <span className="font-sans text-sm font-medium text-neutral-100/80">
                  Optimisation IA disponible
                </span>
              </div>
            </div>
          </div>

          {/* ───────── Étape 02 : Matchez avec des missions ───────── */}
          <div className="flex flex-col items-start gap-6 sm:gap-8 h-full">
            <div className="flex w-full items-end justify-between px-1 sm:px-2">
              <span className="font-heading text-6xl font-black leading-none tracking-wide text-neutral-800/40 sm:text-7xl lg:text-8xl">
                02
              </span>
              <div className="flex items-center justify-center rounded-2xl bg-orange-400 p-3.5 sm:p-4 shadow-sm">
                <img src={Power} alt="power icon" />
              </div>
            </div>

            <div className="flex w-full flex-1 flex-col justify-between rounded-[2.5rem] bg-[#FAF3EA] p-8 sm:p-9 lg:p-10 border border-[#F2994A]/25 shadow-md">
              {/* En-tête de la carte */}
              <div className="flex flex-col items-start space-y-4">
                <h3 className="font-heading text-xl font-bold leading-snug text-neutral-800 sm:text-2xl">
                  Matchez avec des missions
                </h3>
                <p className="font-sans text-sm font-normal leading-relaxed text-neutral-800/80 sm:text-[15px]">
                  Notre algorithme analyse vos points forts pour vous proposer
                  des missions qui correspondent réellement à votre expertise.
                </p>
              </div>

              {/* Widget intérieur spacieux */}
              <div className="w-full my-6 sm:my-8 space-y-4">
                <div className="flex w-full items-center justify-between px-1">
                  <span className="font-sans text-xs font-bold uppercase tracking-wider text-[#D97724]">
                    Analyse en cours...
                  </span>
                  <div className="flex items-baseline gap-1.5">
                    <span className="font-heading text-2xl font-black text-neutral-800">
                      98%
                    </span>
                    <span className="font-sans text-xs text-neutral-500">
                      Match
                    </span>
                  </div>
                </div>

                <div className="flex w-full flex-col items-start gap-3.5 rounded-2xl bg-white/75 p-5 sm:p-6 border border-[#D97724]/15 shadow-sm">
                  <div className="flex w-full items-center justify-between gap-2">
                    <span className="rounded-md bg-[#FDEBDC] px-2.5 py-1 font-sans text-[10px] font-bold uppercase text-[#D47124]">
                      Premium Mission
                    </span>
                    <span className="font-sans text-base font-bold text-[#D47124]">
                      4.5k€
                    </span>
                  </div>

                  <h4 className="font-heading text-lg font-bold leading-snug text-neutral-800 sm:text-xl">
                    Refonte SaaS pour une FinTech IA
                  </h4>

                  <p className="font-sans text-xs leading-relaxed text-neutral-600">
                    Besoin d&apos;un expert UI capable de gérer des dashboards
                    complexes avec une approche…
                  </p>

                  <div className="flex items-center gap-2 pt-2">
                    <svg
                      className="w-3.5 h-3.5 fill-[#D47124]"
                      viewBox="0 0 24 24"
                    >
                      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                    </svg>
                    <span className="font-sans text-xs font-medium text-neutral-800">
                      Recommandé par Jëfly AI
                    </span>
                  </div>
                </div>
              </div>

              {/* Ligne de séparation et note basse */}
              <div className="w-full pt-6 border-t border-neutral-300/80 flex items-center gap-3">
                <span className="h-2 w-2 flex-none rounded-full bg-[#D47124]" />
                <span className="font-sans text-sm font-medium text-neutral-800">
                  Matching temps réel
                </span>
              </div>
            </div>
          </div>

          {/* ───────── Étape 03 : Collaborez et réussissez ───────── */}
          <div className="flex flex-col items-start gap-6 sm:gap-8 h-full">
            <div className="flex w-full items-end justify-between px-1 sm:px-2">
              <span className="font-heading text-6xl font-black leading-none tracking-wide text-neutral-800/40 sm:text-7xl lg:text-8xl">
                03
              </span>
              <div className="flex items-center justify-center rounded-2xl bg-neutral-800 p-3.5 outline outline-1 -outline-offset-1 outline-white/10 sm:p-4">
                <img src={Hug} alt="handshake icon" />
              </div>
            </div>

            <div className="flex w-full flex-1 flex-col justify-between rounded-[2.5rem] bg-[#1E1E24] p-8 sm:p-9 lg:p-10 border border-white/5 shadow-md">
              {/* En-tête de la carte */}
              <div className="flex flex-col items-start space-y-4">
                <h3 className="font-heading text-xl font-bold leading-snug text-neutral-100 sm:text-2xl">
                  Collaborez et réussissez
                </h3>
                <p className="font-sans text-sm font-normal leading-relaxed text-neutral-100/75 sm:text-[15px]">
                  Gérez vos projets en toute sécurité via notre plateforme avec des
                  outils de suivi intégrés et un paiement garanti.
                </p>
              </div>

              {/* Widget intérieur spacieux */}
              <div className="w-full my-6 sm:my-8 rounded-2xl bg-[#141418] p-5 sm:p-6 border border-white/5 space-y-5">
                <div className="flex w-full flex-col space-y-2">
                  <div className="flex w-full items-center justify-between">
                    <span className="font-sans text-[11px] font-bold uppercase tracking-wider text-gray-400">
                      Progrès Mission
                    </span>
                    <span className="font-sans text-[11px] font-bold text-[#F2994A]">
                      85%
                    </span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-white/10 overflow-hidden">
                    <div className="h-full w-[85%] rounded-full bg-[#F2994A]" />
                  </div>
                </div>

                <div className="flex w-full flex-col space-y-3.5 pt-1">
                  <div className="flex w-full items-start gap-3">
                    <img
                      className="h-8 w-8 flex-none rounded-full object-cover"
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=128&auto=format&fit=crop&q=80"
                      alt="Candidat"
                    />
                    <div className="max-w-[85%] rounded-2xl rounded-tl-sm bg-[#222228] px-4 py-2.5">
                      <span className="font-sans text-xs leading-relaxed text-neutral-100">
                        Les maquettes sont validées. On lance le dev ?
                      </span>
                    </div>
                  </div>

                  <div className="flex w-full justify-end pl-6 sm:pl-8">
                    <div className="max-w-[85%] rounded-2xl rounded-tr-sm bg-[#2B1B12] border border-[#F2994A]/30 px-4 py-2.5">
                      <span className="font-sans text-xs leading-relaxed text-[#F2994A]">
                        C&apos;est parfait ! Le jalon 3 est débloqué.
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Ligne de séparation et note basse */}
              <div className="w-full pt-6 border-t border-white/10 flex items-center gap-3">
                <span className="h-2 w-2 flex-none rounded-full bg-[#F2994A]" />
                <span className="font-sans text-sm font-medium text-neutral-100/80">
                  Paiements sécurisés par Stripe
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

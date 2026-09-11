import React from 'react';

const Cta = () => {
  return (
    <div className="flex w-full flex-col items-center bg-[#1E1E1E] px-6 py-16 sm:px-10 sm:py-20 lg:px-24 lg:py-24">
      <div className="relative flex w-full max-w-7xl flex-col items-center gap-8 overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-stone-950 via-neutral-800 to-orange-400/5 p-8 outline outline-1 -outline-offset-1 outline-white/5 sm:p-12 lg:p-20">
        <div className="pointer-events-none absolute -right-20 top-10 h-64 w-64 rounded-full bg-orange-400 opacity-5 sm:h-80 sm:w-80 lg:h-96 lg:w-96" />

        <div className="relative flex w-full max-w-3xl flex-col items-center">
          <h2 className="font-heading text-center text-3xl font-black leading-tight text-white sm:text-5xl sm:leading-[60px] lg:text-6xl lg:leading-[70px]">
            Votre prochain match
            <br />
            commence ici.
          </h2>
        </div>

        <div className="relative flex w-full max-w-2xl flex-col items-center">
          <p className="font-sans text-center text-base font-normal leading-relaxed text-gray-400 sm:text-xl sm:leading-8">
            Que vous soyez un talent en quête de liberté ou une entreprise à la
            recherche d&apos;excellence, Jëfly est votre nouveau point de
            rencontre.
          </p>
        </div>

        <div className="relative flex w-full flex-col items-center gap-4 pt-4 sm:w-auto sm:flex-row sm:gap-6">
          <button className="w-full rounded-2xl bg-orange-400 px-8 py-4 font-sans text-base font-black leading-6 text-stone-950 transition hover:opacity-90 sm:w-auto sm:px-12 sm:py-5 sm:text-lg">
            Créer un compte
          </button>
          <button className="w-full rounded-2xl px-8 py-4 font-sans text-base font-bold leading-6 text-white outline outline-2 -outline-offset-2 outline-white/10 transition hover:bg-white/5 sm:w-auto sm:px-12 sm:py-5 sm:text-lg">
            Comment ça marche
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cta;

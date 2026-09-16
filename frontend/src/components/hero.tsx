import React from "react";
import { Button } from "./ui/button";
import { HeroJefly } from "../assets/images";

const Hero = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="w-full text-center -mt-17">
        <h1 className="uppercase font-heading text-[213.74px] text-text-jefly font-extrabold text-clip tracking-tight">
          Matcher
        </h1>
      </div>
      <div className="flex items-center justify-between w-full relative">
        <div className="flex flex-col space-y-3 max-w-2xl px-10">
          <h2 className="font-heading text-[28px] font-bold w-xl text-text-jefly leading-snug">
            Le bon profil, la bonne mission, sans perdre de temps.
          </h2>
          <p className="font-sans text-sm font-normal text-text-jefly/80 w-sm leading-relaxed">
            Jëfly connecte freelances et clients grâce à un matching intelligent
            qui analyse compétences et besoins réels - fini les groupes WhatsApp
            et les dizaines de candidatures à trier à la main.
          </p>
          <button
            type="button"
            className="bg-[#f2994a] hover:bg-[#e0893a] max-w-xs py-3 px-5 rounded-lg transition-colors cursor-pointer text-white shadow-xs"
          >
            <span className="font-sans font-medium text-sm">
              Matcher • Connecter • Reussir
            </span>
          </button>
        </div>
        <div className="absolute right-0">
          <div>
            <img
              src={HeroJefly}
              alt="hero landing page jefly"
              className="ml-65 mt-30 object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;

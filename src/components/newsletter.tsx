import React from "react";
import { Button } from "./ui/button";

export default function Newsletter() {
  return (
    <section className="bg-slate-900 py-12 text-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center gap-2 text-center md:flex-row md:justify-between md:text-left">
          <h2 className="mb-4 text-2xl font-bold md:mb-0 md:w-1/2 md:max-w-[450px]">
            FIQUE POR DENTRO DE NOSSAS OFERTAS EXCLUSIVAS DE VINHOS!
          </h2>
          <form className="flex w-full flex-col gap-3 md:w-1/2">
            <input
              type="email"
              placeholder="Digite seu e-mail"
              className="flex-grow rounded px-4 py-2 text-center text-gray-900"
            />
            <Button type="submit" variant={"primary"} size={"lg"}>
              Quero receber ofertas!
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}

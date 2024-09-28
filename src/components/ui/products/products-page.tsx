"use client";

import { useState } from "react";
import { Slider } from "~/components/ui/slider";
import { Checkbox } from "~/components/ui/checkbox";
import { Button } from "~/components/ui/button";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";
import CardHomePage from "~/components/card-wine";
import { vinhos } from "data/vinhos";

export default function WineShop() {
  const [priceRange, setPriceRange] = useState([0, 100]);

  const filterCategories = [
    { name: "Categoria", options: ["Singular", "Kit"] },
    {
      name: "Tipos",
      options: [
        "Vinho tinto",
        "Vinho rose",
        "Vinho branco",
        "Espumante fresco",
        "Espumante rose",
      ],
    },
    {
      name: "Países",
      options: ["Espanha", "Chile", "Argentina", "Brasil", "Portugal"],
    },
    {
      name: "Uvas",
      options: [
        "Tempranillo",
        "Grenache",
        "Merlot",
        "Sauvignon Blanc",
        "Verdejo",
      ],
    },
    {
      name: "Harmonização",
      options: [
        "Carnes vermelhas",
        "Carnes vermelhas",
        "Frutos do mar",
        "Queijos",
        "Saladas ou aperitivos",
      ],
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col gap-8 lg:flex-row">
        {/* Sidebar */}
        <div className="w-full lg:w-1/4">
          <h2 className="mb-4 text-lg font-semibold">Filtros</h2>
          <Accordion type="multiple" className="w-full">
            {filterCategories.map((category, index) => (
              <AccordionItem value={`item-${index}`} key={index}>
                <AccordionTrigger>{category.name}</AccordionTrigger>
                <AccordionContent>
                  {category.options.map((option, optionIndex) => (
                    <div
                      className="mb-1 flex items-center space-x-2"
                      key={optionIndex}
                    >
                      <Checkbox id={`${category.name}-${optionIndex}`} />
                      <label
                        htmlFor={`${category.name}-${optionIndex}`}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {option}
                      </label>
                    </div>
                  ))}
                </AccordionContent>
              </AccordionItem>
            ))}
            <AccordionItem value="price">
              <AccordionTrigger>Preço</AccordionTrigger>
              <AccordionContent>
                <Slider
                  value={priceRange}
                  onValueChange={setPriceRange}
                  min={0}
                  max={100}
                  step={1}
                  className="mt-2"
                />
                <div className="mt-2 flex justify-between">
                  <span>R${priceRange[0]}</span>
                  <span>R${priceRange[1]}</span>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        {/* Main content */}
        <div className="w-full lg:w-3/4">
          <div className="mb-4 flex flex-col items-center justify-between sm:flex-row">
            <span className="mb-2 text-sm text-gray-600 sm:mb-0">
              Mostrando 1-12 de 100 Produtos
            </span>
            <select className="rounded border p-2 text-sm">
              <option>Ordenado por: Mais Popular</option>
              <option>Preço: Menor para Maior</option>
              <option>Preço: Maior para Menor</option>
              <option>Avaliações</option>
            </select>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[...Array(4)].map((_, i) =>
              vinhos
                .filter((_, index) => index < 3)
                .map((vinho) => (
                  <CardHomePage
                    key={`${vinho.name}-${i}`}
                    name={vinho.name}
                    stars={vinho.stars} // Coloque a avaliação que desejar
                    price={vinho.preco}
                    discount={vinho.desconto}
                    imgUrl={vinho.img}
                    id={vinho.id}
                  />
                )),
            )}
          </div>

          {/* Pagination */}
          <div className="mt-10 flex justify-center">
            <Button variant="outline" className="mx-1">
              Anterior
            </Button>
            {[1, 2, 3, "...", 10].map((page, index) => (
              <Button
                key={index}
                variant={page === 1 ? "default" : "outline"}
                className="mx-1 w-8"
              >
                {page}
              </Button>
            ))}
            <Button variant="outline" className="mx-1">
              Próxima
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

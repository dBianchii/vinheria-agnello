/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
"use client";
import autoAnimate from "@formkit/auto-animate";

import { useQueryState } from "nuqs";
import { Suspense, useEffect, useRef, useState } from "react";
import { FiFilter, FiMessageCircle } from "react-icons/fi";
import { Button } from "~/components/ui/button";
import { Checkbox } from "~/components/ui/checkbox";
import Modal from "~/components/ui/modal";
// import { Slider } from "~/components/ui/slider";

import CardWine from "~/components/card-wine";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";
import { type getWines } from "~/server/db/select";
import { sendPrompt } from "./actions";
import {
  paisesOptions,
  searchParamsToParsersMap,
  tipoOptions,
  uvaOptions,
} from "./nuqs-parsers";
import { handleCheckboxChange } from "./ugly-handleCheckboxChange";
import { cn } from "~/lib/utils";

export default function ProductsPage({
  wines,
}: {
  wines: Awaited<ReturnType<typeof getWines>>;
}) {
  const [showFilters, setShowFilters] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [sortOption, setSortOption] = useState<
    "melhor_avaliacao" | "menor_preco" | "maior_preco" | "maior_desconto"
  >("melhor_avaliacao");
  const [itemsPerPage, setItemsPerPage] = useState(4);
  const [currentPage, setCurrentPage] = useState(1); // New state for current page

  const parent = useRef(null);
  useEffect(() => {
    if (parent.current) autoAnimate(parent.current);
  }, [parent]);

  const handleSend = async () => {
    const response = await sendPrompt(question);
    if (!response) return;
    setAnswer(response);
  };

  const sortedWines = [...wines].sort((a, b) => {
    switch (sortOption) {
      case "melhor_avaliacao":
        return b.stars - a.stars;
      case "menor_preco":
        return a.preco - b.preco;
      case "maior_preco":
        return b.preco - a.preco;
      case "maior_desconto":
        return b.desconto - a.desconto;
      default:
        return 0;
    }
  });

  const triggerFilter = (
    filter:
      | "melhor_avaliacao"
      | "menor_preco"
      | "maior_preco"
      | "maior_desconto",
  ) => {
    setSortOption(filter);
    setCurrentPage(1);
  };

  const triggerItemsPerPage = (items: number) => {
    setItemsPerPage(items);
  };

  const totalPages = Math.ceil(sortedWines.length / itemsPerPage);
  const paginatedWines = sortedWines.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col gap-8 lg:flex-row">
        {/* Filtros para telas menores */}
        <div className="z-0 mb-4 lg:hidden" ref={parent}>
          <Button
            variant={showFilters ? "secondary" : "outline"}
            className="flex items-center space-x-2 font-semibold"
            onClick={() => setShowFilters(!showFilters)}
          >
            <FiFilter /> {/* Ícone de filtro */}
            <span>Filtros</span>
          </Button>
          {showFilters && (
            <div className="mt-4">
              <FiltersWithSuspense />
            </div>
          )}
        </div>

        {/* Sidebar para telas grandes */}
        <div className="hidden w-1/4 lg:block">
          <h2 className="mb-4 text-lg font-semibold">Filtros</h2>
          <FiltersWithSuspense />
        </div>

        {/* Main content */}
        <div className="w-full lg:w-3/4">
          <div className="mb-4 flex flex-col items-center justify-between sm:flex-row">
            <span className="mb-2 text-sm text-gray-600 sm:mb-0">
              Mostrando 1-12 de 100 Produtos
            </span>
            <div className="flex flex-row-reverse gap-4">
              <div className="flex items-center gap-3">
                <span>Ordenado por:</span>
                <select
                  onChange={(e) =>
                    triggerFilter(
                      e.target.value as
                        | "melhor_avaliacao"
                        | "menor_preco"
                        | "maior_preco"
                        | "maior_desconto",
                    )
                  }
                  className="rounded border p-2 text-sm"
                >
                  <option value={"melhor_avaliacao"}>Melhor Avaliação</option>
                  <option value={"menor_preco"}>Menor Preço</option>
                  <option value={"maior_preco"}>Maior Preço</option>
                  <option value={"maior_desconto"}>Maior desconto</option>
                </select>
              </div>
              <div className="flex items-center gap-3">
                <span>Items por página:</span>
                <select
                  onChange={(e) => triggerItemsPerPage(Number(e.target.value))}
                  className="rounded border p-2 text-sm"
                >
                  <option value={4}>4</option>
                  <option value={8}>8</option>
                  <option value={12}>12</option>
                  <option value={24}>24</option>
                </select>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {paginatedWines.map((vinho) => (
              <CardWine
                key={`${vinho.id}-${vinho.name}`}
                name={vinho.name}
                stars={vinho.stars} // Coloque a avaliação que desejar
                price={vinho.preco}
                discount={vinho.desconto}
                imgUrl={vinho.img}
                id={vinho.id}
                isPriority={true}
              />
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-10 flex justify-center">
            <Button
              variant="outline"
              className="mx-1"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Anterior
            </Button>
            {[...Array(totalPages).keys()].map((page) => (
              <Button
                key={page}
                variant={currentPage === page + 1 ? "default" : "outline"}
                className="mx-1 w-8"
                onClick={() => setCurrentPage(page + 1)}
              >
                {page + 1}
              </Button>
            ))}
            <Button
              variant="outline"
              className="mx-1"
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
            >
              Próxima
            </Button>
          </div>
        </div>
      </div>

      {/* Ícone de Chat */}
      <div className="fixed bottom-4 right-4">
        <button
          className="rounded-full bg-orange-300 p-4 text-white shadow-lg"
          onClick={() => setShowChat(true)}
        >
          <FiMessageCircle size={24} />
        </button>
      </div>

      {/* Modal de Chat - falta conectar com ChatGPT*/}
      {showChat && (
        <Modal onClose={() => setShowChat(false)}>
          <div className="p-4">
            <h2 className="mb-4 text-lg font-semibold">
              Pergunte sobre vinhos
            </h2>
            <input
              type="text"
              placeholder="Faça sua pergunta"
              value={question}
              onChange={(e) => setQuestion(e.target.value)} // Atualiza o estado da pergunta
              className="mb-4 w-full rounded border p-2"
            />
            <Button className="w-full" onClick={handleSend}>
              Enviar
            </Button>
            {answer && <p className="mt-4">{answer}</p>}{" "}
            {/* Exibe a resposta */}
          </div>
        </Modal>
      )}
    </div>
  );
}

function FiltersWithSuspense() {
  return (
    <Suspense>
      <Filters />
    </Suspense>
  );
}

function Filters() {
  // const [priceRange, setPriceRange] = useState([0, Math.floor(maxPrice)]);

  const [categoria, setCategoria] = useQueryState("categoria", {
    ...searchParamsToParsersMap.categoria,
    clearOnDefault: true,
    throttleMs: 500, //Delay between state changes and URL updates.
    shallow: false, //URL state changes will trigger a browser network request.
  });

  const [tipo, setTipo] = useQueryState("tipo", {
    ...searchParamsToParsersMap.tipo,
    clearOnDefault: true,
    throttleMs: 500, //Delay between state changes and URL updates.
    shallow: false, //URL state changes will trigger a browser network request.
  });

  const [pais, setPais] = useQueryState("pais", {
    ...searchParamsToParsersMap.pais,
    clearOnDefault: true,
    throttleMs: 500, //Delay between state changes and URL updates.
    shallow: false, //URL state changes will trigger a browser network request.
  });

  const [uva, setUva] = useQueryState("uva", {
    ...searchParamsToParsersMap.uva,
    clearOnDefault: true,
    throttleMs: 500, //Delay between state changes and URL updates.
    shallow: false, //URL state changes will trigger a browser network request.
  });

  const filterCategories = [
    {
      name: "Categoria",
      state: categoria,
      setter: setCategoria,
      options: [
        {
          name: "Singular",
          value: "singular" as const,
          active: categoria?.includes("singular"),
        },
        {
          name: "Kit",
          value: "kit" as const,
          active: categoria?.includes("kit"),
        },
      ],
    },
    {
      name: "Tipos",
      state: tipo,
      setter: setTipo,
      options: tipoOptions.map((t) => ({
        name: t,
        value: t,
        active: tipo?.includes(t),
      })),
    },
    {
      name: "Países",
      state: pais,
      setter: setPais,
      options: paisesOptions.map((p) => ({
        name: p,
        value: p,
        active: pais?.includes(p),
      })),
    },
    {
      name: "Uvas",
      state: uva,
      setter: setUva,
      options: uvaOptions.map((p) => ({
        name: p,
        value: p,
        active: uva?.includes(p),
      })),
    },
    //?Comentado temporariamente. Descomente para adicionar filtros adicionais integrado com nuqs :)
    // {
    //   name: "Harmonização",
    //   options: [
    //     "Carnes vermelhas",
    //     "Massas ou pizzas",
    //     "Frutos do mar",
    //     "Queijos",
    //     "Saladas ou aperitivos",
    //   ],
    // },
  ];

  // const debouncedSearchableColumnFilters = JSON.parse(
  //   useDebounce(
  //     JSON.stringify({
  //       categoria,
  //     }),
  //     500,
  //   ),
  // );

  const defaultOpenedAccordion = filterCategories
    .filter((category) => category.options.some((option) => option.active))
    .map((c) => `item-${c.name}`); //this shite will make the accordion open the categories that have active options

  return (
    <Accordion
      type="multiple"
      className="w-full"
      defaultValue={defaultOpenedAccordion}
    >
      {filterCategories.map((category) => (
        <AccordionItem
          value={`item-${category.name}`}
          key={`${category.name}accordion`}
        >
          <AccordionTrigger>{category.name}</AccordionTrigger>
          <AccordionContent>
            {category.options.map((option) => (
              <div
                className="mb-1 flex items-center space-x-2"
                key={`${category.name}-${option.value}-checkbox`}
              >
                <Checkbox
                  id={`${category.name}-${option.name}`}
                  onCheckedChange={async (checked) => {
                    if (typeof checked !== "boolean") return;
                    handleCheckboxChange(category, option, checked);
                  }}
                  checked={option.active}
                />
                <label
                  htmlFor={`${category.name}-${option.name}`}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {option.name}
                </label>
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>
      ))}
      {/* <AccordionItem value="price">
        <AccordionTrigger>Preço</AccordionTrigger>
        <AccordionContent>
          <Slider
            value={priceRange}
            onValueChange={setPriceRange}
            min={0.00}
            max={Math.floor(maxPrice)}
            step={2}
            className="mt-2"
          />
          <div className="mt-2 flex justify-between">
            <span>R${priceRange[0]},00</span>
            <span>R${priceRange[1]},00</span>
          </div>
        </AccordionContent>
      </AccordionItem> */}
    </Accordion>
  );
}

import { createSerializer, parseAsArrayOf, parseAsStringLiteral } from "nuqs";
import { createSearchParamsCache } from "nuqs/server";
import { type wines } from "~/server/db/schema";

//Define our parsers.
export const categoryOptions: (typeof wines.$inferSelect.categoria)[] = [
  "singular",
  "kit",
];
export const tipoOptions: (typeof wines.$inferSelect.tipo)[] = [
  "Diversos",
  "Espumante branco",
  "Espumante rose",
  "Vinho branco",
  "Vinho rose",
  "Vinho tinto",
];
export const paisesOptions: (typeof wines.$inferSelect.pais)[] = [
  "Espanha",
  "Chile",
  "Argentina",
  "Brasil",
  "Portugal",
];

export const searchParamsToParsersMap = {
  categoria: parseAsArrayOf(parseAsStringLiteral(categoryOptions)).withDefault(
    [],
  ),
  tipo: parseAsArrayOf(parseAsStringLiteral(tipoOptions)).withDefault([]),
  pais: parseAsArrayOf(parseAsStringLiteral(paisesOptions)).withDefault([]),
};

//Export the searchParamsCache, so we can get server-side typed search params. This is a wrapper around react's 'cache()'
export const searchParamsCache = createSearchParamsCache(
  searchParamsToParsersMap,
);

//Export serialize function to create links with search params
export const serialize = createSerializer(searchParamsToParsersMap);

import { createSerializer, parseAsArrayOf, parseAsStringLiteral } from "nuqs";
import { createSearchParamsCache } from "nuqs/server";

//Define our parsers.
export const categoryOptions = ["singular", "kit"] as const;

export const searchParamsToParsersMap = {
  categoria: parseAsArrayOf(parseAsStringLiteral(categoryOptions)),
};

//Export the searchParamsCache, so we can get server-side typed search params. This is a wrapper around react's 'cache()'
export const searchParamsCache = createSearchParamsCache(
  searchParamsToParsersMap,
);

//Export serialize function to create links with search params
export const serialize = createSerializer(searchParamsToParsersMap);

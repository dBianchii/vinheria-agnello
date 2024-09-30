import { parseAsArrayOf, parseAsStringLiteral } from "nuqs";
import { createSearchParamsCache } from "nuqs/server";

export const categoryOptions = ["singular", "kit"] as const;
export const categoryParser = parseAsArrayOf(
  parseAsStringLiteral(categoryOptions),
);

export const searchParamsCache = createSearchParamsCache({
  categoria: categoryParser,
});

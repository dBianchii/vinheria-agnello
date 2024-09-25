import React from "react";
import { cn } from "~/lib/utils";

export default function DiscountBadge({
  classname,
  discount,
}: {
  classname?: string;
  discount: number;
}) {
  return (
    <p className={cn("select-none rounded-xl bg-red-100 px-3 py-1 font-semibold text-red-500", classname)}>
      -{discount.toFixed(0)}%
    </p>
  );
}

import React from "react";
import { cn } from "~/lib/utils";
import { Badge } from "./ui/badge";

export default function DiscountBadge({
  classname,
  discount,
}: {
  classname?: string;
  discount: number;
}) {
  return (
    <Badge
      variant={"destructive"}
      className={cn("hover:bg-danger rounded-xl", classname)}
    >
      -{Number(discount)}%
    </Badge>
  );
}

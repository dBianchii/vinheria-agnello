import { LucideLoader2, Minus, Plus } from "lucide-react";
import dynamic from "next/dynamic";
import { useCart } from "~/context/cart-context";
import { cn } from "~/lib/utils";
import { Button } from "./ui/button";

const CurrentProductCount = dynamic(
  () => import("./product-page/current-prduct-count"),
  {
    ssr: false,
    loading: () => (
      <LucideLoader2 className="size-5 animate-spin text-muted-foreground"></LucideLoader2>
    ),
  },
);

export function ProductCounter({
  id,
  size = "default",
}: {
  id: number;
  size?: "small" | "default";
}) {
  const { incrementItem, decrementItem } = useCart();

  return (
    <div
      className={cn(
        "flex items-center justify-between rounded-full bg-secondary",
      )}
    >
      <Button
        variant="outline"
        size={"sm"}
        className="m-1 rounded-full shadow-none"
        onClick={() => decrementItem(id)}
      >
        <Minus
          className={cn({
            "size-6": size === "default",
            "size-4": size === "small",
          })}
        />
      </Button>
      <CurrentProductCount id={id} />
      <Button
        size={"sm"}
        className="m-1 rounded-full shadow-none"
        onClick={() => incrementItem(id)}
      >
        <Plus
          className={cn({
            "size-6": size === "default",
            "size-4": size === "small",
          })}
        />
      </Button>
    </div>
  );
}

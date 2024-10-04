import Image from "next/image";

import { Trash } from "lucide-react";
import Link from "next/link";
import DiscountBadge from "~/components/discount-badge";
import { useCart } from "~/context/cart-context";
import { calculatePriceAfterDiscount, formatPrice } from "~/lib/utils";
import { type getWines } from "~/server/db/select";
import { Button } from "../button";
import { ProductCounter } from "~/components/product-counter";

export default function CartCard({
  wine,
  quantity,
}: {
  wine: Awaited<ReturnType<typeof getWines>>[number];
  quantity: number;
}) {
  const { removeItem } = useCart();

  const finalPrice = formatPrice(
    calculatePriceAfterDiscount(wine.preco * quantity, wine.desconto),
  );

  return (
    <div className="flex items-center gap-4 border-b py-4">
      <Link href={`/product/${wine.id}`}>
        <div className="w-24 h-24 overflow-hidden flex items-center justify-center">
          <Image
            src={wine.img}
            alt={wine.name}
            width={80}
            height={80}
            className="h-full w-auto object-contain"
          />
        </div>
      </Link>
      <div className="flex h-24 w-full justify-between">
        <div className="flex flex-col justify-between">
          <h3 className="font-semibold">{wine.name}</h3>
          <div className="flex flex-col items-start sm:flex-row sm:items-center">
            <span className="text-lg font-bold">{finalPrice}</span>
            {wine.desconto > 0 && (
              <div className="flex items-center">
                <span className="text-sm text-gray-500 line-through sm:ml-2">
                  {formatPrice(wine.preco * quantity)}
                </span>
                <DiscountBadge
                  discount={wine.desconto}
                  classname="ml-2 text-xs"
                />
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col items-end justify-between">
          <Button
            variant={"ghost"}
            size={"icon"}
            className="rounded-full hover:bg-red-100"
            onClick={() => removeItem(wine.id)}
          >
            <Trash className="h-4 w-4 text-red-500" />
          </Button>

          <ProductCounter id={wine.id} size="small" />
        </div>
      </div>
    </div>
  );
}

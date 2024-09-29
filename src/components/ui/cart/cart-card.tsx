import Image from "next/image";

import { Trash } from "lucide-react";
import Link from "next/link";
import DiscountBadge from "~/components/discount-badge";
import { ProductCounter } from "~/components/product-counter";
import { useCart } from "~/context/cart-context";
import type { CartItem } from "~/lib/types";
import { calculatePriceAfterDiscount, formatPrice } from "~/lib/utils";
import { Button } from "../button";
import { getWineById } from "~/server/db/select";

export default function CartCard({
  id,
  name,
  imgUrl,
  price,
  discount,
  quantity,
}: CartItem) {
  const { removeItem } = useCart();
  const product = getWineById(id)
  if (!product) return null;

  const finalPrice = formatPrice(
    calculatePriceAfterDiscount(price * quantity, discount),
  );

  return (
    <div className="flex items-center gap-4 border-b py-4">
      <Link href={`/product/${id}`}>
        <div className="rounded-lg border p-1">
          <Image
            src={imgUrl}
            alt={name}
            width={80}
            height={80}
            className="h-24 w-24 object-cover"
          />
        </div>
      </Link>
      <div className="flex h-24 w-full justify-between">
        <div className="flex flex-col justify-between">
          <h3 className="font-semibold">{name}</h3>
          <div className="flex flex-col items-start sm:flex-row sm:items-center">
            <span className="text-lg font-bold">{finalPrice}</span>
            {discount > 0 && (
              <div className="flex items-center">
                <span className="sm:ml-2 text-sm text-gray-500 line-through">
                  {formatPrice(price * quantity)}
                </span>
                <DiscountBadge discount={discount} classname="ml-2 text-xs" />
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col items-end justify-between">
          <Button
            variant={"ghost"}
            size={"icon"}
            className="rounded-full hover:bg-red-100"
            onClick={() => removeItem(id)}
          >
            <Trash className="h-4 w-4 text-red-500" />
          </Button>

          <ProductCounter product={product} size="small" />
        </div>
      </div>
    </div>
  );
}

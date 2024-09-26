import Image from "next/image";
import React from "react";

import { calculatePriceAfterDiscount, formatPrice } from "~/lib/utils";
import { Button } from "../button";
import { Minus, Plus, Trash } from "lucide-react";
import DiscountBadge from "~/components/discount-badge";
import Link from "next/link";
import { useCart } from "~/context/cart-context";
import type { CartItem } from "~/lib/types";


export default function CartCard({
  id,
  name,
  imgUrl,
  price,
  discount,
  quantity,
}: CartItem) {
  const { incrementItem, decrementItem, removeItem } = useCart();

  const finalPrice = formatPrice(
    calculatePriceAfterDiscount(price * quantity, discount),
  );

	console.log("CartCard", id, name, imgUrl, price, discount, quantity);
	console.log("CartCard", finalPrice);

  return (
    <div className="flex items-center gap-4 border-b py-4">
      <Link href={`/product/${id}`}>
        <div className="rounded-lg border p-1">
          <Image
            src={imgUrl}
            alt={name}
            width={80}
            height={80}
            className="h-20 w-20 object-cover"
          />
        </div>
      </Link>
      <div className="flex h-20 w-full justify-between">
        <div className="flex flex-col justify-between">
          <h3 className="font-semibold">{name}</h3>
          <div className="flex items-center">
            <span className="text-lg font-bold">{finalPrice}</span>
            {discount > 0 && (
              <div className="flex items-center">
                <span className="ml-2 text-sm text-gray-500 line-through">
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
          <div className="flex items-center justify-between rounded-full bg-neutral-200">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full bg-neutral-200"
              onClick={() => decrementItem(id)}
            >
              <Minus className="h-4 w-4" />
            </Button>
            <span className="w-[30px] text-center">{quantity}</span>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full bg-neutral-200"
              onClick={() => incrementItem(id)}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

import Image from "next/image";
import React from "react";

import { calculatePriceAfterDiscount, formatPrice } from "~/lib/utils";
import { Button } from "../button";
import { Minus, Plus, Trash } from "lucide-react";
import DiscountBadge from "~/components/discount-badge";

interface CardCartProps {
  id: string;
  name: string;
  imgUrl: string;
  price: number;
  discount: number;
  quantity: number;
  updateQuantity: (id: string, quantity: number) => void;
}

export default function CartCard({
  id,
  name,
  imgUrl,
  price,
  discount,
  quantity,
  updateQuantity,
}: CardCartProps) {
  const finalPrice = formatPrice(
    calculatePriceAfterDiscount(price * quantity, discount),
  );

  return (
    <div className="flex items-center border-b py-4 gap-4">
			<div className="border rounded-lg p-1">

      <Image
        src={imgUrl}
        alt={name}
        width={80}
        height={80}
        className="h-20 w-20 object-cover"
				/>
				</div>
<div className="flex justify-between w-full h-20">

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

      <div className="flex items-center">
        <Button
          variant="outline"
          size="icon"
          onClick={() => updateQuantity(id, quantity - 1)}
        >
          {quantity === 1 ? (
            <Trash className="h-4 w-4" />
          ) : (
            <Minus className="h-4 w-4" />
          )}
        </Button>
        <span className="mx-2">{quantity}</span>
        <Button
          variant="outline"
          size="icon"
          onClick={() => updateQuantity(id, quantity + 1)}
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
			</div>
    </div>
  );
}

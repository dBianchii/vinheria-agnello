import Image from "next/image";
import React from "react";

import { calculatePriceAfterDiscount, formatPrice } from "~/lib/utils";
import { Button } from "../button";
import { Minus, Plus, Trash } from "lucide-react";

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
  const finalPrice = formatPrice(calculatePriceAfterDiscount(price * quantity, discount));

  return (
    <div className="flex items-center border-b py-4">
      <Image
        src={imgUrl}
        alt={name}
        width={80}
        height={80}
        className="mr-4 h-20 w-20 object-cover"
      />
      <div className="flex-grow">
        <h3 className="font-semibold">{name}</h3>
        <div className="mt-2 flex items-center">
          <span className="text-lg font-bold">{finalPrice}</span>
          <span className="ml-2 text-sm text-gray-500 line-through">
            {formatPrice(price * quantity)}
          </span>
          <span className="ml-2 text-sm text-red-500">-{discount}%</span>
        </div>
      </div>
      <div className="flex items-center">
        <Button
          variant="outline"
          size="icon"
          onClick={() => updateQuantity(id, quantity - 1)}
        >
					{
						quantity === 1 ? (<Trash className="h-4 w-4" />) : (<Minus className="h-4 w-4" />)
					}
          
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
  );
}

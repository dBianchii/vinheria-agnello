"use client";

import { useCart } from "~/context/cart-context";

export default function ShoppingCartBadge() {
  const { items } = useCart();

  const total = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    total !== 0 && (
      <p className="absolute bottom-0 right-0 flex min-w-6 translate-x-[50%] translate-y-[50%] transform justify-center rounded-full bg-red-500 px-2 py-1 text-xs text-white transition-colors ease-in-out hover:bg-black">
        {total}
      </p>
    )
  );
}

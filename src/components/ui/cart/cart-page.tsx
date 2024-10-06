"use client";

import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import CartCard from "./cart-card";

import { useCart } from "~/context/cart-context";
import { formatPrice } from "~/lib/utils";
import { type getWines } from "~/server/db/select";
import { CheckoutButton } from "./checkout-button";

export default function CartPageComponent({
  wines,
}: {
  wines: Awaited<ReturnType<typeof getWines>>;
}) {
  const { items } = useCart();

  const priceWithDiscount = items.reduce((sum, item) => {
    const wine = wines.find((wine) => wine.id === item.id);
    if (!wine) return sum;
    return (
      sum + (wine.preco - (wine.desconto * wine.preco) / 100) * item.quantity
    );
  }, 0);

  const priceWithoutDiscount = items.reduce((sum, item) => {
    const wine = wines.find((wine) => wine.id === item.id);
    if (!wine) return sum;

    return sum + wine.preco * item.quantity;
  }, 0);

  const discount = priceWithoutDiscount - priceWithDiscount;
  const discountPercentage = (discount / priceWithoutDiscount) * 100;
  const shippingFee = 15.0;
  const total = priceWithDiscount + shippingFee;

  return (
    <div className="pt-32 container mx-auto px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold">Seu Carrinho</h1>

      <div className="flex flex-col gap-8 lg:flex-row">
        {items.length > 0 ? (
          <>
            <div className="lg:w-2/3">
              <WineCards wines={wines} />
            </div>
            <div className="lg:w-1/3">
              <div className="rounded-lg bg-gray-100 p-6">
                <h2 className="mb-4 text-xl font-semibold">Resumo do pedido</h2>
                <div className="mb-2 flex justify-between">
                  <span>Subtotal</span>
                  <span>{formatPrice(priceWithoutDiscount)}</span>
                </div>
                <div className="mb-2 flex justify-between text-red-500">
                  <span>Desconto ({discountPercentage.toFixed(0)}%)</span>
                  <span>-{formatPrice(discount)}</span>
                </div>
                <div className="mb-2 flex justify-between">
                  <span>Taxa de Entrega</span>
                  <span>{formatPrice(shippingFee)}</span>
                </div>
                <div className="mt-4 flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>{formatPrice(total)}</span>
                </div>
                <div className="mt-6">
                  <Input
                    placeholder="Adicionar código promocional"
                    className="mb-2 bg-white"
                  />
                  <Button variant="default" className="w-full">
                    Aplicar
                  </Button>
                </div>
                <CheckoutButton items={items} wines={wines} />
              </div>
            </div>
          </>
        ) : (
          <div className="flex min-h-screen w-full flex-col items-center justify-center bg-gray-50 px-4">
            <div className="text-center">
              <ShoppingCart className="mx-auto mb-6 h-24 w-24 text-gray-400" />
              <h2 className="mb-2 text-2xl font-semibold text-gray-800">
                Carrinho vazio :(
              </h2>
              <p className="mx-auto mb-8 max-w-sm text-gray-600">
                Aproveite as nossas promoções e adicione aqui os produtos que
                deseja comprar!
              </p>
              <Link href="/">
                <Button variant={"default"} size={"lg"}>
                  Ver produtos
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function WineCards({ wines }: { wines: Awaited<ReturnType<typeof getWines>> }) {
  const { items } = useCart();

  return items.map((item) => (
    <CartCard
      key={item.id}
      quantity={item.quantity}
      wine={wines.find((wine) => wine.id === item.id)!}
    />
  ));
}

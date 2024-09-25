"use client";

import { useState } from "react";
import { ShoppingCart } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import CartCard from "./cart-card";

import { vinhos } from "data/vinhos";
import { formatPrice } from "~/lib/utils";

interface CartItem {
  id: string;
  name: string;
  price: number;
  discount: number;
  image: string;
  quantity: number;
}

export function CartPageComponent() {
  const vinho0 = vinhos[0];
  const vinho1 = vinhos[1];
  const vinho2 = vinhos[2];

  const [cartItems, setCartItems] = useState<CartItem[]>(
    [
      vinho0 && {
        id: vinho0.id,
        name: vinho0.name,
        price: vinho0.preco,
        discount: vinho0.desconto,
        image: vinho0.img,
        quantity: 1,
      },
      vinho1 && {
        id: vinho1.id,
        name: vinho1.name,
        price: vinho1.preco,
        discount: vinho1.desconto,
        image: vinho1.img,
        quantity: 1,
      },
      vinho2 && {
        id: vinho2.id,
        name: vinho2.name,
        price: vinho2.preco,
        discount: vinho2.desconto,
        image: vinho2.img,
        quantity: 1,
      },
    ].filter(Boolean) as CartItem[],
  );

  const priceWithDiscount = cartItems.reduce(
    (sum, item) =>
      sum + (item.price - (item.discount * item.price) / 100) * item.quantity,
    0,
  );

  const priceWithoutDiscount = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const discount = priceWithoutDiscount - priceWithDiscount;

  const discountPercentage = (discount / priceWithoutDiscount) * 100;

  const shippingFee = 15.0;
  const total = priceWithDiscount + shippingFee;

  const updateQuantity = (id: string, newQuantity: number) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, newQuantity) } : item,
      ),
    );
  };

  return (
    <div className="bg-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="mb-6 text-2xl font-bold">Seu Carrinho</h1>
        <div className="flex flex-col gap-8 lg:flex-row">
          <div className="lg:w-2/3 ">
            {cartItems.map((item) => (
              <CartCard
                key={item.id}
                id={item.id}
                name={item.name}
                imgUrl={item.image}
                price={item.price}
                discount={item.discount}
                quantity={item.quantity}
                updateQuantity={updateQuantity}
              />
            ))}
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
                  className="mb-2"
                />
                <Button variant="primary" className="w-full">Aplicar</Button>
              </div>
              <Button className="mt-4 w-full bg-black text-white hover:bg-gray-800">
                Ir para o Pagamento
                <ShoppingCart className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

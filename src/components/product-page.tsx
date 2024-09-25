// app/product/[id]/page.tsx

"use client";

import { useParams } from "next/navigation";
import { vinhos } from "data/vinhos";
import { useEffect, useState } from "react";
import Image from "next/image";
import Stars from "./stars";
import { Button } from "./ui/button";
import { formatPrice } from "~/lib/utils";
import { Minus, Plus } from "lucide-react";

interface IProduto {
  id: string;
  name: string;
  img: string;
  vinicula: string;
  preco: number;
  desconto: number;
  descricao: string;
  categoria: string;
  tipo_de_uva: string;
  tipo: string;
  uva: string;
  pais: string;
  harmonizacao: string;
  stars: number;
}

export function ProductPageComponent() {
  const [quantity, setQuantity] = useState(1);

  const incrementQuantity = () => setQuantity((prev) => prev + 1);
  const decrementQuantity = () =>
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const { id } = useParams(); // Use useParams to get the dynamic segment
  const [product, setProduct] = useState<IProduto>();

  useEffect(() => {
    if (id) {
      const foundProduct = vinhos.find((vinho) => vinho.id === id);
      if (foundProduct) {
        setProduct(foundProduct);
        console.log(foundProduct);
      }
    }
  }, [id]); // Run effect when id changes

  const finalPrice = (price: number, discount: number) => {
    return price - (price * discount) / 100;
  };

  return (
    <div className="flex justify-center overflow-hidden rounded-lg bg-white shadow-md hover:shadow-lg">
      {product && (
        <div className="container flex w-4/5 gap-4 p-4">
          <div className="w-1/2 rounded border">
            <Image
              src={product.img}
              alt={product.name}
              width={300}
              height={300}
              className="w-full"
            />
          </div>
          <div className="flex w-1/2 flex-col justify-between">
            <div>
              <h3 className="mb-4 text-4xl font-bold">{product.name}</h3>
              <Stars stars={product.stars} />
              <div className="mt-4 flex items-center">
                <p className="text-3xl font-bold">
                  {formatPrice(finalPrice(product.preco, product.desconto))}
                </p>
                {product.desconto > 0 && (
                  <>
                    <p className="ml-4 text-3xl font-bold text-gray-400 line-through">
                      {formatPrice(product.preco)}
                    </p>
                    <p className="ml-6 select-none rounded-xl bg-red-100 px-3 py-1 font-semibold text-red-500">
                      -{product.desconto}%
                    </p>
                  </>
                )}
              </div>
              <div className="py-8 text-neutral-500">{product.descricao}</div>
            </div>
            <div>
              <div className="mb-4 flex items-center gap-4">
                <div className="w-1/3 flex justify-center rounded-full bg-neutral-200 py-3 px-4">
                  <button className="hover:opacity-85" onClick={decrementQuantity}>
                    <Minus className="h-6 w-6"  />
                  </button>
                  <span className="mx-6 font-semibold">{quantity}</span>
                  <button className=" hover:opacity-85" onClick={incrementQuantity}>
                    <Plus className="h-6 w-6" />
                  </button>
                </div>
                <Button className="text-md ml-4 w-2/3 rounded-full bg-neutral-950 py-6 text-neutral-50">
                  Adicionar ao carrinho
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductPageComponent;
function setQuantity(arg0: (prev: any) => any) {
  throw new Error("Function not implemented.");
}

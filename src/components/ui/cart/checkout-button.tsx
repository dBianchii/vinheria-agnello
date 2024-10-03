import { type CartItem } from "~/lib/types";
import { Button } from "../button";
import { type getWines } from "~/server/db/select";
import { createStripeCheckout } from "~/server/actions/create-stripe-checkout";
import { toast } from "sonner";
import { loadStripe } from "@stripe/stripe-js";
import { env } from "~/env";
import { Loader2, ShoppingCart } from "lucide-react";
import { useState } from "react";

export function CheckoutButton({
  items,
  wines,
}: {
  items: CartItem[];
  wines: Awaited<ReturnType<typeof getWines>>;
}) {
  const [loading, setLoading] = useState(false);

  return (
    <Button
      className="mt-4 w-full bg-black text-white hover:bg-gray-800"
      onClick={async () => {
        setLoading(true);
        const line_items = items.map((item) => {
          const wine = wines.find((wine) => wine.id === item.id);
          if (!wine) throw new Error("Wine not found lmao");
          if (!wine.stripePriceId)
            throw new Error("Wine has no stripePriceId lmao");

          return {
            price: wine.stripePriceId,
            quantity: item.quantity,
          };
        });

        const sessionId = await createStripeCheckout(line_items);
        const stripe = await loadStripe(env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);
        if (!stripe)
          return toast.error("Erro ao carregar o Stripe", {
            description: "Tente novamente mais tarde",
          });

        const { error } = await stripe.redirectToCheckout({
          sessionId,
        });
        if (error) return toast.error(error.message);
      }}
    >
      Ir para o Pagamento
      {loading ? (
        <Loader2 className="ml-2 h-4 w-4" />
      ) : (
        <ShoppingCart className="ml-2 h-4 w-4" />
      )}
    </Button>
  );
}

import type Stripe from "stripe";
import { db } from "~/server/db";
import { stripe } from "~/server/stripe";

(async () => {
  const wines = await db.query.wines.findMany();
  const stripeProducts = await stripe.products.list({
    limit: wines.length,
  });

  for (const wine of wines) {
    const existingStripeProuct = stripeProducts.data.find(
      (product) => product.id === String(wine.id),
    );

    const wineUpsertParams = {
      name: wine.name,
      description: wine.descricao,
      images: [wine.img],
      url: `https://vinheria-agnello.vercel.app/product/${wine.id}`,
    } satisfies Stripe.ProductUpdateParams;

    const priceCreateParams = {
      product: String(wine.id),
      unit_amount_decimal: String(Math.round(wine.preco * 100)),
      currency: "brl",
    } satisfies Stripe.PriceCreateParams;

    if (existingStripeProuct) {
      await stripe.products.update(existingStripeProuct.id);
      const prices = await stripe.prices.list({
        product: existingStripeProuct.id,
      });

      if (
        prices.data.some(
          (x) =>
            x.unit_amount_decimal !== priceCreateParams.unit_amount_decimal,
        )
      ) {
        for (const price of prices.data)
          await stripe.prices.update(price.id, {
            //?Archive old prices bc stripe doesnt allow to delete them for some reason sadfaceemoji
            active: false,
          });

        await stripe.prices.create(priceCreateParams);
      }

      console.log("updated wine", wine.name);
      continue;
    }

    await stripe.products.create({
      id: String(wine.id),
      ...wineUpsertParams,
    });
    await stripe.prices.create(priceCreateParams);

    console.log("inserted wine", wine.name);
  }
})()
  .then(() => {
    console.log("Products created successfully");
    process.exit(0);
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });

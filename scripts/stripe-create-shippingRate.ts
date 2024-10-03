import { stripe } from "~/server/stripe";

(async () => {
  const shippingRateId = await stripe.shippingRates.create({
    display_name: "Standard Shipping",
    type: "fixed_amount",
    fixed_amount: {
      amount: 1500, // Amount in cents (e.g., $5.00)
      currency: "brl", // Your currency
    },
    delivery_estimate: {
      minimum: {
        unit: "business_day",
        value: 5, // Minimum delivery time in days
      },
      maximum: {
        unit: "business_day",
        value: 7, // Maximum delivery time in days
      },
    },
  });
  console.log("Shipping rate created with ID:", shippingRateId.id);
})()
  .then(() => {
    console.log("Products created/updated successfully");
    process.exit(0);
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });

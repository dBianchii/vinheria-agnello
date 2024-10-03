import { type NextRequest, NextResponse } from "next/server";
import stripe from "stripe";
import { env } from "~/env";

export async function POST(req: NextRequest) {
  const sig = req.headers.get("stripe-signature");
  if (!sig) {
    console.error("No stripe-signature header present");
    return NextResponse.json(
      { error: "No stripe-signature header present" },
      { status: 400 },
    );
  }

  const body = await req.text(); // Read the raw body to validate the signature

  let event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, env.STRIPE_SECRET_KEY);
  } catch (err: unknown) {
    if (err instanceof Error) console.error(`Webhook Error: ${err.message}`);
    return NextResponse.json({ error: "Webhook error" }, { status: 400 });
  }

  // Handle the event
  switch (event.type) {
    case "checkout.session.completed":
      const session = event.data.object; // Contains the checkout session object
      // Fulfill the order (e.g., update your database, send confirmation email)
      console.log("Payment was successful!", session);
      break;
    case "payment_intent.succeeded":
      const paymentIntent = event.data.object;
      console.log("PaymentIntent was successful!", paymentIntent);
      break;
    case "payment_intent.payment_failed":
      const failedPaymentIntent = event.data.object;
      console.error("PaymentIntent failed:", failedPaymentIntent);
      break;
    // Add other event types as needed
    default:
      console.warn(`Unhandled event type: ${event.type}`);
  }

  return NextResponse.json({ received: true });
}

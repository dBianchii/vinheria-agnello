import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import Header from "~/components/header";
import Newsletter from "~/components/newsletter";
import Footer from "~/components/footer";
import { Toaster } from "~/components/ui/sonner";
import { CartProvider } from "~/context/cart-context";
import { cn } from "~/lib/utils";

export const metadata: Metadata = {
  title: "Vinheria Agnello",
  description: "Os melhores vinhos do Brasil",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body
        className={cn(
          "min-h-screen bg-background font-sans text-foreground antialiased",
          GeistSans.variable,
        )}
      >
        <CartProvider>
          <Header />
          <div className="flex min-h-screen flex-col">
						{/* sem o pt-20 abaixo, a página de produto e carrinho começam embaixo do header, que tem h-20 */}
            <div className="flex-grow pt-20">{children}</div>
            <Newsletter />
            <Footer />
          </div>
        </CartProvider>
        <Toaster />
      </body>
    </html>
  );
}

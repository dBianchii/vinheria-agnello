import { ShoppingCart as IconShoppingCart, Search, User } from "lucide-react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { serialize } from "~/app/products/_components/nuqs-parsers";
import { getServerAuthSession } from "~/server/auth";
import HeaderFooterRemover from "../header-footer-remover";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import logo from "../../../public/logo2.png"
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { LogOutMenuItem } from "./log-out-button";

const ShoppingCartBadge = dynamic(() => import("../shopping-cart-badge"), {
  ssr: false,
});

export default function Header() {
  return (
    <HeaderFooterRemover>
      <header className="fixed z-10 w-full bg-background/20 shadow backdrop-blur">
        <div className="container mx-auto flex h-20 items-center justify-between px-4 py-4 md:flex-row">
          <div className="flex items-center md:mb-0">
            <Link href="/">
              <Image
                src={logo}
                alt="Agnello Logo"
                width={150}
                height={50}
                className="mr-4"
              />
            </Link>
            <nav className="hidden space-x-4 md:flex">
              <Link
                href={`/products${serialize({ categoria: ["singular"] })}`}
                className="text-gray-600 hover:text-gray-900"
              >
                Vinhos
              </Link>
              <Link
                href={`/products${serialize({ categoria: ["kit"] })}`}
                className="text-gray-600 hover:text-gray-900"
              >
                Kits
              </Link>
              <Link
                href="/products"
                className="text-gray-600 hover:text-gray-900"
              >
                Mais Vendidos
              </Link>
              <Link
                href="/products"
                className="text-gray-600 hover:text-gray-900"
              >
                Promoções
              </Link>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <Search className="text-gray-600" />
            <Link href="/cart">
              <ShoppingCart />
            </Link>
            <Suspense fallback={<NotLoggedInUserProfile />}>
              <UserProfile />
            </Suspense>
          </div>
        </div>
      </header>
    </HeaderFooterRemover>
  );
}

function NotLoggedInUserProfile() {
  return (
    <Link href="/signIn">
      <User className="text-gray-600 hover:text-[#6d071a]" />
    </Link>
  );
}

async function UserProfile() {
  const session = await getServerAuthSession();

  if (!session) return <NotLoggedInUserProfile />;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="hover:">
            <AvatarImage src={session.user.image ?? ""} alt="@shadcn" />
            <AvatarFallback>{session.user.name}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {session.user.name}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {session.user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <LogOutMenuItem />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function ShoppingCart() {
  return (
    <div className="relative">
      <IconShoppingCart className="text-gray-600 hover:text-[#6d071a]" />
      <ShoppingCartBadge />
    </div>
  );
}

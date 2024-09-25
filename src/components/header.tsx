import Image from "next/image";
import { Search, ShoppingCart, User } from "lucide-react";

export default function Header() {
  return (
    <header className="bg-white shadow fixed w-full">
      <div className="h-20 container mx-auto flex items-center justify-between px-4 py-4 md:flex-row">
        <div className="flex items-center md:mb-0">
          <Image
            src="https://placehold.co/150x50"
            alt="Agnello Logo"
            width={150}
            height={50}
            className="mr-4"
          />
          <nav className="hidden space-x-4 md:flex">
            <a href="#" className="text-gray-600 hover:text-gray-900">
              Vinhos
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-900">
              Kits
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-900">
              Mais Vendidos
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-900">
              Promoções
            </a>
          </nav>
        </div>
        <div className="flex items-center space-x-4">
          <Search className="text-gray-600" />
          <ShoppingCart className="text-gray-600" />
          <User className="text-gray-600" />
        </div>
      </div>
    </header>
  );
}

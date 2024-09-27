import Image from "next/image";
import React from "react";
import HeaderFooterRemover from "./header-footer-remover";

export default function Footer() {
  return (
    <HeaderFooterRemover>
      <footer className="bg-gray-100 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
            <div>
              <Image
                src="https://placehold.co/150x50"
                alt="Agnello Logo"
                width={150}
                height={50}
                className="mr-4"
              />
              <p className="text-sm text-gray-600">
                Encontre os mais selecionados vinhos do mundo. Entregamos em
                todo o Brasil.
              </p>
            </div>
            <div>
              <h3 className="mb-4 font-bold">AJUDA</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <a href="#" className="hover:text-gray-900">
                    Suporte ao Cliente
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-900">
                    Informações de entrega
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-900">
                    Termos e Condições
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-900">
                    Política de Privacidade
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 font-bold">FAQ</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <a href="#" className="hover:text-gray-900">
                    Conta
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-900">
                    Pedidos
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-900">
                    Pagamentos
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-900">
                    Reembolsos
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 font-bold">EXPERIMENTE</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <a href="#" className="hover:text-gray-900">
                    Guias de Harmonização
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-900">
                    Blog de Vinhos
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-900">
                    Como Escolher Vinhos
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-900">
                    Pacotes de Degustação
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t border-gray-200 pt-8 text-center text-sm text-gray-600">
            <p>
              &copy; Vinícola Agnello © 2024. Todos os direitos reservados.
            </p>
            <div className="mt-4 space-x-4">
              <span>Visa</span>
              <span>Mastercard</span>
              <span>PayPal</span>
              <span>Apple Pay</span>
              <span>Google Pay</span>
            </div>
          </div>
        </div>
      </footer>
    </HeaderFooterRemover>
  );
}

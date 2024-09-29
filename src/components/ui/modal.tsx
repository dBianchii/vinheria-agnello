import { useEffect, type ReactNode } from "react";
import { createPortal } from "react-dom";

interface ModalProps {
  onClose: () => void;
  children: ReactNode;
}

export default function Modal({ onClose, children }: ModalProps) {
  // Bloqueia o scroll da página quando o modal está aberto
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-full max-w-lg rounded bg-white p-6 shadow-lg">
        {/* Botão para fechar o modal */}
        <button
          className="absolute right-2 top-2 text-gray-600 hover:text-gray-800"
          onClick={onClose}
        >
          Fechar
        </button>
        {/* Conteúdo do modal */}
        {children}
      </div>
    </div>,
    document.body,
  );
}

"use client";

import { LoginWithGoogleButton } from "./_components/login-with-google-button";

export default function SignInPage() {
  return (
    <div className="flex min-h-screen bg-[#f5f0e8] text-[#6d071a]">
      <div className="m-auto w-full max-w-md rounded-3xl bg-[#f9f6f1] p-8 shadow-lg">
        <div className="space-y-6">
          <div className="flex items-center justify-center text-center">
            <h1 className="font-serif text-4xl">
              <span className="block text-sm uppercase tracking-wide">
                Vinheria
              </span>
              Agnello
            </h1>
          </div>
          <div className="space-y-4">
            <LoginWithGoogleButton />
          </div>
          <div className="flex items-center space-x-2">
            <label
              htmlFor="terms"
              className="text-center text-xs font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Ao ser cadastrado no app, você concorda com os Termos de serviço e
              com a Política de privacidade
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

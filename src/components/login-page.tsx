"use client";

import { useState } from "react";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Checkbox } from "~/components/ui/checkbox";

export function LoginPageComponent() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#f5f0e8] text-[#6d071a]">
      <div className="m-auto w-full max-w-md rounded-3xl bg-[#f9f6f1] p-8 shadow-lg">
        {isLogin ? (
          <div className="space-y-6 text-center">
            <h1 className="font-serif text-4xl">
              <span className="block text-sm uppercase tracking-wide">
                Vinheria
              </span>
              Agnello
            </h1>
            <Button
              className="w-full bg-[#6d071a] text-white hover:bg-[#8d0922]"
              onClick={() => setIsLogin(false)}
            >
              Entrar
            </Button>
            <p className="text-sm">
              <button onClick={() => setIsLogin(false)} className="underline">
                Ainda não tenho uma conta
              </button>
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center">
              <Button
                variant="ghost"
                className="p-0"
                onClick={() => setIsLogin(true)}
              >
                <ArrowLeft className="h-6 w-6" />
              </Button>
              <h2 className="ml-4 text-2xl font-bold">Cadastro</h2>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nome</Label>
                <Input id="name" placeholder="Fulano da Silva Gomes" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="fulanosilva1205@gmail.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contact">Contato</Label>
                <div className="flex">
                  <Input
                    id="contact"
                    type="tel"
                    placeholder="+55 (19) 99864-2635"
                    className="rounded-r-none"
                  />
                  <span className="inline-flex items-center rounded-r-md border border-l-0 border-input bg-background px-3 text-sm text-muted-foreground">
                    BR
                  </span>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="********"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 flex cursor-pointer items-center pr-3 text-gray-400"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="terms" />
              <label
                htmlFor="terms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Ao ser cadastrado no app, você concorda com os Termos de serviço
                e com a Política de privacidade
              </label>
            </div>
            <Button className="w-full bg-[#6d071a] text-white hover:bg-[#8d0922]">
              Criar minha conta
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

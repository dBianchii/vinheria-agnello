import { Button } from "~/components/ui/button";
import { LoginWithGoogleButton } from "./_components/login-with-google-button";
import Link from "next/link";

export default function SignInPage() {
  return (
    <div className="flex min-h-screen bg-[#f5f0e8] text-[#6d071a]">
      <div className="m-auto w-full max-w-md rounded-3xl bg-[#f9f6f1] p-8 shadow-lg">
        <div className="space-y-6">
          <div className="flex items-center justify-center text-center">
            <Link href="/">
              <h1 className="font-serif text-4xl">
                <span className="block text-sm uppercase tracking-wide">
                  Vinheria
                </span>
                Agnello
              </h1>
            </Link>
          </div>
          <form>
            <div className="mb-6">
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-[#6d071a]"
              >
                Email
              </label>
              <input
                disabled
                type="email"
                id="email"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-[#6d071a] focus:border-[#6d071a] focus:ring-[#6d071a]"
                placeholder="fulano@email.com"
                required
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium text-[#6d071a]"
              >
                Senha
              </label>
              <input
                disabled
                type="password"
                id="password"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-[#6d071a] focus:border-[#6d071a] focus:ring-[#6d071a]"
                placeholder="•••••••••"
                required
              />
            </div>
            <Button variant={"default"} size={"lg"} className="w-full">
              Entrar
            </Button>
            <p className="mt-4 items-center justify-center text-center">ou</p>
          </form>

          <div className="space-y-4">
            <LoginWithGoogleButton />
          </div>
          <p className="items-center justify-center text-center text-sm font-light text-gray-500 dark:text-gray-400">
            Tem uma conta?{" "}
            <Link
              href="/cadastrese"
              className="text-primary-600 dark:text-primary-500 font-medium hover:text-[#6d071a] hover:underline"
            >
              Cadastre-se
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

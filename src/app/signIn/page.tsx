import { Button } from "~/components/ui/button";
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
          <form>
            <div className="mb-6">
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-[#6d071a]">Email</label>
                <input type="email" id="email" className="bg-gray-50 border border-gray-300 text-[#6d071a] text-sm rounded-lg focus:ring-[#6d071a] focus:border-[#6d071a] block w-full p-2.5 " placeholder="fulano@email.com" required />
            </div> 
            <div className="mb-6">
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-[#6d071a] ">Senha</label>
                <input type="password" id="password" className="bg-gray-50 border border-gray-300 text-[#6d071a] text-sm rounded-lg focus:ring-[#6d071a] focus:border-[#6d071a] block w-full p-2.5  " placeholder="•••••••••" required />
            </div> 
            <Button variant={"default"} size={"lg"} className="w-full">
                Entrar
            </Button>
            <p className="mt-4 items-center justify-center text-center">ou</p>
          </form>

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

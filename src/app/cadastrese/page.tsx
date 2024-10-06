import { Button } from "~/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import logo from "/public/logo.png";

export default function CadastresePage() {
  return (
    <div className="flex min-h-screen bg-[#f5f0e8] text-[#6d071a]">
      <div className="m-auto w-full max-w-md rounded-3xl bg-[#FEFEFE] p-8 shadow-lg">
        <div className="space-y-6">
                   
          <div className="flex items-center justify-center text-center">
            <Link href="/">
						<Image
                src={logo}
                alt="Agnello Logo"
                width={200}
                height={100}
              />
            </Link>
          </div>
          <form>
            <div className="mb-6">
              <label htmlFor="name" className="block mb-2 text-sm font-medium text-[#6d071a]">Nome</label>
              <input disabled type="text" id="name" className="bg-gray-50 border border-gray-300 text-[#6d071a] text-sm rounded-lg focus:ring-[#6d071a] focus:border-[#6d071a] block w-full p-2.5 " placeholder="Fulano da Silva Gomes" required />
            </div>
            <div className="mb-6">
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-[#6d071a]">Email</label>
                <input disabled type="email" id="email" className="bg-gray-50 border border-gray-300 text-[#6d071a] text-sm rounded-lg focus:ring-[#6d071a] focus:border-[#6d071a] block w-full p-2.5 " placeholder="fulano@email.com" required />
            </div> 
            <div className="mb-6">
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-[#6d071a] ">Senha</label>
                <input disabled type="password" id="password" className="bg-gray-50 border border-gray-300 text-[#6d071a] text-sm rounded-lg focus:ring-[#6d071a] focus:border-[#6d071a] block w-full p-2.5  " placeholder="•••••••••" required />
            </div> 
            <Button variant={"default"} size={"lg"} className="w-full">
                Criar minha conta
            </Button>
          
          </form>

          <div className="flex items-start">
            <div className="flex items-center h-5">
              
              <input id="terms" aria-describedby="terms" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required/>
            </div>
            <div className="ml-3 text-xs">
              <label htmlFor="terms" className="text-center text-xs font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Ao ser cadastrado no app, você concorda com os <a className="font-medium text-primary-600 hover:underline dark:text-primary-500" href="#">Termos de serviço e
              com a Política de privacidade</a></label>
            </div>
          </div>
          
          <p className="text-sm font-light text-gray-500 dark:text-gray-400 items-center justify-center text-center">
                      Tem uma conta? <Link href="/signIn"  className="font-medium text-primary-600 hover:underline hover:text-[#6d071a] dark:text-primary-500">Entre</Link>
          </p>


          
        </div>
      </div>
    </div>
  );
}

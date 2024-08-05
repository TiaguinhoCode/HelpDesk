'use client'

// Imagem
import bannerLogin from "../../../public/assets/bannerLogin.svg"

// Framework - Next
import Image from "next/image";
import { useRouter } from "next/navigation";

// Components
import { InputForm } from "@/components/ui/input";
import { Btn } from "@/components/ui/button";

// Biblioteca
import { GoSignIn } from "react-icons/go";
import { signIn } from "next-auth/react";

// React
import { SyntheticEvent, useState } from "react";
import { toast } from "react-toastify";

export default function LoginPage() {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<boolean>(false)

  const router = useRouter()

  async function handleSignIn(e: SyntheticEvent) {
    e.preventDefault()

    setLoading(true)

    if (email === '' && password === '') {
      toast.error('Preenchar todos os campos!')
      setError(true)
      setLoading(false)
      return 
    }

    const resp = await signIn('credentials', {
      email: email,
      password: password,
      redirect: false
    })

    if (resp?.error) {
      console.log(resp)
    }

    router.replace('/ticket')
    setLoading(false)
  }

  return (
    <div className="container px-6 mx-auto">
      <div
        className="flex flex-col text-center md:text-left md:flex-row h-screen justify-evenly md:items-center"
      >
        <div className="flex flex-col w-full">
          <div className="">
            <Image src={bannerLogin} alt="banner helpdesk" quality={100} priority={true} className="w-56 h-w-56 mx-auto md:float-left " />
          </div>
          <h1 className="text-4xl text-gray-800 font-bold">Precisa de ajuda?</h1>
          <p className="w-5/12 text-base mx-auto md:mx-0 text-gray-500">
            Não se preocupe, nosso suporte é 10/10, assim como nossa pizza favorita!
          </p>
        </div>
        <div className="w-full md:w-full lg:w-9/12 mx-auto md:mx-0">
          <div className="bg-white p-10 flex flex-col w-full shadow-xl rounded-2xl">
            <h2 className="text-2xl font-bold text-gray-800 text-left mb-3">
              Entrar
            </h2>
            <form onSubmit={handleSignIn} className="w-full">
              <div className="flex flex-col w-full my-2">
                <InputForm
                  isInvalid={error}
                  type="email"
                  label="Email: "
                  placeholder="exemplo@domain.com"
                  isPassoword={false}
                  onChange={(e) => setEmail(e.target.value)} q
                  value={email}
                />
              </div>
              <div className="flex flex-col w-full my-2">
                <InputForm
                  isInvalid={error}
                  isPassoword={true}
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                />
              </div>
              <div id="button" className="flex flex-col w-full my-5">
                <Btn type="submit" isLoading={loading} description="Entrar" endContent={<GoSignIn className={`${loading && 'hidden'}`} size={16} />} />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

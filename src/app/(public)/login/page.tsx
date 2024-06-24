// Marcar como Client Component
"use client";

// Css
import './css/styles.css'

// Biblioteca
import { IoEyeOutline } from "react-icons/io5";
import { IoEyeOffOutline } from "react-icons/io5";
import { toast } from 'react-toastify';

// Componentes
import { InputForm } from '@/components/ui/input';
import { BtnLoading } from '@/components/ui/button';

// Framework / servidor
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

// React
import { SyntheticEvent, useState } from 'react';

export default function LoginPage() {
    const [email, setEmail] = useState<string>('')
    const [password, setPassoword] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<boolean>(false)
    const [isVisible, setIsVisible] = useState<boolean>(false);

    const router = useRouter()

    async function handleLogin(e: SyntheticEvent) {
        e.preventDefault();

        setLoading(true);

        const result = await signIn('credentials', {
            email,
            password,
            redirect: false
        });

        setLoading(false);

        if (email === '' && password === '') {
            toast.error('Preenchar todos os campos!')
            setError(true)
        }

        if (result?.error) {
            console.log(result);
            return;
        }

        router.replace('/');
    }

    return (
        <>
            <div className="h-screen bg-gray-100 flex justify-center items-center">
                <div className="py-6 w-[320px] p-10 px-8 bg-white rounded-[20px] shadow-xl">
                    <div className="flex items-center justify-center font-black text-sky-900">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M5.5 16a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.977A4.5 4.5 0 1113.5 16h-8z" />
                        </svg>
                        <h1 className="tracking-wide">Help Desk<span className="font-mono">™</span></h1>
                    </div>
                    <form onSubmit={handleLogin}>
                        <div className="py-3">
                            <InputForm error={error} radius="lg" type="email" color={error ? 'danger' : 'default'} variant="flat" label="Email*" size='sm' value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>

                        <div>
                            <InputForm error={error} radius="lg" label="Senha*" variant="flat" color={error ? 'danger' : 'default'} type={isVisible ? 'text' : 'password'} size='sm' value={password} onChange={(e) => setPassoword(e.target.value)}
                                endContent={
                                    <button className="focus:outline-none" type="button" onClick={() => setIsVisible(!isVisible)}>
                                        {isVisible ? (
                                            <IoEyeOutline className="ease-in duration-500 text-2xl text-default-500 pointer-events-none" />
                                        ) : (
                                            <IoEyeOffOutline className="ease-in duration-500 text-2xl text-default-500 pointer-events-none" />
                                        )}
                                    </button>
                                }
                            />
                        </div>
                        <BtnLoading isLoading={loading} type='submit' color={loading ? 'success' : 'primary'} size='md'>
                            Entrar
                        </BtnLoading>
                    </form>
                </div>
            </div>
        </>
    )
}
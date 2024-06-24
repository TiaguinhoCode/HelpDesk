'use client'

// React 
import { ReactNode } from "react";

// Biiblioteca
import { Button } from '@nextui-org/button';
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";

// Tipagem
type ButtonElementType = typeof Button;
type ButtonProps = React.ComponentProps<ButtonElementType> & { children: ReactNode };

export function BtnLoading({ children, ...rest }: ButtonProps) {
    return (
        <Button {...rest} size="md" className='w-full flex items-center text-white cursor-pointer mt-5 font-bold'>
            {children}
        </Button>
    );
}


export function BtnLogout() {
    const router = useRouter()

    async function logout() {
        await signOut({
            redirect: false
        })
        router.replace('/login')
    }

    return (
        <Button onClick={logout} size="md" className='w-full flex items-center text-white cursor-pointer mt-5 font-bold'>
            Sair
        </Button>
    )
}
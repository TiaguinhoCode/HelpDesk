'use client'

// Biblioteca
import { BsTicketPerforated } from "react-icons/bs";
import { FaComputer, FaRegCircleUser } from "react-icons/fa6";
import { Avatar, Divider, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/react";

// Componentes
import { ActiveLink } from "./ActiveLink";

// Framework - Servidor
import { usePathname, useRouter } from "next/navigation";

// Biblioteca
import { signOut } from "next-auth/react";
import { toast } from "react-toastify";

// Tipagem
import { User } from "@/types/user";
interface SideNavProp {
    user: User
}

export function SideNav({ user }: SideNavProp) {
    const router = useRouter()
    const pathName = usePathname()

    async function logout() {
        await signOut({
            redirect: false
        })
        router.replace('/')
    }

    return (
        <div className="flex flex-col items-center w-16 h-full overflow-hidden text-white bg-blue-500 ">
            <a className="flex items-center justify-center mt-3" href="#">
                <svg className="w-8 h-8 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z" />
                </svg>
            </a>
            <div className="flex flex-col items-center mt-3 border-t border-white">
                <ActiveLink content="Chamados" href="/ticket">
                    <BsTicketPerforated className="w-6 h-6 stroke-current" />
                </ActiveLink>
                <ActiveLink content="Computadores" href={pathName === "/host/create" ? "/host/create" : "/host"}>
                    <FaComputer className="w-6 h-6 stroke-current" />
                </ActiveLink>
            </div>
            <div className="flex flex-col items-center mt-2 border-t border-white">
                {/* <a className="flex items-center justify-center w-12 h-12 mt-2 rounded hover:bg-gray-700 hover:text-gray-300" href="#">
                    <svg className="w-6 h-6 stroke-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                </a>
                <a className="flex items-center justify-center w-12 h-12 mt-2 rounded hover:bg-gray-700 hover:text-gray-300" href="#">
                    <svg className="w-6 h-6 stroke-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                    </svg>
                </a>
                <a className="relative flex items-center justify-center w-12 h-12 mt-2 rounded hover:bg-gray-700 hover:text-gray-300" href="#">
                    <svg className="w-6 h-6 stroke-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                    </svg>
                    <span className="absolute top-0 left-0 w-2 h-2 mt-2 ml-2 bg-indigo-500 rounded-full"></span>
                </a> */}
            </div>
            <a className="flex items-center justify-center w-16 h-16 mt-auto rounded ">
                <Dropdown classNames={{trigger: "w-9 h-9 "}} placement="bottom-end">
                    <DropdownTrigger>
                        <Avatar
                            isBordered
                            radius="md"
                            as="button"
                            className="transition-transform bg-white"
                            fallback={<FaRegCircleUser className="w-6 h-6" />}
                        />
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Profile Actions" variant="flat">
                        <DropdownItem key="profile" className="h-14 gap-2">
                            <p className="font-semibold">Logado como:</p>
                            <p className="font-semibold">{user.email}</p>
                            <Divider className="my-1" />
                        </DropdownItem>
                        <DropdownItem onClick={logout} key="logout" color="danger">
                            Sair
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
                {/* </a> */}
            </a>
        </div>
    )
}
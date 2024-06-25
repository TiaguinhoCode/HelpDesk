"use client";

// Framework - Servidor
import { useRouter } from "next/navigation";

// Biblioteca
import { TfiDashboard } from "react-icons/tfi";
import { FaUser } from "react-icons/fa";
import { FaComputer } from "react-icons/fa6";
import { FaTicketSimple } from "react-icons/fa6";
import { Tooltip } from "@nextui-org/tooltip";
import { User } from "@nextui-org/user";
import { Avatar } from "@nextui-org/avatar";
import { Dropdown, DropdownItem, DropdownMenu, DropdownSection, DropdownTrigger } from "@nextui-org/dropdown";
import { CgLogOut } from "react-icons/cg";
import { signOut } from "next-auth/react";
import { PiUsersThree } from "react-icons/pi";

// Componentes
import ActiveLink from "./ActiveLink";

// Tipagem
interface ItemsUser {
    name: string;
    email: string;
    department: { id: string, sector: string };
    photo: string
}

type SideBarProps = {
    user: ItemsUser
}

export default function SideBar({ user }: SideBarProps) {
    const router = useRouter()

    async function logout() {
        await signOut({
            redirect: false
        })
        router.replace('/login')
    }

    return (
        <>
            <aside className="flex flex-col items-center w-16 h-screen py-8 overflow-y-auto bg-white border-r rtl:border-l rtl:border-r-0 dark:bg-blue-500 dark:border-gray-300">
                <nav className="flex flex-col flex-1 space-y-6">
                    <Tooltip placement="left" offset={2} showArrow={true} content="Sky Desk" classNames={{ base: "font-bold" }}>
                        <a href="#">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-white" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M5.5 16a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.977A4.5 4.5 0 1113.5 16h-8z" />
                            </svg>
                        </a>
                    </Tooltip>

                    <ActiveLink href="/" content="Relatorios">
                        <TfiDashboard className="w-6 h-6" />
                    </ActiveLink>

                    <ActiveLink href="/ticket" content="Chamados">
                        <FaTicketSimple className="w-6 h-6" />
                    </ActiveLink>

                    <ActiveLink href="/host" content="Computadores">
                        <FaComputer className="w-6 h-6" />
                    </ActiveLink>

                    <ActiveLink href="/users" content="Usuarios">
                        <PiUsersThree className="w-6 h-6" />
                    </ActiveLink>

                    <hr className="my-6 border-white " />
                </nav>
                <Dropdown
                    classNames={{
                        content: "p-0 border-small border-divider bg-background",
                    }}
                >
                    <DropdownTrigger>
                        <Avatar icon={<FaUser />} className="w-10 h-10 bg-white text-tiny" />
                    </DropdownTrigger>
                    <DropdownMenu
                        aria-label="Configuracoes"
                        disabledKeys={["Perfils"]}
                        className="p-3"
                        itemClasses={{
                            base: [
                                "rounded-md",
                                "text-gray-700",
                                "transition-opacity",
                                "data-[hover=true]:text-gray-500",
                                "data-[hover=true]:bg-gray-200",
                                "data-[selectable=true]:focus:bg-gray-70",
                                "data-[pressed=true]:opacity-70",
                                "data-[focus-visible=true]:ring-gray-700",
                            ],
                        }}
                    >
                        <DropdownSection aria-label="Perfil & Acoes" showDivider>
                            <DropdownItem
                                isReadOnly
                                key="profile"
                                className="h-14 gap-2"
                            >
                                <User
                                    name={user.name}
                                    description={user.department.sector}
                                    classNames={{
                                        name: "text-gray-800 font-bold",
                                        description: "text-gray-800 font-semibold",
                                    }}
                                    avatarProps={{
                                        size: "sm",
                                        src: user.photo === null ? '' : `${user.photo}`,
                                    }}
                                />
                            </DropdownItem>
                            <DropdownItem key="settings">Configurações</DropdownItem>
                        </DropdownSection>

                        <DropdownSection aria-label="Preferences" showDivider>
                            <DropdownItem
                                isReadOnly
                                key="tema"
                                className="cursor-default"
                                endContent={
                                    <select
                                        className="z-10 outline-none w-16 py-0.5 rounded-md text-tiny group-data-[hover=true]:border-default-500 border-small border-default-300 dark:border-default-200 bg-transparent text-default-500"
                                        id="tema"
                                        name="tema"
                                    >
                                        <option>Sistema</option>
                                        <option>Dark</option>
                                        <option>Light</option>
                                    </select>
                                }
                            >
                                Theme
                            </DropdownItem>
                        </DropdownSection>

                        <DropdownSection aria-label="Help & Feedback">
                            <DropdownItem onClick={logout} key="sair" endContent={<CgLogOut className="text-lg" />}>Sair</DropdownItem>
                        </DropdownSection>
                    </DropdownMenu>
                </Dropdown>
            </aside >
        </>
    )
} 
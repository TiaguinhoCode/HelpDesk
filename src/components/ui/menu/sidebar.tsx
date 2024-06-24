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
            <aside className="flex flex-col items-center w-16 h-screen py-8 overflow-y-auto bg-white border-r rtl:border-l rtl:border-r-0 dark:bg-blue-500 dark:border-gray-700">
                <nav className="flex flex-col flex-1 space-y-6">
                    <Tooltip placement="left" offset={2} showArrow={true} content="Sky Desk" classNames={{ base: "font-bold" }}>
                        <a href="#">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-white" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M5.5 16a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.977A4.5 4.5 0 1113.5 16h-8z" />
                            </svg>
                        </a>
                    </Tooltip>

                    <Tooltip placement="left" offset={2} showArrow={true} content="Relatório" classNames={{ base: "font-bold" }}>
                        <a href="#" className="p-1.5 text-gray-700 hover:dark:text-gray-800 focus:outline-nones transition-colors duration-200 rounded-lg dark:text-gray-200 dark:hover:bg-gray-100 ">
                            <TfiDashboard className="w-6 h-6" />
                        </a>
                    </Tooltip>

                    <Tooltip placement="left" offset={2} showArrow={true} content="Chamados" classNames={{ base: "font-bold" }}>
                        <a href="#" className="p-1.5 text-gray-700 hover:dark:text-gray-800 focus:outline-nones transition-colors duration-200 rounded-lg dark:text-gray-200 dark:hover:bg-gray-100 ">
                            <FaTicketSimple className="w-6 h-6" />
                        </a>
                    </Tooltip>

                    <Tooltip placement="left" offset={2} showArrow={true} content="Computadores" classNames={{ base: "font-bold" }}>
                        <a href="#" className="p-1.5 text-gray-700 hover:dark:text-gray-800 focus:outline-nones transition-colors duration-200 rounded-lg dark:text-gray-200 dark:hover:bg-gray-100 ">
                            <FaComputer className="w-6 h-6" />
                        </a>
                    </Tooltip>

                    <a href="#" className="p-1.5 text-gray-700 hover:dark:text-gray-800 focus:outline-nones transition-colors duration-200 rounded-lg dark:text-gray-200 dark:hover:bg-gray-100 ">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                        </svg>
                    </a>

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
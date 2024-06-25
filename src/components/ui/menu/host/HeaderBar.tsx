"use client";

// Biblioteca
import { Avatar } from "@nextui-org/avatar";
import { Dropdown, DropdownItem, DropdownMenu, DropdownSection, DropdownTrigger } from "@nextui-org/dropdown";
import { User } from "@nextui-org/user";
import { CgLogOut } from "react-icons/cg";
import { FaUser } from "react-icons/fa";

// Framework / servidor
import { useRouter } from "next/navigation";
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

export default function HeaderBar({ user }: SideBarProps) {
    const router = useRouter()

    async function logout() {
        await signOut({
            redirect: false
        })
        router.replace('/login')
    }

    return (
        <>
            <header className="h-[73px] w-full flex items-center relative justify-between px-5 space-x-10 border dark:border-b-gray-300">
                <h1 className="font-bold text-xl text-white-800">Lista de todos computadores</h1>
                <div className="flex flex-shrink-0  items-center space-x-4 text-gray-800">
                    <div className="flex flex-col items-end ">
                        <div className="text-md font-medium ">{user.name}</div>
                        <div className="text-sm font-regular">{user.email}</div>
                    </div>
                    <Dropdown
                        classNames={{
                            content: "p-0 border-small border-divider bg-background",
                        }}
                    >
                        <DropdownTrigger>
                            <Avatar color="primary" icon={<FaUser />} className="w-10 h-10 text-white" />
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

                </div>

            </header>

        </>
    )
}
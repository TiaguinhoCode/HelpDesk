'use client'

// Biblioteca
import { Avatar, Divider, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/react"
import { FaRegCircleUser } from "react-icons/fa6"

// Framework - next
import { signOut } from "next-auth/react"
import { useRouter } from "next/navigation"

// Tipagem
import { User } from "@/types/user"
interface SideNavProp {
    user: User
}

export function HeaderNav({ user }: SideNavProp) {
    const router = useRouter();

    async function logout() {
        await signOut({
            redirect: false
        })
        router.replace('/')
    }

    return (
        <header className="h-14 w-full flex items-center relative justify-end px-5 space-x-10 bg-blue-500">
            <div className="flex flex-shrink-0 items-center space-x-4 text-white">
                <div className="flex flex-col items-end ">
                    <div className="text-sm font-medium ">{user.name}</div>
                    <div className="text-xs font-regular">{user.department.sector}</div>
                </div>

                <Dropdown classNames={{trigger: "w-8 h-8 "}} placement="bottom-end">
                    <DropdownTrigger>
                        <Avatar
                            isBordered
                            size="md"
                            radius="md"
                            as="button"
                            className="transition-transform bg-white "
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
            </div>
        </header>
    )
}


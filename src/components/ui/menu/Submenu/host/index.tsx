'use client'

// Bibliotecas
import { Avatar, Divider, Listbox, ListboxItem } from "@nextui-org/react";
import { FaUsers } from "react-icons/fa6";
import { FiFilter } from "react-icons/fi";
import { LiaUsersSolid } from "react-icons/lia";

// React
import { useMemo, useState } from "react";

// Tipagem
import { Department, User } from "@/types/user";
interface SubMenuProps {
    users: User[];
    departments: Department[];
}

export function Submenu({ users, departments }: SubMenuProps) {
    const [selectedKeys, setSelectedKeys] = useState(new Set(["text"]));

    const selectedValue = useMemo(
        () => Array.from(selectedKeys).join(", "),
        [selectedKeys]
    );


    return (
        <div className="h-full py-4 px-4 bg-white border rounded-xl sm:w-64 w-60 dark:bg-gray-900 dark:border-gray-700 overflow-y-auto">
            <div className="w-full flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-800 dark:text-white">Filtros</h2>
                <FiFilter className="text-xl text-gray-600 dark:text-gray-300" />
            </div>

            <Divider className="my-2" />

            <div className="space-y-4">
                <div className="w-full flex items-center justify-between">
                    <h2 className="text-base font-bold text-gray-800 dark:text-white">Usuários</h2>
                    <FaUsers className="text-xl text-gray-600 dark:text-gray-300" />
                </div>
                <div className="w-full overflow-y-auto h-2/4">
                    {users.map((user) => (
                        <button key={user.id} className="flex items-center rounded-md w-full px-5 py-2 transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-gray-800 gap-x-2 focus:outline-none">
                            <Avatar size="sm" isBordered color="primary" src={user.photo ? user.photo : ''} />
                            <div className="text-left pl-2">
                                <h1 className="text-sm font-medium text-gray-700 capitalize dark:text-white">{user.name}</h1>
                            </div>
                        </button>
                    ))}
                </div>

                <Divider className="my-2" />

                <div className="w-full flex items-center justify-between">
                    <h2 className="text-base font-bold text-gray-800 dark:text-white">Setores</h2>
                    <LiaUsersSolid className="text-xl text-gray-600 dark:text-gray-300" />
                </div>
                <div className="w-full overflow-y-auto h-2/4">
                    <Listbox
                        aria-label="Multiple selection example"
                        variant="flat"
                        disallowEmptySelection
                        selectionMode="multiple"
                        items={departments}
                    // selectedKeys={selectedKeys}
                    // onSelectionChange={setSelectedKeys}
                    >
                        {(department) =>
                            <ListboxItem key={department.id}>{department.sector}</ListboxItem>
                        }
                    </Listbox>
                </div>
            </div>
        </div>
    );
}

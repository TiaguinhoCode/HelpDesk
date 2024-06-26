"use client";

// Biblioteca
import { Button } from "@nextui-org/button";
import { Listbox, ListboxItem, ListboxSection } from "@nextui-org/listbox";
import { FaComputer } from "react-icons/fa6";
import { FiPlus } from "react-icons/fi";
import { IoIosPeople } from "react-icons/io";

// React
import { useEffect, useState } from "react";
import { api } from "@/services/apiClient";

// Tipagem
type ItemsDepartments = {
    id: string;
    sector: string;
};

interface SideBarProps {
    sector: ItemsDepartments[];
}

export default function SideBar({ sector }: SideBarProps) {

    return (
        <div className="h-screen overflow-y-auto  border-l border-r sm:w-96 w-60 dark:border-r-gray-300">
            <div className="w-full py-5 flex justify-between">
                <h2 className="text-lg pl-2 font-medium text-gray-800 dark:text-gray-800">Computadores</h2>
                <Button color="primary" size="sm" radius="md" className="p-2 mr-2" startContent={<FiPlus className="text-white text-lg" />}>Add Computador</Button>
            </div>
            <div className="border-b dark:border-b-gray-300"></div>
            <div className="mt-4 space-y-4">
                <Listbox variant="flat" aria-label="Listbox menu with sections">
                    <ListboxSection title="Todos:" showDivider>
                        <ListboxItem
                            key="todosComputador"
                            endContent={<FaComputer />}
                        >
                            Listar todos computadores
                        </ListboxItem>
                    </ListboxSection>
                    <ListboxSection title="Setores: " showDivider>
                        {sector.map((sectorItem) => (
                            <ListboxItem
                                key={sectorItem.id} 
                                endContent={<IoIosPeople />}
                            >
                                {sectorItem.sector}
                            </ListboxItem>
                        ))}
                    </ListboxSection>
                </Listbox>
            </div>

        </div>
    )
}

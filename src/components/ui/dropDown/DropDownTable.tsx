"use client";

// Bibliotecas
import { Button } from "@nextui-org/button";
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/dropdown";
import { FaChevronDown } from "react-icons/fa";

// Tipagem
type ItemCollumns = {
    name: string;
    uid: string
}

interface TableProps {
    data: ItemCollumns[]
}

export function DropDownTable({ data }: TableProps) {
    return (
        <Dropdown>
            <DropdownTrigger className="hidden sm:flex">
                <Button color="primary" size="sm" radius="md" endContent={<FaChevronDown className="text-white text-sm" />} >
                    Colunas
                </Button>
            </DropdownTrigger>
            {data.map((columns) => (
                <DropdownMenu
                    disallowEmptySelection
                    aria-label="Table Columns"
                    closeOnSelect={false}
                    selectionMode="multiple"
                >
                    <DropdownItem key={columns.uid} className="capitalize">{columns.name}</DropdownItem>
                </DropdownMenu>
            ))

            }
        </Dropdown>
    )
}
"use client";

// Bibliotecas
import { Button } from "@nextui-org/button";
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/dropdown";
import { FaChevronDown } from "react-icons/fa";

export function DropDownTable() {
    return (
        <Dropdown>
            <DropdownTrigger className="hidden sm:flex">
                <Button color="primary" size="sm" radius="md" endContent={<FaChevronDown className="text-white text-sm" />} >
                    Colunas
                </Button>
            </DropdownTrigger>
            <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectionMode="multiple"
            >
                <DropdownItem key="1" className="capitalize">ID</DropdownItem>
            </DropdownMenu>
        </Dropdown>
    )
}
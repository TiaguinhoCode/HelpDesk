"use client";

// Bibliotecas
import { Button } from "@nextui-org/button";
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/dropdown";
import { Selection } from "@nextui-org/table";
import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { atom, useRecoilState } from "recoil";

// Tipagem
type ItemCollumns = {
    name: string;
    uid: string
}

interface TableProps {
    data: ItemCollumns[]
}

export const INITIAL_VISIBLE_COLUMNS = ["user", "departamento", "host", "processador", "memoriaram", "hdd", "ssd", "armazenamento", "switch", "acoes"];
const initialSelection = Array.from(new Set(INITIAL_VISIBLE_COLUMNS));

export const hiddenColumn = atom<string[]>({
    key: "hiddenColumn",
    default: initialSelection,
});

export function DropDownTable({ data }: TableProps) {
    const [visibleColumns, setVisibleColumns] = useRecoilState<string[]>(hiddenColumn);

    const handleSelectionChange = (keys: Selection) => {
        const selectionArray = Array.from(keys as Set<React.Key>);
        setVisibleColumns(selectionArray as string[]);
    };

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
                selectedKeys={visibleColumns}
                selectionMode="multiple"
                onSelectionChange={handleSelectionChange}
            >
                {data.map((column) => (
                    <DropdownItem key={column.uid} className="capitalize">{column.name}</DropdownItem>
                ))}
            </DropdownMenu>
        </Dropdown>
    )
}

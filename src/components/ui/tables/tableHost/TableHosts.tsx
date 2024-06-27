"use client";

// Biblioteca
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/table";
import { User } from "@nextui-org/user";
import { Tooltip } from "@nextui-org/tooltip";
import { FaRegEye } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import { TbTrash } from "react-icons/tb";
import { useRecoilValue } from "recoil";

// Mascara
import { truncateString } from "@/app/utils/mask/stringMask";

// React
import React, { useMemo } from "react";

// Recoil
import { hiddenColumn } from "../../dropDown/DropDownTable";
import { serchFilter } from "@/atom/searchFilter";

// Tipagem
type ItemHost = {
    id: string;
    host: string;
    processor: string;
    ram_memory: string;
    hdd: boolean;
    sdd: boolean;
    storage: string;
    system: string;
    switch: string;
    user: {
        id: string;
        name: string;
        email: string;
        department: { id: string; sector: string }
        photo: string;
    };
};

type ItemCollumns = {
    name: string;
    uid: string;
    hidden: boolean
}

interface TableProps {
    data: ItemHost[];
    collumns: ItemCollumns[]
}

export function TableHosts({ data, collumns }: TableProps) {
    const hiddenColumns = useRecoilValue(hiddenColumn)
    const searchFilter = useRecoilValue(serchFilter)

    const listHosts = useMemo(() => {
        return data.filter(hosts => {
            const query = searchFilter.toLowerCase();
            return (
                hosts.host.toLowerCase().includes(query) ||
                hosts.processor.toLowerCase().includes(query) ||
                hosts.ram_memory.toLowerCase().includes(query) ||
                hosts.storage.toLowerCase().includes(query) ||
                hosts.system.toLowerCase().includes(query) ||
                hosts.switch.toLowerCase().includes(query) ||
                hosts.user.name.toLowerCase().includes(query) ||
                hosts.user.email.toLowerCase().includes(query) ||
                hosts.user.department.sector.toLowerCase().includes(query)
            );
        });
    }, [searchFilter]);


    return (    
        <div className="flex flex-col gap-3">
            <Table isStriped  classNames={{ th: "bg-[#2563eb] text-white" }} aria-label="Example empty table">
                <TableHeader>
                    {collumns.filter(column => hiddenColumns.includes(column.uid)).map((column) =>
                        <TableColumn key={column.uid}>{column.name}</TableColumn>
                    )}
                </TableHeader>
                <TableBody items={listHosts}>
                    {(item) => (
                        <TableRow key={item.id}>
                            {collumns.filter(column => hiddenColumns.includes(column.uid)).map((column) => (
                                <TableCell key={column.uid}>
                                    {renderCell(item, column.uid)}
                                </TableCell>
                            ))}
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    )
}

const renderCell = (item: ItemHost, columnKey: string) => {
    switch (columnKey) {
        case "user":
            return (
                <User
                    avatarProps={{ radius: "lg", src: item.user.photo }}
                    description={truncateString(item.user.email, 15)}
                    name={item.user.name}
                >
                    {item.user.email}
                </User>
            );
        case "departamento":
            return item.user.department.sector;
        case "host":
            return item.host;
        case "processador":
            return truncateString(item.processor, 20);
        case "memoriaram":
            return item.ram_memory;
        case "system":
            return item.system
        case "hdd":
            return item.hdd ? 'sim' : 'não';
        case "ssd":
            return item.sdd ? 'sim' : 'não';
        case "armazenamento":
            return item.storage;
        case "acoes":
            return (
                <div className="relative flex items-center gap-2">
                    <Tooltip content="Detalhe">
                        <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                            <FaRegEye />
                        </span>
                    </Tooltip>
                    <Tooltip content="Editar">
                        <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                            <FaPencil />
                        </span>
                    </Tooltip>
                    <Tooltip color="danger" content="Excluir máquina">
                        <span className="text-lg text-danger cursor-pointer active:opacity-50">
                            <TbTrash />
                        </span>
                    </Tooltip>
                </div>
            );
        case "switch":
            return item.switch;

        default:
            return null;
    }
};

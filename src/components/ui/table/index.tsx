"use client";

// Biblioteca
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/table";
import { User } from "@nextui-org/user";
import { Tooltip } from "@nextui-org/tooltip";
import { FaRegEye } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import { TbTrash } from "react-icons/tb";

// Mascara
import { truncateString } from "@/app/utils/mask/stringMask";
import React from "react";

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
    uid: string
}

interface TableProps {
    data: ItemHost[];
    collumn: ItemCollumns[]
}

export function TableMain({ data, collumn }: TableProps) {
    // const renderCell = React.useCallback((user: User, columnKey: React.Key) => {
    //     const cellValue = user[columnKey as keyof User];
    // }

    return (
        <Table classNames={{ th: "bg-[#2563eb] text-white" }} aria-label="Example empty table">
            <TableHeader>
                <TableColumn>Usuario</TableColumn>
                <TableColumn>Departamento</TableColumn>
                <TableColumn>Host</TableColumn>
                <TableColumn>Processador</TableColumn>
                <TableColumn>Memória ram</TableColumn>
                <TableColumn>HDD?</TableColumn>
                <TableColumn>SSD?</TableColumn>
                <TableColumn>Armazenamento</TableColumn>
                <TableColumn>Switch</TableColumn>
                <TableColumn>Ações</TableColumn>
            </TableHeader>
            {/* <TableBody emptyContent={"No rows to display."}>{[]}</TableBody> */}
            <TableBody items={data}>
                {(data) => (
                    <TableRow key={data.id}>
                        <TableCell>
                            <User
                                avatarProps={{ radius: "lg", src: data.user.photo }}
                                description={truncateString(data.user.email, 15)}
                                name={data.user.name}
                            >
                                {data.user.email}
                            </User>
                        </TableCell>
                        <TableCell>{data.user.department.sector}</TableCell>
                        <TableCell>{data.host}</TableCell>
                        <TableCell>{truncateString(data.processor, 20)}</TableCell>
                        <TableCell>{data.ram_memory}</TableCell>
                        <TableCell>{data.hdd ? 'sim' : 'não'}</TableCell>
                        <TableCell>{data.sdd ? 'sim' : 'não'}</TableCell>
                        <TableCell>{data.storage}</TableCell>
                        <TableCell>{data.switch}</TableCell>
                        <TableCell>
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
                        </TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>
    )
}
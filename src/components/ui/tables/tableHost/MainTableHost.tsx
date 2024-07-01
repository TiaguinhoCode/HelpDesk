"use client";

// Biblioteca
import { User } from "@nextui-org/user";
import { Tooltip } from "@nextui-org/tooltip";
import { FaRegEye, FaSync } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import { TbTrash } from "react-icons/tb";
import { Button } from "@nextui-org/button";
import { CiSearch } from "react-icons/ci";
import { Input } from "@nextui-org/input";

// Mascara
import { truncateString } from "@/app/utils/mask/stringMask";

// React
import React, { ReactNode, useMemo, useState } from "react";

// Recoil
import { DropDownTable, hiddenColumn } from "../../dropDown/DropDownTable";

// Services
import { setupClientAxios } from "@/services/apiClient";

// Dados
import { columns } from "@/data/TableColumns/ColummnsHost";

// Componentes
import { MainTable } from "../MainTable";
import Loading from "../../loading/loading";

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

interface TableProps {
    data: ItemHost[];
    token: string;
    children: ReactNode
}

export function MainTableHost({ data, token, children }: TableProps) {
    const [hosts, setHosts] = useState(data || [])
    const [loading, setLoading] = useState<boolean>(false)
    const [search, setSearch] = useState<string>('')

    const api = setupClientAxios(token)

    const listHosts = useMemo(() => {
        return hosts.filter(host => {
            const query = search.toLowerCase();
            return (
                host.host.toLowerCase().includes(query) ||
                host.processor.toLowerCase().includes(query) ||
                host.ram_memory.toLowerCase().includes(query) ||
                host.storage.toLowerCase().includes(query) ||
                host.system.toLowerCase().includes(query) ||
                host.switch.toLowerCase().includes(query) ||
                host.user.name.toLowerCase().includes(query) ||
                host.user.email.toLowerCase().includes(query) ||
                host.user.department.sector.toLowerCase().includes(query)
            );
        });
    }, [search, hosts]);

    async function refresh() {
        setLoading(true);
        try {
            const resp = await api.get('/host');
            setHosts(resp.data.hosts);
        } catch (err) {
            console.log("Error: ", err);
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <div className="p-4 z-0 flex flex-col relative justify-between gap-4 bg-content1 overflow-auto rounded-large shadow-small w-full">
                <div className="flex w-full">
                    <div className="px-2 w-1/2">
                        <Input
                            isClearable
                            className="w-full"
                            classNames={{ input: "bg-white", inputWrapper: "bg-white border border-blue-400 data-[hover=true]:bg-white group-data-[focus=true]:bg-bg-white" }}
                            placeholder="Pesquise algo"
                            startContent={<CiSearch />}
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            onClear={() => setSearch('')}
                        />
                    </div>
                    <div className="px-2 flex items-end justify-end w-1/2">
                        {children}
                        <Button className="mr-2" onClick={refresh} color="primary" size="sm" radius="md" endContent={<FaSync />}>Recarregar</Button>
                        <DropDownTable data={columns} />
                    </div>
                </div>
                {loading ? <Loading></Loading> : <MainTable collumns={columns} data={listHosts} renderCell={renderCell} />}
            </div>
        </>
    )
}

const renderCell = (item: ItemHost, columnKey: string, onOpen: () => void) => {
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
                        <button onClick={onOpen} className="text-lg text-danger cursor-pointer active:opacity-50">
                            <TbTrash />
                        </button>
                    </Tooltip>
                </div>
            );
        case "switch":
            return item.switch;

        default:
            return null;
    }
};

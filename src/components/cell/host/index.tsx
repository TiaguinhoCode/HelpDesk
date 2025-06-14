'use client'

// Biblioteca
import { User, Tooltip } from "@nextui-org/react";
import { FaPencil, FaRegEye } from "react-icons/fa6";
import { TbTrash } from "react-icons/tb";

// Utils
import { truncateString } from "@/utils/mask/strinkMask";

// Tipagem
import { Host } from "@/types/host";

type RendererFunction = (item: Host, onOpen?: (value: string) => void) => React.ReactNode;

type Renderers = {
    [key: string]: RendererFunction;
}

const renderers: Renderers = {
    user: (item: Host) => (
        <User
            avatarProps={{ radius: "lg", src: item.user.photo ? item.user.photo : '' }}
            description={truncateString(item.user.email, 12)}
            name={item.user.name}
        >
            {truncateString(item.user.email, 10)}
        </User>
    ),
    departamento: (item: Host) => item.user.department.sector,
    host: (item: Host) => item.host,
    processador: (item: Host) => truncateString(item.processor, 15),
    memoriaRam: (item: Host) => item.ram_memory,
    hdd: (item: Host) => (item.hdd ? 'sim' : 'não'),
    sdd: (item: Host) => (item.sdd ? 'sim' : 'não'),
    armazenamento: (item: Host) => item.storage,
    switch: (item: Host) => item.switch,
    acoes: (item: Host, onOpen?: (value: string) => void) => (
        <div className="relative flex items-center gap-2">
            <Tooltip content="Detalhe">
                <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                    <FaRegEye />
                </span>
            </Tooltip>
            <Tooltip content="Editar">
                <button className="text-lg text-default-400 cursor-pointer active:opacity-50">
                    <FaPencil />
                </button>
            </Tooltip>
            <Tooltip color="danger" content="Excluir máquina">
                <button onClick={() => onOpen && onOpen(item.id)} className="text-lg text-danger cursor-pointer active:opacity-50">
                    <TbTrash />
                </button>
            </Tooltip>
        </div>
    ),
};

export const renderCell = (
    item: Host,
    columnKey: string,
    onOpen?: (value: string) => void,
) => {
    const renderFunction = renderers[columnKey];

    if (renderFunction) {
        return renderFunction(item, onOpen);
    }
    return null; // ou algum fallback padrão
};


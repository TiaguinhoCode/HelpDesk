// Bilioteca
import { Tooltip, User } from "@nextui-org/react";
import { FaPencil, FaRegEye } from "react-icons/fa6";
import { TbTrash } from "react-icons/tb";

// Utils
import { truncateString } from "@/utils/mask/strinkMask";

// Tipagem
import { Host } from "@/types/host";

export const renderCell = (item: Host, columnKey: string) => {
    switch (columnKey) {
        case "user":
            return (
                <User
                    avatarProps={{ radius: "lg", src: item.user.photo ? item.user.photo : '' }}
                    description={truncateString(item.user.email, 12)}
                    name={item.user.name}
                >
                    {truncateString(item.user.email, 10)}
                </User>
            );
        case "departamento":
            return item.user.department.sector;
        case "host":
            return item.host;
        case "processador":
            return truncateString(item.processor, 15);
        case "memoriaRam":
            return item.ram_memory;
        case "hdd":
            return item.hdd ? 'sim' : 'não';
        case "sdd":
            return item.sdd ? 'sim' : 'não';
        case "armazenamento":
            return item.storage;
        case "switch":
            return item.switch;
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
                        <button className="text-lg text-danger cursor-pointer active:opacity-50">
                            <TbTrash />
                        </button>
                    </Tooltip>
                </div>
            );
    }
}
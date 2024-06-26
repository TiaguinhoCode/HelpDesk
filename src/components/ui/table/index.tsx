"use client";

// Biblioteca
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/table";

// Mascara
import { truncateString } from "@/app/utils/mask/stringMask";
import { User } from "@nextui-org/user";

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
    data: ItemHost[]
}

export function TableMain({ data }: TableProps) {
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
                    </TableRow>
                )}
            </TableBody>
        </Table>
    )
}
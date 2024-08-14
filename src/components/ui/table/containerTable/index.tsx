'use client'

// Next Framework - Servidor
import { useRouter, useSearchParams } from "next/navigation"

// Dados
import { columns } from "@/data/collumns/Host"

// Componentes
import { DataGrid } from ".."
import { renderCell } from "@/components/cell/host"
import { TableToolBar } from "../tableToolbar"
import { Modal } from "../../modal"
import { CreateHost } from "@/components/forms/host/CreateHost"
import { WarningRemove } from "../../warnings/warningRemove"

// React
import { useMemo, useState } from "react"

// Biblioteca
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, useDisclosure } from '@nextui-org/react';
import { useSession } from "next-auth/react"

// Tipagem
import { Host } from "@/types/host"
interface ContainerTableProps<T extends Host> {
    data: T[];
    filterFunction: (props: { data: T[]; search: string }) => T[];
    url: string;
    dataKey: string;
}

export function ContainerTable<T extends Host>({ data, filterFunction, url, dataKey }: ContainerTableProps<T>) {
    const [tableData, setTableData] = useState(data || [])
    const [searchParams, setSearchParams] = useState<string>('');
    const [remove, setRemove] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)

    const { isOpen, onOpen, onClose } = useDisclosure();
    const router = useRouter()
    // const { data: session } = useSession();

    // const searchTable = useMemo(() => filterFunction({ data: tableData, search: searchParams }), [searchParams, tableData, filterFunction]);

    const handleDetail = (id: string) => {
        const params = new URLSearchParams(window.location.search);
        params.set("id", id);

        // Atualiza a URL, permanecendo na mesma página
        router.replace(`/host?${params.toString()}`);
    };

    async function fetchData() {
        //     setLoading(true);

        //     try {
        //         const response = await fetch(`https://helpdeskapi.vercel.app${url}`, {
        //             method: "GET",
        //             headers: {
        //                 Authorization: `Bearer ${session?.user.token}`,
        //             }
        //         });
        //         const result = await response.json();

        //         if (result[dataKey]) {
        //             setTableData(result[dataKey]);
        //         } else {
        //             console.error("Estrutura de dados inesperada:", result);
        //             setTableData([]); // ou qualquer fallback apropriado
        //         }
        //     } catch (err) {
        //         console.error("Erro ao buscar dados:", err);
        //     } finally {
        //         setLoading(false);
        //     }

    }



    return (
        <>
            <Modal children={remove ? <WarningRemove /> : <CreateHost refresh={fetchData} />} isOpen={isOpen} onClose={onClose} footer={remove ? true : false} title={remove ? "Excluir Host" : "Adicionar Host"} position={remove ? "auto" : "top"} actionDescription="Excluir" />
            <TableToolBar onOpen={onOpen} data={tableData} searchParams={searchParams} setSearchParams={setSearchParams} handleRefresh={fetchData} disbleRemove={setRemove} />
            <div className="w-full overflow-hidden max-h-[380px] min-h-[350px] flex rounded-xl p-3 bg-white">
                <DataGrid columns={columns} data={tableData} renderCell={renderCell} loading={loading} openRemove={setRemove} onOpen={onOpen} />
            </div>
        </>
    )
}
'use client'

// Dados
import { columns } from "@/data/collumns/Host"

// Componentes
import { DataGrid } from ".."
import { renderCell } from "@/components/cell/host"
import { TableToolBar } from "../tableToolbar"
import { Modal } from "../../modal"
import { CreateHost } from "@/components/forms/host/CreateHost"

// React
import { useMemo, useState } from "react"

// Biblioteca
import { useDisclosure } from "@nextui-org/react"

// Tipagem
import { Host } from "@/types/host"
interface ContainerTableProps<T extends Host> {
    data: T[];
    filterFunction: (props: { data: T[]; search: string }) => T[];
}

export function ContainerTable<T extends Host>({ data, filterFunction }: ContainerTableProps<T>) {
    const [tableData, setTableData] = useState(data || [])
    const [searchParams, setSearchParams] = useState<string>('')

    const { isOpen, onOpen, onClose } = useDisclosure();

    const searchTable = useMemo(() => filterFunction({ data: tableData, search: searchParams }), [searchParams, tableData, filterFunction]);

    return (
        <>
            <Modal children={<CreateHost />} isOpen={isOpen} onClose={onClose} footer={false} />
            <TableToolBar onOpen={onOpen} data={tableData} searchParams={searchParams} setSearchParams={setSearchParams} />
            <div className="w-full overflow-hidden max-h-[380px] min-h-[350px] flex rounded-xl p-3 bg-white">
                <DataGrid columns={columns} data={searchTable} renderCell={renderCell} />
            </div>
        </>
    )
}
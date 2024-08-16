'use client'

// Next Framework - Servidor
import { useRouter, useSearchParams } from "next/navigation"
import { useSession } from "next-auth/react"

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

// Utils
import { fetchData } from "@/utils/refresh/handleRefresh"
import { removeData } from "@/utils/removeData/handleRemove"

// Tipagem
import { Host } from "@/types/host"
import { useDisclosure } from "@nextui-org/react"
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
    const { data: session } = useSession();

    const searchTable = useMemo(() => filterFunction({ data: tableData, search: searchParams }), [searchParams, tableData, filterFunction]);
    const refresh = fetchData({ url, token: session?.user.token, dataKey, setData: setTableData, setLoading })
    const { openTakeDownNotice, handleDeleteData } = removeData({ setRemove, onClose, refresh, token: session?.user.token, url: '/delete/host?id=' })

    return (
        <>
            <Modal children={remove ? <WarningRemove /> : <CreateHost refresh={refresh} />} isOpen={isOpen} onClose={onClose} footer={remove ? true : false} title={remove ? "Excluir Host" : "Adicionar Host"} position={remove ? "auto" : "top"} actionDescription="Excluir" handleDeleteData={handleDeleteData}/>
            <TableToolBar onOpen={onOpen} data={tableData} searchParams={searchParams} setSearchParams={setSearchParams} handleRefresh={refresh} disbleRemove={setRemove} />
            <div className="w-full overflow-hidden max-h-[380px] min-h-[350px] flex rounded-xl p-3 bg-white">
                <DataGrid columns={columns} data={searchTable} renderCell={renderCell} loading={loading} openRemove={openTakeDownNotice} onOpen={onOpen} />
            </div>
        </>
    )
}
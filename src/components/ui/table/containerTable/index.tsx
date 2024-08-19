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
import { FormModalRenderer } from "../../modal/forms/ContainerModalForms"

// React
import { useMemo, useState } from "react"

// Utils
import { fetchData } from "@/utils/refresh/handleRefresh"
import { removeData } from "@/utils/removeData/handleRemove"

// Tipagem
import { Host } from "@/types/host"
import { useDisclosure } from "@nextui-org/react"
interface ContainerTableProps<T> {
    data: T[];
    filterFunction: (props: { data: T[]; search: string }) => T[];
    urlGet: string;
    dataKey: string;
}

export function ContainerTable<T extends Host>({ data, filterFunction, urlGet, dataKey }: ContainerTableProps<T>) {
    const [tableData, setTableData] = useState(data || [])
    const [searchParams, setSearchParams] = useState<string>('');
    const [modalType, setModalType] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)

    const { isOpen, onOpen, onClose } = useDisclosure();
    const { data: session } = useSession();

    const searchTable = useMemo(() => filterFunction({ data: tableData, search: searchParams }), [searchParams, tableData, filterFunction]);
    const refresh = fetchData({ url: urlGet, token: session?.user.token, dataKey, setData: setTableData, setLoading })
    const { openTakeDownNotice, handleDeleteData } = removeData({ setModalType, onClose, refresh, token: session?.user.token, url: '/delete/host?id=' })

    return (
        <>
            <FormModalRenderer modalType={modalType} isOpen={isOpen} onClose={onClose} refresh={refresh} handleDeleteData={handleDeleteData} />
            <TableToolBar onOpen={onOpen} data={tableData} searchParams={searchParams} setSearchParams={setSearchParams} handleRefresh={refresh} setModalType={setModalType} />
            <div className="w-full overflow-hidden max-h-[380px] min-h-[350px] flex rounded-xl p-3 bg-white">
                <DataGrid columns={columns} data={searchTable} renderCell={renderCell} loading={loading} openRemove={openTakeDownNotice} onOpen={onOpen} />
            </div>
        </>
    )
}
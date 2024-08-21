'use client'

// Next Framework - Servidor
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
import { InfiniteScroll } from "@/utils/InfiniteScroll"
import { editData } from "@/utils/editData/handleEdit"

// Tipagem
import { Host } from "@/types/host"
import { useDisclosure } from "@nextui-org/react"
interface ContainerTableProps<T> {
    data: T[];
    urlGet: string;
    urlRemove?: string;
    urlDetail?: string;
    dataKey: string;
    filterFunction: (props: { data: T[]; search: string }) => T[];
}

export function ContainerTable<T extends Host>({ data, urlGet, urlRemove, urlDetail, dataKey, filterFunction }: ContainerTableProps<T>) {
    const [tableData, setTableData] = useState(data || [])
    const [searchParams, setSearchParams] = useState<string>('');
    const [modalType, setModalType] = useState<string>('')
    const [limit, setLimit] = useState<number>(10)
    const [loading, setLoading] = useState<boolean>(false)

    const { isOpen, onOpen, onClose } = useDisclosure();
    const { data: session } = useSession();

    const searchTable = useMemo(() => filterFunction({ data: tableData, search: searchParams }), [searchParams, tableData, filterFunction]);
    const refresh = fetchData({ url: urlGet, token: session?.user.token, dataKey, setData: setTableData, setLoading })
    const { openTakeDownNotice, handleDeleteData } = removeData({ setModalType, onClose, refresh, token: session?.user.token, url: urlRemove })
    const { openFormEdition, id } = editData({ setModalType })

    const fetchMore = () => {
        if (limit < tableData.length) {
            setLimit(limit + 10);
        }
    };

    return (
        <>
            <FormModalRenderer modalType={modalType} isOpen={isOpen} onClose={onClose} refresh={refresh} handleDeleteData={handleDeleteData} urlDetail={urlDetail+id}/>
            <TableToolBar onOpen={onOpen} data={tableData} searchParams={searchParams} setSearchParams={setSearchParams} handleRefresh={refresh} setModalType={setModalType} limit={limit} setLimit={setLimit} />
            <div className="w-full overflow-hidden max-h-[380px] min-h-[350px] flex rounded-xl p-3 bg-white">
                <DataGrid columns={columns} data={searchTable.slice(0, limit)} renderCell={renderCell} loading={loading} openRemove={openTakeDownNotice} onOpen={onOpen} openEdit={openFormEdition} />
                <InfiniteScroll fetchMore={fetchMore} />
            </div>
        </>
    )
}
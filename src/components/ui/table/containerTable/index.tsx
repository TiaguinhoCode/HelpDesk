'use client'

// Next Framework - Servidor
import { useSession } from "next-auth/react"

// Dados
import { columns } from "@/data/collumns/Host"

// Componentes
import { DataGrid } from ".."
import { Modal } from "../../modal"
import { TableToolBar } from "../tableToolbar"
import { WarningRemove } from "../../warnings/warningRemove"

// React
import { useMemo, useState } from "react"

// Utils
import { fetchData } from "@/utils/refresh/handleRefresh"
import { removeData } from "@/utils/removeData/handleRemove"
import { InfiniteScroll } from "@/utils/InfiniteScroll"
import { useDisclosure } from "@nextui-org/react"

// Tipagem
import { Host } from "@/types/host"
interface ContainerTableProps<T> {
    data: T[];
    urlGet: string;
    urlRemove?: string;
    dataKey: string;
    isRemove: boolean;
    filterFunction: (props: { data: T[]; search: string }) => T[];
    renderCell: (item: T, columnUid: string) => React.ReactNode;
}

export function ContainerTable<T extends Host>({ data, urlGet, urlRemove, dataKey, isRemove, filterFunction, renderCell }: ContainerTableProps<T>) {
    const [tableData, setTableData] = useState(data || [])
    const [searchParams, setSearchParams] = useState<string>('');
    const [limit, setLimit] = useState<number>(10)
    const [loading, setLoading] = useState<boolean>(false)

    const { data: session } = useSession();
    const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

    const searchTable = useMemo(() => filterFunction({ data: tableData, search: searchParams }), [searchParams, tableData, filterFunction]);
    const refresh = fetchData({ url: urlGet, token: session?.user.token, dataKey, setData: setTableData, setLoading })
    const { openTakeDownNotice, handleDeleteData } = removeData({ onClose, onOpen, url: urlRemove, token: session?.user.token, refresh })

    const fetchMore = () => {
        if (limit < tableData.length) {
            setLimit(limit + 10);
        }
    };

    return (
        <>
            {isRemove && <Modal children={<WarningRemove />} footer={true} position="top" isOpen={isOpen} onClose={onClose} title="Remover Máquina" actionDescription="Deletar" handleDeleteData={handleDeleteData} />}
            <TableToolBar data={tableData} searchParams={searchParams} setSearchParams={setSearchParams} handleRefresh={refresh} limit={limit} setLimit={setLimit} />
            <div className="w-full overflow-hidden max-h-[380px] min-h-[350px] flex rounded-xl p-3 bg-white">
                <DataGrid columns={columns} data={searchTable.slice(0, limit)} renderCell={renderCell} loading={loading} onOpen={isRemove ? openTakeDownNotice : undefined} />
                <InfiniteScroll fetchMore={fetchMore} />
            </div>
        </>
    )
}
'use client'

// Next Framework - Servidor
import { useSession } from "next-auth/react"

// Dados
import { columns } from "@/data/collumns/Host"

// Componentes
import { DataGrid } from ".."
import { renderCell } from "@/components/cell/host"
import { TableToolBar } from "../tableToolbar"

// React
import { useMemo, useState } from "react"

// Utils
import { fetchData } from "@/utils/refresh/handleRefresh"
import { InfiniteScroll } from "@/utils/InfiniteScroll"

// Tipagem
import { Host } from "@/types/host"
interface ContainerTableProps<T> {
    data: T[];
    urlGet: string;
    dataKey: string;
    filterFunction: (props: { data: T[]; search: string }) => T[];
    renderCell: (item: T, columnUid: string) => React.ReactNode;
}

export function ContainerTable<T extends Host>({ data, urlGet, dataKey, filterFunction, renderCell }: ContainerTableProps<T>) {
    const [tableData, setTableData] = useState(data || [])
    const [searchParams, setSearchParams] = useState<string>('');
    const [limit, setLimit] = useState<number>(10)
    const [loading, setLoading] = useState<boolean>(false)

    const { data: session } = useSession();

    const searchTable = useMemo(() => filterFunction({ data: tableData, search: searchParams }), [searchParams, tableData, filterFunction]);
    const refresh = fetchData({ url: urlGet, token: session?.user.token, dataKey, setData: setTableData, setLoading })

    const fetchMore = () => {
        if (limit < tableData.length) {
            setLimit(limit + 10);
        }
    };

    return (
        <>  
            <TableToolBar data={tableData} searchParams={searchParams} setSearchParams={setSearchParams} handleRefresh={refresh} limit={limit} setLimit={setLimit} />
            <div className="w-full overflow-hidden max-h-[380px] min-h-[350px] flex rounded-xl p-3 bg-white">
                <DataGrid columns={columns} data={searchTable.slice(0, limit)} renderCell={renderCell} loading={loading} />
                <InfiniteScroll fetchMore={fetchMore} />
            </div>
        </>
    )
}
// Biblioteca
import { Table, TableBody, TableColumn, TableHeader, TableRow, TableCell } from "@nextui-org/react";

// Componentes
import { Loading } from "../loading";

// Tipagem
interface DataGridProps<T> {
    columns: { name: string, uid: string }[];
    data: T[];
    renderCell: (item: T, columnUid: string, openRemove?: (value: boolean) => void, onOpen?: () => void) => React.ReactNode;
    loading: boolean;
    openRemove?: (value: boolean) => void;
    onOpen?: () => void;
}

export function DataGrid<T>({ columns, data, renderCell, loading, openRemove, onOpen }: DataGridProps<T>) {
    if (loading) {
        return <Loading />;
    }

    return (
        <Table isHeaderSticky isStriped classNames={{ base: "overflow-auto", table: "", th: 'bg-blue-500 font-bold text-white', td: 'text-xs' }} aria-label="Example empty table">
            <TableHeader columns={columns}>
                {(column) => <TableColumn key={column.uid}>{column.name}</TableColumn>}
            </TableHeader>
            <TableBody items={data} emptyContent={"No rows to display."}>
                {(item) => (
                    <TableRow key={(item as any).id}>
                        {columns.map((column) => (
                            <TableCell key={column.uid}>
                                {renderCell(item, column.uid, openRemove, onOpen)}
                            </TableCell>
                        ))}
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
}

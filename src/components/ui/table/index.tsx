// Biblioteca
import { Table, TableBody, TableColumn, TableHeader, TableRow, TableCell } from "@nextui-org/react";

// Componentes
import { Loading } from "../loading";

// Tipagem
interface DataGridProps<T> {
    columns: { name: string, uid: string }[];
    data: T[];
    loading: boolean;
    onOpen?: () => void;
    renderCell: (item: T, columnUid: string, openRemove?: (value: string, id: string) => void, onOpen?: () => void, openEdit?: (value: string, id: string) => void) => React.ReactNode;
    openRemove?: (value: string, id: string) => void;
    openEdit?: (value: string, id: string) => void,
}

export function DataGrid<T>({ columns, data, loading, onOpen, renderCell, openRemove, openEdit }: DataGridProps<T>) {

    if (loading) {
        return <Loading />;
    }

    return (
        <Table
            isHeaderSticky
            isStriped
            classNames={{ base: "overflow-auto", table: "", th: 'bg-blue-500 font-bold text-white', td: 'text-xs' }}
            aria-label="Example empty table"
        >
            <TableHeader columns={columns}>
                {(column) => <TableColumn key={column.uid}>{column.name}</TableColumn>}
            </TableHeader>
            <TableBody items={data} emptyContent={"Nenhum dado foi encontrado. :("}>
                {(item) => (
                    <TableRow key={(item as any).id}>
                        {columns.map((column) => (
                            <TableCell key={column.uid}>
                                {renderCell(item, column.uid, openRemove, onOpen, openEdit)}
                            </TableCell>
                        ))}
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
}


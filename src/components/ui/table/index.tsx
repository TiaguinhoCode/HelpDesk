// Biblioteca
import { Table, TableBody, TableColumn, TableHeader, TableRow, TableCell } from "@nextui-org/react";

// Componentes
import { Loading } from "../loading";

// Tipagem
interface DataGridProps<T> {
    columns: { name: string, uid: string }[];
    data: T[];
    loading: boolean;
    onOpen?: (value: string) => void;
    renderCell: (item: T, columnUid: string, onOpen?: (value: string) => void) => React.ReactNode;
}

export function DataGrid<T>({ columns, data, loading, onOpen, renderCell }: DataGridProps<T>) {
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
                                {renderCell(item, column.uid, onOpen)} 
                            </TableCell>
                        ))}
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
}


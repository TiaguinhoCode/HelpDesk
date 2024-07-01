// Biblioteca
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/table";
import { useRecoilValue } from "recoil";

// Atom
import { hiddenColumn } from "../dropDown/DropDownTable";

// Tipagem
type ItemCollumns = {
    name: string;
    uid: string;
}

interface MainTableProp<T> {
    collumns: ItemCollumns[];
    data: T[];
    renderCell: (item: T, columnUid: string) => React.ReactNode;
}

export function MainTable<T>({ collumns, data, renderCell }: MainTableProp<T>) {
    const hiddenColumns = useRecoilValue(hiddenColumn)

    return (
        <Table removeWrapper isStriped classNames={{ th: "bg-[#2563eb] text-white" }} aria-label="Example empty table">
            <TableHeader>
                {collumns.filter(column => hiddenColumns.includes(column.uid)).map((column) =>
                    <TableColumn key={column.uid}>{column.name}</TableColumn>
                )}
            </TableHeader>
            <TableBody emptyContent={"Nenhum dado foi encontrado :("} items={data}>
                {(item) => (
                    <TableRow key={(item as any).id}>
                        {collumns.filter(column => hiddenColumns.includes(column.uid)).map((column) => (
                            <TableCell key={column.uid}>
                                {renderCell(item, column.uid)}
                            </TableCell>
                        ))}
                    </TableRow>
                )}
            </TableBody>
        </Table>
    )
}
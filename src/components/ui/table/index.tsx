"use client";

// Biblioteca
import { Table, TableBody, TableColumn, TableHeader } from "@nextui-org/table";

export function TableMain() {
    return (
        <Table aria-label="Example empty table">
            <TableHeader>
                <TableColumn>NAME</TableColumn>
                <TableColumn>ROLE</TableColumn>
                <TableColumn>STATUS</TableColumn>
            </TableHeader>
            <TableBody emptyContent={"No rows to display."}>{[]}</TableBody>
        </Table>
    )
}
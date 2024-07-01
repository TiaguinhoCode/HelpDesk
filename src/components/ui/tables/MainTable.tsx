// Biblioteca
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/table";
import { useRecoilValue } from "recoil";
import { Button } from "@nextui-org/button";;
import { IoWarningOutline } from "react-icons/io5";

// Atom
import { hiddenColumn } from "../dropDown/DropDownTable";
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/modal"

// Tipagem
type ItemCollumns = {
    name: string;
    uid: string;
}

interface MainTableProp<T> {
    collumns: ItemCollumns[];
    data: T[];
    renderCell: (item: T, columnUid: string, onOpen: () => void) => React.ReactNode;
}

export function MainTable<T>({ collumns, data, renderCell }: MainTableProp<T>) {
    const hiddenColumns = useRecoilValue(hiddenColumn)

    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    return (
        <>
            <Modal placement="top" isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false} isKeyboardDismissDisabled={true}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex items-center">
                                <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                    <IoWarningOutline className="h-6 w-6 text-red-600" />
                                    
                                </div>
                                <div className="text-center sm:mt-0 sm:ml-4 sm:text-left">
                                <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-headline"> Tem certeza? </h3>
                                </div>
                            </ModalHeader>
                            <ModalBody>
                            <div className="">
                  <p className="text-sm text-gray-500"> Are you sure you want to delete <span className="font-bold">Sample Item</span>? This action cannot be undone. </p>
                </div>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Close
                                </Button>
                                <Button color="primary" onPress={onClose}>
                                    Action
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
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
                                    {renderCell(item, column.uid, onOpen)}
                                </TableCell>
                            ))}
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </>
    )
}
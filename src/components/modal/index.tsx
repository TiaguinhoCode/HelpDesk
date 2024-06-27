"use client";

// Bilioteca
import { Button } from "@nextui-org/button";
import { Modal, ModalContent, ModalHeader } from "@nextui-org/modal";
import { useDisclosure } from "@nextui-org/modal";
import { FiPlus } from "react-icons/fi";

// React
import { ReactNode } from "react";

// Componentes 

// Tipagem
type ButtonElementType = typeof Button

type ModalFormProp = React.ComponentProps<ButtonElementType> & {
    children: ReactNode;
    descriptionBtn: string
    descriptionHeader: string
}

export function ModalForm({ children, descriptionBtn, descriptionHeader, ...rest }: ModalFormProp) {

    const { isOpen, onOpen, onOpenChange } = useDisclosure()

    return (
        <>
            <Button onPress={onOpen} color="primary" size="sm" radius="md" className="p-2 mr-2" {...rest} /*startContent={<FiPlus className="text-white text-lg" />}*/ >{descriptionBtn}</Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
                <ModalContent>
                    {(onclose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">{descriptionHeader}</ModalHeader>
                            {children}
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}
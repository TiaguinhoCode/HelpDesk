"use client";

// Bilioteca
import { Button } from "@nextui-org/button";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@nextui-org/modal";
import { useDisclosure } from "@nextui-org/modal";
import { useState } from "react";
import { FiPlus } from "react-icons/fi";
import { InputForm } from "../ui/input";

export function ModalForm() {
    const [error, setError] = useState(false)

    const { isOpen, onOpen, onOpenChange } = useDisclosure()

    return (
        <>
            <Button onPress={onOpen} color="primary" size="sm" radius="md" className="p-2 mr-2" startContent={<FiPlus className="text-white text-lg" />}>Add Computador</Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
                <ModalContent>
                    {(onclose) => (
                        <>
                            <form>
                                <ModalHeader className="flex flex-col gap-1">Adicionar Computador</ModalHeader>
                                <InputForm error={error} radius="lg" type="email" color={error ? 'danger' : 'default'} variant="flat" label="Nome Host*" size='sm' /*value={email} onChange={(e) => setEmail(e.target.value)}*/ />
                            </form>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}
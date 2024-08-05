// Bibliotecas
import { Button, Modal as NextUIModal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/react";

// React
import { ReactNode } from "react";

// Tipagem
interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
    actionDescription?: string;
    footer: boolean;
}

export function Modal({ isOpen, onClose, children, actionDescription, footer }: ModalProps) {
    return (
        <NextUIModal scrollBehavior="inside" isOpen={isOpen} onOpenChange={onClose}>
            <ModalContent>
                <ModalHeader className="flex flex-col gap-1">
                    Adicionar Máquinas
                </ModalHeader>
                <ModalBody>
                    {children}
                </ModalBody>
                {footer &&
                    <ModalFooter>
                        <Button color="danger" variant="light" onPress={onClose}>
                            Fechar
                        </Button>
                        <Button color="primary" type="submit">
                            {actionDescription}
                        </Button>
                    </ModalFooter>
                }
            </ModalContent>
        </NextUIModal>
    )
}
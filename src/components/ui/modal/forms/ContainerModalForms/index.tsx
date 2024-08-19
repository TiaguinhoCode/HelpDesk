// Componentes
import { CreateHost } from "@/components/forms/host/CreateHost";
import { Modal } from "../..";
import { WarningRemove } from "@/components/ui/warnings/warningRemove";

// Tipagem
interface FormModalRendererProps {
    modalType?: 'createHost' | 'removeHOost' | string;
    isOpen: boolean;
    onClose: () => void;
    refresh: () => void;
    handleDeleteData?: () => void
}

export function FormModalRenderer({ modalType, isOpen, onClose, refresh, handleDeleteData }: FormModalRendererProps) {
    let content = null

    switch (modalType) {
        case 'createHost':
            content = <Modal children={<CreateHost refresh={refresh} />} isOpen={isOpen} onClose={onClose} footer={false} title="Adicionar Host" position="auto" />;
            break;
        case 'removeHost':
            content = <Modal children={<WarningRemove />} isOpen={isOpen} onClose={onClose} footer={true} title="Excluir Host" position="top" actionDescription="Excluir" handleDeleteData={handleDeleteData} />
    }

    return content
}
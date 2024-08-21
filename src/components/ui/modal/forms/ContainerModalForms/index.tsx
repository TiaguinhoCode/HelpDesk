// Componentes
import { CreateHost } from "@/components/forms/host/CreateHost";
import { Modal } from "../..";
import { WarningRemove } from "@/components/ui/warnings/warningRemove";
import { EditHost } from "@/components/forms/host/EditHost";

// Framework - Servidor
import { getData } from "@/services/server/FetchApi";

// Tipagem
interface FormModalRendererProps {
    modalType?: 'createHost' | 'removeHOost' | string;
    urlDetail?: string;
    isOpen: boolean;
    onClose: () => void;
    refresh: () => void;
    handleDeleteData?: () => void;
}

export function FormModalRenderer({ modalType, urlDetail, isOpen, onClose, refresh, handleDeleteData }: FormModalRendererProps) {
    let content = null

    async function data() {
        if (urlDetail) {
            return await getData(urlDetail, 'GET', 0);
        }
        return null; // ou outra ação, caso urlDetail seja undefined
    }

console.log("Dados: ", data.host)

    switch (modalType) {
        case 'createHost':
            content = <Modal children={<CreateHost refresh={refresh} />} isOpen={isOpen} onClose={onClose} footer={false} title="Adicionar Host" position="auto" />;
            break;
        case 'removeHost':
            content = <Modal children={<WarningRemove />} isOpen={isOpen} onClose={onClose} footer={true} title="Excluir Host" position="top" actionDescription="Excluir" handleDeleteData={handleDeleteData} />
            break;
        case 'editHost':
            content = <Modal children={<EditHost />} isOpen={isOpen} onClose={onClose} footer={false} title="Editar Host" position="auto" />
            break;
    }

    return content
}
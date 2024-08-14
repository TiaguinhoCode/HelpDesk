// Biblioteca
import { FaTrashAlt } from "react-icons/fa";

export function WarningRemove() {
    return (
        <div className="text-center p-5 flex-auto justify-center">
            <FaTrashAlt className="w-20 h-20 -m-1 flex items-center text-red-500 mx-auto" />
            <h2 className="text-xl font-bold py-4">Tem certeza?</h2>
            <p className="text-sm text-gray-500 px-8">Você realmente deseja excluir essa Máquina?
                Este processo não pode ser desfeito</p>
        </div>
    )
}
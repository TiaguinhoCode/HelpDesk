// Componentes
import { Btn } from "../../button";
import { InputForm } from "../../input";

// Bibliotecas
import { IoSearchOutline } from "react-icons/io5";
import { FaPlus } from "react-icons/fa6";
import { FaSync } from "react-icons/fa";

// Tipagem
interface TableToolBarProps<T> {
    data: T[];
    searchParams: string;
    setSearchParams: (value: string) => void;
    onOpen: () => void;
    handleRefresh: () => void;
    setModalType: (value: string) => void
}

export function TableToolBar<T>({ data, searchParams, setSearchParams, onOpen, handleRefresh, setModalType }: TableToolBarProps<T>) {
    return (
        <div className="w-full mb-3 rounded-xl p-3 bg-white flex flex-col space-y-4">
            <div className="w-full flex flex-col sm:flex-row sm:justify-between space-y-4 sm:space-y-0">
                <InputForm
                    className="w-full sm:max-w-[35%]"
                    placeholder="Digite algo"
                    isPassoword={false}
                    startContent={<IoSearchOutline />}
                    value={searchParams}
                    onChange={(e) => setSearchParams(e.target.value)}
                    onClear={() => setSearchParams('')}
                />
                <div className="w-full sm:w-auto flex justify-end">
                    <Btn onClick={() => { onOpen(); setModalType('createHost') }} description="Add Máquinas" endContent={<FaPlus size={15} />} className="ml-3 text-sm" />
                    <Btn onClick={handleRefresh} description="Atualizar" endContent={<FaSync size={15} />} className="ml-3 text-sm" />
                </div>
            </div>

            <div className="flex justify-between items-center py-3">
                <span className="text-default-400 text-small">Total {data.length} Máquinas</span>
                <label className="flex items-center text-default-400 text-small">
                    Linhas por página:
                    <select className="bg-transparent outline-none text-default-400 text-small">
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="15">15</option>
                    </select>
                </label>
            </div>
        </div>
    )
}
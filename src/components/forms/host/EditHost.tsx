// Componentes
import { InputForm } from "@/components/ui/input";
import { Options } from "@/components/ui/select";

// React
import { useState } from "react";

// Tipagem
import { User } from "@/types/user";

// Dados
import { options } from "@/data/boolean";

// Tipagem
interface EditHostProps {
}

export function EditHost({  }: EditHostProps) {
    const [users, setUsers] = useState<User[]>([]);
    const [machineName, setMachineName] = useState<string>('')
    const [processor, setProcessor] = useState<string>('')
    const [ramMemory, setRamMemory] = useState<string>('')
    const [hdd, setHdd] = useState<string>('')
    const [ssd, setSsd] = useState<string>('')
    const [storage, setStorage] = useState<string>('')
    const [system, setSystem] = useState<string>('')
    const [switchNetwork, setSwitchNetwork] = useState<string>('')
    const [userId, setUserId] = useState<string>('')
    const [isInvalid, setIsInvalid] = useState<boolean>(false)

    return (
        <form /*onSubmit={handleCreateHost}*/>
            <InputForm value={machineName} onChange={(e) => setMachineName(e.target.value)} isInvalid={isInvalid} type="text" className="pb-2" label="Nome do computador: " isPassoword={false} placeholder="EMP-SETOR-001" />
            <InputForm value={processor} onChange={(e) => setProcessor(e.target.value)} isInvalid={isInvalid} type="text" className="pb-2 py-2" label="Nome do processador: " isPassoword={false} placeholder="Nome do processor Colock" />
            <InputForm value={ramMemory} onChange={(e) => setRamMemory(e.target.value)} isInvalid={isInvalid} type="text" className="py-2" label="Memória  ram: " isPassoword={false} placeholder="16GB" />
            <div className="w-full py-1 flex space-x-2">
                <div className="w-1/2">
                    <Options isInvalid={isInvalid} data={options} value={hdd} setValue={setHdd} dataKey="value" description="Tem HD?" />
                </div>
                <div className="w-1/2">
                    <Options isInvalid={isInvalid} value={ssd} setValue={setSsd} data={options} dataKey="value" description="Tem SSD?" />
                </div>
            </div>
        </form>
    )
}
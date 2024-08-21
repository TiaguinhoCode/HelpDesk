'use client'

// Componentes
import { InputForm } from "@/components/ui/input";
import { Options } from "@/components/ui/select";
import { Btn } from "@/components/ui/button";

// Biblioteca
import { toast } from "react-toastify";

// React
import { SyntheticEvent, useState } from "react";

// Dados
import { options } from "@/data/boolean";
import { getData } from "@/services/client/FetchApi";

// Utils
import { createHost } from "@/utils/functions/formCreateHost";
import { ConvertStringToBoolean } from "@/utils/converting/convertStringToBoolean";

// Tipagem
import { User } from "@/types/user";
import { HostData } from "@/types/host";

export function CreateHost({ refresh }: { refresh: () => void }) {
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
    const [loading, setLoading] = useState<boolean>(false);

    getData<User>(setUsers, "/users", "users");

    async function handleCreateHost(e: SyntheticEvent) {
        e.preventDefault()

        setLoading(true);

        const data: HostData = {
            host: machineName,
            processor: processor,
            ram_memory: ramMemory,
            hdd: ConvertStringToBoolean(hdd),
            sdd: ConvertStringToBoolean(ssd),
            storage: storage,
            system: system,
            switchRede: switchNetwork,  
            user_id: userId,
        };
        
        const response = await createHost(data);

        if (response?.error === true) {
            toast.error(response.message);
            setIsInvalid(response.error);
        } else {
            toast.success(response?.message);
            setIsInvalid(response?.error);
            setMachineName('')
            setProcessor('')
            setRamMemory('')
            setHdd('')
            setSsd('')
            setStorage('')
            setStorage('')
            setSystem('')
            setSwitchNetwork('')
            setUserId('')

            await refresh()
        }

        setLoading(false);
    }

    return (
        <>
            <form onSubmit={handleCreateHost}>
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
                <InputForm value={storage} onChange={(e) => setStorage(e.target.value)} isInvalid={isInvalid} type="text" className="py-2" label="Armazenamento: " isPassoword={false} placeholder="250GB" />
                <InputForm value={system} onChange={(e) => setSystem(e.target.value)} isInvalid={isInvalid} type="text" className="py-2" label="Sistema Operacional: " isPassoword={false} placeholder="Win 10" />
                <InputForm value={switchNetwork} onChange={(e) => setSwitchNetwork(e.target.value)} isInvalid={isInvalid} type="text" className="py-2" label="Switch: " isPassoword={false} placeholder="SW-001" />
                <Options value={userId} setValue={setUserId} isInvalid={isInvalid} data={users} dataKey="name" description="Escolha um usuário" />
                <div className="w-full py-5">
                    <Btn isLoading={loading} type="submit" className="w-full" description="Adicionar" />
                </div>
            </form>
        </>
    );
}

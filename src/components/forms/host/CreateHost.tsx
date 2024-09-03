'use client'

// Componentes
import { Options } from "@/components/ui/select";
import { SubMenu } from "@/components/ui/menu/Submenu/host/formCreate";
import { InputForm } from "@/components/ui/input";

// Service - Utils
import { useFetchData } from "@/services/client/FetchApi";
import { ConvertStringToBoolean } from "@/utils/converting/convertStringToBoolean";
import { createHost } from "@/utils/functions/formCreateHost";

// Framework - Next
import { useSession } from "next-auth/react";

// Dados
import { options } from "@/data/boolean";

// React
import { SyntheticEvent, useState } from "react";

// Tipagem
import { User } from "@/types/user";
import { HostData } from "@/types/host";
import { toast } from "react-toastify";
interface CreateHostProps {
    users: User[]
}

export function CreateHost({ users }: CreateHostProps) {
    const [userId, setUserId] = useState<string>('')
    const [machineName, setMachineName] = useState<string>('')
    const [processor, setProcessor] = useState<string>('')
    const [ramMemory, setRamMemory] = useState<string>('')
    const [hdd, setHdd] = useState<string>('')
    const [ssd, setSsd] = useState<string>('')
    const [system, setSystem] = useState<string>('')
    const [storage, setStorage] = useState<string>('')
    const [switchNetwork, setSwitchNetwork] = useState<string>('')
    const [isInvalid, setIsInvalid] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)

    const { data: session } = useSession();
    const { data: user } = useFetchData<User>({
        url: `/detail/user?id=${userId}`,
        token: session?.user.token,
        dataKey: "user"
    });

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

        const resp = await createHost(data)

        if (resp.error === true) {
            toast.error(resp.message)
            setIsInvalid(resp.error);
        } else {
            toast.success(resp?.message);
            setIsInvalid(resp.error);
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
        }

        setLoading(false);
    }

    return (
        <form className="flex w-full" onSubmit={handleCreateHost} >
            <SubMenu data={user} loading={loading} />
            <div className="mx-auto w-full mt-24 max-w-[81%] rounded-xl shadow-lg bg-white">
                <div className="py-6 px-9 flex flex-col" >
                    <div className="w-full flex space-x-2">
                        <div className="mb-5 w-full">
                            <Options value={userId} setValue={setUserId} isInvalid={isInvalid} data={users} dataKey="name" description="Escolha um usuário" />
                        </div>
                        <div className="mb-5 w-full">
                            <InputForm value={machineName} onChange={(e) => setMachineName(e.target.value)} isInvalid={isInvalid} type="text" isPassoword={false} label="Nome da maquina: " placeholder="EMP-SETOR-001" />
                        </div>
                    </div>
                    <div className="w-full flex space-x-2">
                        <div className="mb-5 w-full">
                            <InputForm value={processor} onChange={(e) => setProcessor(e.target.value)} isInvalid={isInvalid} type="text" isPassoword={false} label="Processador: " placeholder="Intel(R) Xeon(R) CPU E5-2620 v3 @ 2.40GHz   2.40 GHz" />
                        </div>
                    </div>
                    <div className="w-full flex space-x-2">
                        <div className="mb-5 w-full">
                            <InputForm value={ramMemory} onChange={(e) => setRamMemory(e.target.value)} isInvalid={isInvalid} type="text" isPassoword={false} label="memória Ram: " placeholder="32 GB" />
                        </div>
                        <div className="mb-5 w-full">
                            <Options value={hdd} setValue={setHdd} isInvalid={isInvalid} data={options} dataKey="value" description="Tem HDD?" />
                        </div>
                        <div className="mb-5 w-full">
                            <Options value={ssd} setValue={setSsd} isInvalid={isInvalid} data={options} dataKey="value" description="Tem SSD?" />
                        </div>
                    </div>
                    <div className="w-full flex space-x-2">
                        <div className="mb-5 w-full">
                            <InputForm value={system} onChange={(e) => setSystem(e.target.value)} isInvalid={isInvalid} type="text" isPassoword={false} label="Sistema operacional: " placeholder="Windows 11 Pro 21H2 22000.795" />
                        </div>
                    </div>
                    <div className="w-full flex space-x-2">
                        <div className="mb-5 w-full">
                            <InputForm value={storage} onChange={(e) => setStorage(e.target.value)} isInvalid={isInvalid} type="text" isPassoword={false} label="Armazenamento: " placeholder="480 GB" />
                        </div>
                        <div className="mb-5 w-full">
                            <InputForm value={switchNetwork} onChange={(e) => setSwitchNetwork(e.target.value)} isInvalid={isInvalid} type="text" isPassoword={false} label="Switch: " placeholder="SW-001" />
                        </div>
                    </div>
                </div>
            </div>
        </form>
    )
}
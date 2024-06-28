"use client";

// React
import { SyntheticEvent, useState } from "react"

// Biblioteca
import { ModalBody, ModalFooter } from "@nextui-org/modal"
import { toast } from "react-toastify";

// Componentes
import { InputForm } from "@/components/ui/input"
import { BtnLoading } from "@/components/ui/button"
import { Select, SelectItem } from "@nextui-org/select";

// Utils
import { api } from '@/services/apiClient';
import { createHost } from "@/services/sendData";


// Tipagem
type ItemsUsers = {
    id: string;
    name: string;
}

interface CreateHost {
    users: ItemsUsers[]
}

export default function CreateHost({ users }: CreateHost) {
    const [hostName, setHostName] = useState<string>('')
    const [processor, setProcessor] = useState<string>('')
    const [memoryRam, setMemoryRam] = useState<string>('')
    const [hdd, setHdd] = useState<string>('')
    const [ssd, setSdd] = useState<string>('')
    const [storage, setStorage] = useState<string>('')
    const [system, setSystem] = useState<string>('')
    const [switchNetwork, setSwitchNetwork] = useState<string>('')
    const [user, setUser] = useState<string>('')
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)

    async function handleCreateHost(e: SyntheticEvent) {
        e.preventDefault()

        setLoading(true)

        if (!hostName || !processor || !memoryRam || !hdd || !ssd || !storage || !system || !switchNetwork || !user) {
            toast.error('Preenchar todos os campos!')
            setError(true)
            setLoading(false)
            return
        }

        let data = {
            host: hostName,
            processor: processor,
            ram_memory: memoryRam,
            hdd: hdd,
            sdd: ssd,
            storage: storage,
            system: system,
            switch_netwoork: switchNetwork,
            user_id: user
        }

        try {
            await createHost(data);
            toast.success('Host criado com sucesso!')
        } catch (error) {
            toast.error('Erro ao criar host.')
            console.log("Error: ", error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <form onSubmit={handleCreateHost}>
            <ModalBody>
                <InputForm error={error} radius="lg" type="text" color={error ? 'danger' : 'default'} variant="flat" label="Host Name*" size='sm' value={hostName} onChange={(e) => setHostName(e.target.value)} />
                <InputForm error={error} radius="lg" type="text" color={error ? 'danger' : 'default'} variant="flat" label="Processador*" size='sm' value={processor} onChange={(e) => setProcessor(e.target.value)} />
                <InputForm error={error} radius="lg" type="text" color={error ? 'danger' : 'default'} variant="flat" label="Memória Ram*" size='sm' value={memoryRam} onChange={(e) => setMemoryRam(e.target.value)} />
                <div className="w-full flex">
                    <div className="w-1/2">
                        <Select
                            label="Possui Hdd ?"
                            color={error ? 'danger' : 'default'}
                            size='sm'
                            radius="lg"
                            value={hdd}
                            onChange={(e) => setHdd(e.target.value)}
                            className="w-full pr-2"
                            classNames={{ trigger: `bg-transparent data-[hover=true]:bg-transparent group-data-[focus=true]:bg-transparent border ${error ? 'border-red-400' : 'border-blue-400'}` }}
                        >
                            <SelectItem key="true">
                                Sim
                            </SelectItem>
                            <SelectItem key="false">
                                Não
                            </SelectItem>
                        </Select>
                    </div>
                    <div className="w-1/2">
                        <Select
                            label="Possui Sdd ?"
                            radius="lg"
                            color={error ? 'danger' : 'default'}
                            size='sm'
                            value={ssd}
                            onChange={(e) => setSdd(e.target.value)}
                            className="w-full"
                            classNames={{ trigger: `bg-transparent data-[hover=true]:bg-transparent group-data-[focus=true]:bg-transparent border ${error ? 'border-red-400' : 'border-blue-400'}` }}
                        >
                            <SelectItem key="true">
                                Sim
                            </SelectItem>
                            <SelectItem key="false">
                                Não
                            </SelectItem>
                        </Select>
                    </div>
                </div>
                <InputForm error={error} radius="lg" type="text" color={error ? 'danger' : 'default'} variant="flat" label="Armazenamento*" size='sm' value={storage} onChange={(e) => setStorage(e.target.value)} />
                <InputForm error={error} radius="lg" type="text" color={error ? 'danger' : 'default'} variant="flat" label="Sistema Operacional*" size='sm' value={system} onChange={(e) => setSystem(e.target.value)} />
                <InputForm error={error} radius="lg" type="text" color={error ? 'danger' : 'default'} variant="flat" label="Switch*" size='sm' value={switchNetwork} onChange={(e) => setSwitchNetwork(e.target.value)} />
                <Select
                    items={users}
                    value={user}
                    color={error ? 'danger' : 'default'}
                    onChange={(e) => setUser(e.target.value)}
                    label="Escolha um usuario"
                    radius="lg"
                    size='sm'
                    className="w-full"
                    classNames={{ trigger: `bg-transparent data-[hover=true]:bg-transparent group-data-[focus=true]:bg-transparent border ${error ? 'border-red-400' : 'border-blue-400'}` }}
                >
                    {(user) => <SelectItem key={user.id}>{user.name}</SelectItem>}
                </Select>
            </ModalBody>
            <ModalFooter>
                <BtnLoading isLoading={loading} type='submit' color={loading ? 'success' : 'primary'} size='md'>
                    Entrar
                </BtnLoading>
            </ModalFooter>
        </form>
    )
}
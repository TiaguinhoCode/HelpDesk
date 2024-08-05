'use client'

// Componentes
import { InputForm } from "@/components/ui/input";
import { Options } from "@/components/ui/select";
import { Btn } from "@/components/ui/button";

// Biblioteca
import { toast } from "react-toastify";

// React
import { useState } from "react";

// Dados
import { options } from "@/data/boolean";
import { getData } from "@/services/client/FetchApi";

// Utils
import { createHost } from "@/utils/functions/formCreateHost";

// Tipagem
import { User } from "@/types/user";

export function CreateHost() {
    const [users, setUsers] = useState<User[]>([]); // Espera um array de User
    const [isInvalid, setIsInvalid] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>()

    getData<User>(setUsers, "/users", "users");

    async function handleCreateHost(formData: FormData) {
        const response = await createHost(formData);
        setLoading(response.loading);
        if (response?.error === true) {
            toast.error(response.message);
            setIsInvalid(response.error);
            setLoading(response.loading)
        } else {
            toast.success(response?.message);
            setIsInvalid(response?.error);
            setLoading(response.loading)
        }
        setLoading(response.loading)
        console.log('Carregando: ', loading);
    }

    
    return (
        <>
            <form action={handleCreateHost}>
                <InputForm isInvalid={isInvalid} type="text" name="machineName" className="pb-2" label="Nome do computador: " isPassoword={false} placeholder="EMP-SETOR-001" />
                <InputForm isInvalid={isInvalid} type="text" name="processor" className="pb-2 py-2" label="Nome do processador: " isPassoword={false} placeholder="Nome do processor Colock" />
                <InputForm isInvalid={isInvalid} type="text" name="ramMemory" className="py-2" label="Memória  ram: " isPassoword={false} placeholder="16GB" />
                <div className="w-full py-1 flex space-x-2">
                    <div className="w-1/2">
                        <Options isInvalid={isInvalid} name="hdd" data={options} dataKey="value" description="Tem HD?" />
                    </div>
                    <div className="w-1/2">
                        <Options isInvalid={isInvalid} name="ssd" data={options} dataKey="value" description="Tem SSD?" />
                    </div>
                </div>
                <InputForm isInvalid={isInvalid} type="text" name="storage" className="py-2" label="Armazenamento: " isPassoword={false} placeholder="250GB" />
                <InputForm isInvalid={isInvalid} type="text" name="system" className="py-2" label="Sistema Operacional: " isPassoword={false} placeholder="Win 10" />
                <InputForm isInvalid={isInvalid} type="text" name="switchNetwork" className="py-2" label="Switch: " isPassoword={false} placeholder="SW-001" />
                <Options isInvalid={isInvalid} data={users} name="user" dataKey="name" description="Escolha um usuário" />
                <div className="w-full py-5">
                    <Btn isLoading={loading} type="submit" className="w-full" description="Adicionar" />
                </div>
            </form>
        </>
    );
}

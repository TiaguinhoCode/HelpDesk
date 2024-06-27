"use client";

// React
import { SyntheticEvent, useState } from "react"

// Biblioteca
import { ModalBody, ModalFooter } from "@nextui-org/modal"

// Componentes
import { InputForm } from "@/components/ui/input"
import { BtnLoading } from "@/components/ui/button"

export default function CreateHost() {
    const [hostName, setHostName] = useState<string>('')
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)

    async function handleCreateHost(e: SyntheticEvent) {
        e.preventDefault()

        console.log("Host: ", hostName)
    }

    return (
        <form onSubmit={handleCreateHost}>
            <ModalBody>
                <InputForm error={error} radius="lg" type="text" color={error ? 'danger' : 'default'} variant="flat" label="Host Name*" size='sm' value={hostName} onChange={(e) => setHostName(e.target.value)} />
            </ModalBody>
            <ModalFooter>
                <BtnLoading isLoading={loading} type='submit' color={loading ? 'success' : 'primary'} size='md'>
                    Entrar
                </BtnLoading>
            </ModalFooter>
        </form>
    )
}
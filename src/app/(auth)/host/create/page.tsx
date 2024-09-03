// Biblioteca

// React

// Framework - Servidor

// Componentes
import { CreateHost } from "@/components/forms/host/CreateHost";

// Utils
import { getData } from "@/services/server/FetchApi";

// Tipagem

export default async function CreateHostPage() {
    const users = await getData('/users', 'GET', 300)

    return (
        <div className="w-full  flex space-x-4">
            <CreateHost users={users.users}/>
        </div>
    )
}
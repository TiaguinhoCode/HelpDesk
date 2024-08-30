'use client'

// Componentes
import { Options } from "@/components/ui/select";
import { SubMenu } from "@/components/ui/menu/Submenu/host/formCreate";

// Service - Utils
import { getData } from "@/services/client/FetchApi";

// Framework - Next

// Biblioteca

// React
import { useState } from "react";

// Tipagem
import { User } from "@/types/user";
interface CreateHostProps {

}

export function CreateHost({ }: CreateHostProps) {
    const [users, setUsers] = useState<User[]>([])
    const [userId, setUserId] = useState<string>('')

    getData<User>({ setData: setUsers, url: "/users", dataKey: "users" });

    return (
        <>
            <SubMenu url={`/detail/user?id=${userId}`} />
            <div className="mx-auto w-full mt-24 max-w-[81%] rounded-xl shadow-lg bg-white">
                <form
                    className="py-6 px-9"
                    action="https://formbold.com/s/FORM_ID"
                    method="POST"
                >
                    <div className="mb-5 w-1/2">
                        <Options value={userId} setValue={setUserId} isInvalid={false} data={users} dataKey="name" description="Escolha um usuário" />
                    </div>
                </form>
            </div>
        </>
    )
}
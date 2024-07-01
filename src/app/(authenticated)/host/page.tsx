'use server'

// Componentes
import HeaderBar from "@/components/ui/menu/host/HeaderBar";
import SideBar from "@/components/ui/menu/host/SideBar";
import { ModalForm } from "@/components/modal";
import CreateHost from "@/components/forms/host/CreateHost";
import { MainTableHost } from "@/components/ui/tables/tableHost/MainTableHost";

// Biblioteca
import { FiPlus } from "react-icons/fi";

// Framework - Servidor
import { getServerSession } from "next-auth";
import { nextAuthOptions } from "@/app/api/auth/[...nextauth]/route";
import { Session } from "inspector";

// Utils
import fetchData from "@/app/utils/fetchData";

// Dados

// Tipagem
interface sessionType extends Session {
    name: string;
    email: string;
    department: { id: string, sector: string };
    token: string
    photo: string
}

export default async function HostPage() {
    const session = await getServerSession(nextAuthOptions) as sessionType

    const sector = await fetchData('/departments')
    const host = await fetchData('/host')
    const user = await fetchData('/users')

    return (
        <>
            <SideBar sector={sector?.data.departments} />
            <div className="w-full">
                <HeaderBar user={session} />
                <div className="flex flex-col gap-4">
                    <div className="p-3">
                        <MainTableHost data={host?.data.hosts} token={session.token}>
                            <ModalForm descriptionBtn="Adicionar Computador" descriptionHeader="Adicionar novo computador" startContent={<FiPlus className="text-white text-lg" />}>
                                <CreateHost users={user?.data.users} token={session.token} />
                            </ModalForm>
                        </MainTableHost>
                    </div>
                </div>
            </div>
        </>
    )
}

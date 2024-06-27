// Componentes
import HeaderBar from "@/components/ui/menu/host/HeaderBar";
import SideBar from "@/components/ui/menu/host/SideBar";
import { DropDownTable } from "@/components/ui/dropDown/DropDownTable";
import { TableHosts } from "@/components/ui/tables/tableHost/TableHosts";
import { ManagementPanel } from "@/components/managementPanel";
import { ModalForm } from "@/components/modal";
import CreateHost from "@/components/forms/host/CreateHost";
import { FiPlus } from "react-icons/fi";

// Biblioteca

// Framework - Servidor
import { getServerSession } from "next-auth";
import { nextAuthOptions } from "@/app/api/auth/[...nextauth]/route";
import { Session } from "inspector";

// Utils
import fetchData from "@/app/utils/fetchData";

// Dados
import { columns } from "@/data/TableColumns/ColummnsHost";

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

    return (
        <>
            <SideBar sector={sector?.data.departments} />
            <div className="w-full">
                <HeaderBar user={session} />
                <div className="flex flex-col gap-4">
                    <ManagementPanel description={`Total ${host?.data.hosts.length} computadores`}>
                        <ModalForm descriptionBtn="Adicionar Computador" descriptionHeader="Adicionar novo computador" startContent={<FiPlus className="text-white text-lg" />}>
                            <CreateHost/>
                        </ModalForm>
                        <DropDownTable data={columns} />
                    </ManagementPanel>
                    <div className="px-3">
                        <TableHosts data={host?.data.hosts} collumns={columns} />
                    </div>
                </div>
            </div>
        </>
    )
}

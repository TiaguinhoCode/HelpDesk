// Componentes
import HeaderBar from "@/components/ui/menu/host/HeaderBar";
import SideBar from "@/components/ui/menu/host/SideBar";
import { DropDownTable } from "@/components/ui/dropDown/DropDownTable";
import { TableMain } from "@/components/ui/table";

// Biblioteca
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { CiSearch } from "react-icons/ci";
import { FiPlus } from "react-icons/fi";

// Framework - Servidor
import { getServerSession } from "next-auth";
import { nextAuthOptions } from "@/app/api/auth/[...nextauth]/route";
import { Session } from "inspector";

// Tipagem
interface sessionType extends Session {
    name: string;
    email: string;
    department: { id: string, sector: string };
    photo: string
}

export default async function HostPage() {
    const session = await getServerSession(nextAuthOptions) as sessionType

    return (
        <>
            <SideBar />
            <div className="w-full">
                <HeaderBar user={session} />
                <div className="flex flex-col gap-4">
                    <div className="flex px-4 pt-4 justify-between gap-3 items-end">
                        <Input
                            isClearable
                            className="w-full sm:max-w-[44%]"
                            classNames={{ input: "bg-white", inputWrapper: "bg-white data-[hover=true]:bg-white group-data-[focus=true]:bg-bg-white" }}
                            placeholder="Search by name..."
                            startContent={<CiSearch />}
                        />
                        <div className="flex">
                            <Button color="primary" size="sm" radius="md" className="p-2 mr-2" startContent={<FiPlus className="text-white text-lg" />}>Add Computador</Button>
                            <DropDownTable />
                        </div>
                    </div>
                    <div className="flex justify-between items-center px-4">
                        <span className="text-default-400 text-small">Total 20 computadores</span>
                        <label className="flex items-center text-default-400 text-small">
                            Rows per page:
                            <select
                                className="bg-transparent outline-none text-default-400 text-small"
                            // onChange={onRowsPerPageChange}
                            >
                                <option value="5">5</option>
                                <option value="10">10</option>
                                <option value="15">15</option>
                            </select>
                        </label>
                    </div>
                    <div className="px-3">
                        <TableMain />
                    </div>
                </div>
            </div>
        </>
    )
}
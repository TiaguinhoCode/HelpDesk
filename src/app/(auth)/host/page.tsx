// Componentes
import { renderCell } from "@/components/cell/host";
import { Submenu } from "@/components/ui/menu/Submenu/host";
import { ContainerTable } from "@/components/ui/table/containerTable";

// Service
import { getData } from "@/services/server/FetchApi";

// Utils
import { searchFilter } from "@/utils/filter/host/search";

// Tipagem

export default async function HostPage() {

    const department = await getData('/departments', 'GET', 3600)
    const user = await getData('/users', 'GET', 900)
    const host = await getData('/host', 'GET', 0)

    return (
        <div className="w-full h-screen flex space-x-4">
            <Submenu users={user.users} departments={department.departments} />
            <div className="w-full">
                <ContainerTable data={host.hosts} filterFunction={searchFilter} urlGet="/host" dataKey="hosts" renderCell={renderCell} isRemove={true} urlRemove="/delete/host?id="/>
            </div>
        </div>
    )
}
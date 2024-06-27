"use client";

// Biblioteca
import { Input } from "@nextui-org/input";
import { CiSearch } from "react-icons/ci";
import { useRecoilState } from "recoil";

// React
import { ReactNode } from "react";

// Atom
import { serchFilter } from "@/atom/searchFilter";

// Tipagem
interface ManagementPanelProps {
    children: ReactNode
    description: string
}

export function ManagementPanel({ children, description }: ManagementPanelProps) {
    const [serachFilter, setSearchFilter] = useRecoilState(serchFilter)

    return (
        <>
            <div className="flex px-4 pt-4 justify-between gap-3 items-end">
                <Input
                    isClearable
                    className="w-full sm:max-w-[44%]"
                    classNames={{ input: "bg-white", inputWrapper: "bg-white data-[hover=true]:bg-white group-data-[focus=true]:bg-bg-white" }}
                    placeholder="Search by name..."
                    startContent={<CiSearch />}
                    value={serachFilter}
                    onChange={(e) => setSearchFilter(e.target.value)}
                    onClear={() => setSearchFilter('')}
                />
                <div className="flex">
                    {children}
                </div>
            </div>
            <div className="flex justify-between items-center px-4">
                <span className="text-default-400 text-small">{description}</span>
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
        </>
    )
}
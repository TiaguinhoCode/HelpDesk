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
    description: string
}

export function ManagementPanel({ description }: ManagementPanelProps) {
    const [serachFilter, setSearchFilter] = useRecoilState(serchFilter)

    return (
        <>
            <Input
                isClearable
                className="w-full"
                classNames={{ input: "bg-white", inputWrapper: "bg-white border border-blue-400 data-[hover=true]:bg-white group-data-[focus=true]:bg-bg-white" }}
                placeholder="Search by name..."
                startContent={<CiSearch />}
                value={serachFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                onClear={() => setSearchFilter('')}
            />
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
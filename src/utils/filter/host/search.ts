"use client";

// Tipagem
import { Host } from "@/types/host";
interface SearchParamsProps {
  data: Host[];
  search: string;
}

export function searchFilter({ data, search }: SearchParamsProps): Host[] {
  const query = search.toLowerCase();
  return data.filter((host) => {
    return (
      host.host.toLowerCase().includes(query) ||
      host.processor.toLowerCase().includes(query) ||
      host.ram_memory.toLowerCase().includes(query) ||
      host.storage.toLowerCase().includes(query) ||
      host.system.toLowerCase().includes(query) ||
      host.switch.toLowerCase().includes(query) ||
      host.user.name.toLowerCase().includes(query) ||
      host.user.email.toLowerCase().includes(query) ||
      host.user.department.sector.toLowerCase().includes(query)
    );
  });
}

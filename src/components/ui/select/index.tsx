// Biblioteca
import { Select, SelectItem } from "@nextui-org/react";

// Tipagem
interface OptionsProps<T> {
    data: T[];
    dataKey: keyof T;
    description: string;
    placeholder?: string;
    name: string;
    isInvalid: boolean;
}

export function Options<T>({ data, dataKey, description, name, placeholder, isInvalid }: OptionsProps<T>) {
    return (
        <Select
            label={description}
            placeholder={placeholder}
            className="w-full"
            size="md"
            labelPlacement="outside"
            isInvalid={isInvalid}
            classNames={{ trigger: "bg-transparent data-[hover=true]:bg-transparent group-data-[focus=true]:bg-transparent border border-gray-300" }}
            name={name}
        >
            {data.map((item) => (
                <SelectItem key={(item as any).id}>
                    {(item as any)[dataKey]}
                </SelectItem>
            ))}
        </Select>
    )
}
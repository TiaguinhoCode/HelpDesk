// Biblioteca
import { Select, SelectItem } from "@nextui-org/react";

// Tipagem
interface OptionsProps<T> {
    data: T[];
    dataKey: string;
    description?: string;
    placeholder?: string;
    isInvalid: boolean;
    setValue: (value: string) => void;
    value: string;
}

export function Options<T>({ data, dataKey, description, placeholder, isInvalid, setValue, value }: OptionsProps<T>) {
    return (
        <Select
            label={description}
            placeholder={placeholder}
            className="w-full"
            size="md"
            labelPlacement="outside"
            isInvalid={isInvalid}
            classNames={{ trigger: "bg-transparent data-[hover=true]:bg-transparent group-data-[focus=true]:bg-transparent border border-gray-300" }}
            selectedKeys={[value]} 
            onChange={(e) => setValue(e.target.value)}
        >
            {data && data.map((item) => (
                <SelectItem key={(item as any).id}>
                    {(item as any)[dataKey]}
                </SelectItem>
            ))}
        </Select>
    )
}
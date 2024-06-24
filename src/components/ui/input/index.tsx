// React 
import { ComponentProps, InputHTMLAttributes } from "react";

// Biblioteca
import { Input } from "@nextui-org/input";

// Tipagem
type InputProps = ComponentProps<typeof Input> & {
    error?: boolean;
};

export function InputForm({ error, ...rest }: InputProps) {
    return <Input
        classNames={
            {
                inputWrapper: `dark:group-data-[focus=false] bg-transparent hover:bg-transparent shadow-none dark:hover:bg-transparent group-data-[focus=true]:bg-transparent border ${error ? 'border-red-400' : 'border-blue-400'}`,
            }
        } {...rest} />
}

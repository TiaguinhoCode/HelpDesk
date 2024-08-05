'use client'

// Biblioteca
import { Input } from "@nextui-org/react";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";

// React
import { ComponentProps, useState } from "react";

// Tipagem
type InputFormProps = ComponentProps<typeof Input> & {
    isPassoword: boolean;
}

export function InputForm({ isPassoword, ...rest }: InputFormProps) {
    const [isVisible, setIsVisible] = useState<boolean>(false)

    if (isPassoword) {
        return (
            <Input
                type={isVisible ? 'text' : 'password'}
                label="Senha:"
                placeholder="Digite sua senha"
                endContent={
                    <button className="focus:outline-none" type="button" onClick={() => setIsVisible(!isVisible)}>
                        {isVisible ? (
                            <IoEyeOutline className="text-2xl text-default-400 pointer-events-none" />
                        ) : (
                            <IoEyeOffOutline className="text-2xl text-default-400 pointer-events-none" />
                        )}
                    </button>
                }
                size="md"
                {...rest}
                labelPlacement="outside"
                classNames={{ inputWrapper: "bg-transparent data-[hover=true]:bg-transparent group-data-[focus=true]:bg-transparent border border-gray-300" }}
            />
        )
    } else {
        return (
            <Input
                size="md"
                {...rest}
                labelPlacement="outside"
                classNames={{ inputWrapper: "bg-transparent data-[hover=true]:bg-transparent group-data-[focus=true]:bg-transparent border border-gray-300" }}
            />
        )
    }

}
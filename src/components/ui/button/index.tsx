// Biblioteca
import { Button } from "@nextui-org/button";

// React
import { ComponentProps, ReactNode } from "react";

// Tipagem
type BtnProps = ComponentProps<typeof Button> & {
    description: string
}

export function Btn({ description, ...rest }: BtnProps) {
    return (
        <Button color="primary" {...rest}>
            {description}
        </Button>
    )
}
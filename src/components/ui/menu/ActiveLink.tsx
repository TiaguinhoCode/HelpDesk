'use client'

// Biblioteca
import { Tooltip } from "@nextui-org/react";

// Next
import Link, { LinkProps } from "next/link"
import { usePathname } from "next/navigation";

// React
import { ReactNode } from "react"

// Tipagem
type ActiveLinkProps = LinkProps & {
    children: ReactNode;
    content: string;
}

export function ActiveLink({ children, content, href }: ActiveLinkProps) {
    const pathName = usePathname()
    const isActive = pathName === href.toString()

    return (
        <Tooltip placement="left" offset={2} showArrow={true} content={content} classNames={{ base: "font-bold" }}>
            <Link className={`flex items-center justify-center w-12 h-12 mt-2 rounded ${isActive ? "bg-white text-gray-800" : "hover:bg-white hover:text-gray-800"}`} href={href}>{children}</Link>
        </Tooltip>
    )
}
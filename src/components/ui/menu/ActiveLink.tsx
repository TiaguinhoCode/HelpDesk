"use client"

// Framework 
import Link, { LinkProps } from "next/link"

// Biblioteca
import { Tooltip } from "@nextui-org/tooltip"

// React
import React from "react"
import { usePathname } from "next/navigation"

// Tipagem
type ActiveLinkProps = LinkProps & {
    children: React.ReactNode,
    content: string
}

export default function ActiveLink({ children, href, content, ...rest }: ActiveLinkProps) {
    const pathName = usePathname()
    const isActive = pathName === href.toString()

    return (
        <Tooltip placement="left" offset={2} showArrow={true} content={content} classNames={{ base: "font-bold" }}>
            <Link
                href={href}
                className={`p-1.5 text-gray-700 ${isActive ? 'dark:text-gray-800 dark:bg-gray-100' : 'hover:dark:text-gray-800 dark:hover:bg-gray-100  dark:text-gray-200'} focus:outline-nones transition-colors duration-200 rounded-lg  `}
            >
                {children}
            </Link>
        </Tooltip>
    )
}
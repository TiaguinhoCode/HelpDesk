// Framework - servidor
import { getServerSession } from "next-auth";
import { nextAuthOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

// React
import { ReactNode } from "react";

export default async function GuestRouter({ children }: { children: ReactNode }) {
    const session = await getServerSession(nextAuthOptions)

    if (session) {
        redirect('/ticket')
    }

    return <>{children}</>
}
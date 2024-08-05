// Framework - servidor
import { getServerSession } from "next-auth";
import { nextAuthOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

// React
import { ReactNode } from "react";

// Biblioteca
import NextTopLoader from "nextjs-toploader";

// Componentes
import { SideNav } from "@/components/ui/menu/SideNav";
import { HeaderNav } from "@/components/ui/menu/HeaderNav";
import { Layout } from "@/components/ui/layout";

export default async function PrivateRouter({ children }: { children: ReactNode }) {
    const session = await getServerSession(nextAuthOptions)

    if (!session) {
        redirect('/')
    }

    return (
        <main className="flex w-screen h-screen  bg-[#f6f8fc]">
            <NextTopLoader />
            <SideNav user={session.user} />
            <div className="w-full flex flex-col">
                <HeaderNav user={session.user} />
                <Layout>
                    {children}
                </Layout>
            </div>
        </main>
    )
}
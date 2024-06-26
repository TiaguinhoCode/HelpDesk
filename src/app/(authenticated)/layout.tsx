// Css
import "../../css/globals.css";

// React
import { ReactNode } from "react";

// Framework - Servidor
import { getServerSession } from "next-auth";
import { nextAuthOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

// Components
import SideBar from "@/components/ui/menu/sidebar";
import { Session } from "inspector";

// Tipagem
interface PrivateLayoutProps {
  children: ReactNode
}

// Tipagem
interface sessionType extends Session {
  name: string;
  email: string;
  department: { id: string, sector: string };
  photo: string
}

export default async function PrivateLayout({ children }: PrivateLayoutProps) {
  const session = await getServerSession(nextAuthOptions) as sessionType

  if (!session) {
    redirect('/login')
  }

  return (
    <>
      <div className="w-full flex bg-gray-100">
         <SideBar user={session} />
        {children}
      </div>
    </>
  )
}

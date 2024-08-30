// React 
import { ReactNode } from "react"

export function Layout({ children }: { children:ReactNode }) {
    return (
        <main className="max-w-full h-full flex relative overflow-y-auto">

            <div className="w-full m-4 flex flex-wrap items-start justify-start rounded-tl grid-flow-col auto-cols-max gap-4 overflow-y-hidden">
                {children}
            </div>
        </main>
    )
}
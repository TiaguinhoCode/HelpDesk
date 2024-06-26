// Auth
import NextAuthSessionProvider from "@/providers/sessionProvider";

// Css
import "../css/globals.css";
import 'react-toastify/dist/ReactToastify.css';

// Biblioteca
import NextTopLoader from "nextjs-toploader";
import { ToastContainer } from 'react-toastify';

import Recoil from "@/components/recoil";

export default function RootLayout({ children, }: { children: React.ReactNode }) {

  return (
    <html lang="pt-br">
      <body>
        <NextAuthSessionProvider>
          <Recoil>
            <NextTopLoader />
            <ToastContainer autoClose={3000} />
            {children}
          </Recoil>
        </NextAuthSessionProvider>
      </body>
    </html>
  )
}

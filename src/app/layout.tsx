// Auth
import NextAuthSessionProvider from "@/providers/sessionProvider";

// Css
import "../css/globals.css";
import 'react-toastify/dist/ReactToastify.css';

// Biblioteca
import NextTopLoader from "nextjs-toploader";
import { ToastContainer, toast } from 'react-toastify';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="pt-br">
      <body>
        <NextAuthSessionProvider>
          <NextTopLoader />
          <ToastContainer autoClose={3000} />
          {children}
        </NextAuthSessionProvider>
      </body>
    </html>
  )
}

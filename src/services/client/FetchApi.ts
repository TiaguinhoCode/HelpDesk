"use client";

// React
import { useEffect } from "react";
import { useSession } from "next-auth/react";

export function getData<T>(
  setData: (value: T[]) => void, // Espera um array de T
  url: string,
  dataKey: string // A chave para acessar os dados
) {
  const { data: session } = useSession();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`https://helpdeskapi.vercel.app${url}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${session?.user.token}`,
          },
        });
        const result = await response.json();

        if (result && Array.isArray(result[dataKey])) {
          setData(result[dataKey] as T[]);
        }
      } catch (error) {
        console.error("Erro ao buscar dados: ", error);
      }
    }

    if (session) {
      fetchData();
    }
  }, [url]);
}

"use client";

// React
import { useEffect, useState } from "react";

// Framework
import { useSession } from "next-auth/react";

export function getData<T>({
  setData,
  url,
  dataKey,
}: {
  setData: (value: T[]) => void;
  url: string;
  dataKey: string;
}) {
  const { data: session } = useSession();

  useEffect(() => {
    async function fetchData() {
      if (!session) return; // Para garantir que a sessão esteja disponível

      try {
        const response = await fetch(`https://helpdeskapi.vercel.app${url}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${session.user.token}`,
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

    fetchData();
  }, [session, url]); // Dependências para re-executar se a sessão mudar
}

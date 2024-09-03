"use client";

// React
import { useEffect, useState } from "react";

// Framework
import { useSession } from "next-auth/react";

export function getData<T>({
  setData,
  url,
  dataKey,
  token,
}: {
  setData?: (value: T[]) => void;
  url: string;
  dataKey: string;
  token?: string;
}) {
  // const { data: session } = useSession();

  useEffect(() => {
    async function fetchData() {
      if (!token) return; // Para garantir que a sessão esteja disponível

      try {
        const response = await fetch(`https://helpdeskapi.vercel.app${url}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const result = await response.json();

        if (result && Array.isArray(result[dataKey])) {
          setData && setData(result[dataKey] as T[]);
        }
      } catch (error) {
        console.error("Erro ao buscar dados: ", error);
      }
    }

    fetchData();
  }, [token, url]); // Dependências para re-executar se a sessão mudar
}

export function useFetchData<T>({
  url,
  token,
  dataKey,
}: {
  url: string;
  token?: string;
  dataKey: string;
}) {
  const [data, setData] = useState<T | null>(null); 

  useEffect(() => {
    async function fetchData() {
      try {
        const resp = await fetch(`https://helpdeskapi.vercel.app${url}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const result = await resp.json();
        const fetchedData = result[dataKey];

        // Verifica se o dado retornado é um array ou um objeto
        if (Array.isArray(fetchedData)) {
          // Se for um array, retorna o primeiro item ou null
          setData(fetchedData.length > 0 ? fetchedData[0] : null);
        } else if (typeof fetchedData === "object" && fetchedData !== null) {
          // Se for um objeto, define normalmente
          setData(fetchedData);
        } else {
          // Em caso de dados inesperados, você pode definir como null
          setData(null);
        }
      } catch (err) {
        console.error("Error: ", err);
        setData(null); // Em caso de erro, você pode definir como null
      }
    }

    if (token) {
      fetchData();
    }
  }, [url, token, dataKey]);

  return { data };
}

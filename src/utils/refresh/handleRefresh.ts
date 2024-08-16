// Tipagem
interface FetchDataProps<T> {
  setLoading: (value: boolean) => void;
  setData: (value: T[]) => void;
  dataKey: string;
  url: string;
  token?: string;
}

export function fetchData<T>({
  setLoading,
  setData,
  dataKey,
  token,
  url,
}: FetchDataProps<T>) {
  async function handleRefresh() {
    setLoading(true);

    try {
      const resp = await fetch(`https://helpdeskapi.vercel.app${url}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await resp.json();

      if (result[dataKey]) {
        setData(result[dataKey]);
      } else {
        console.error("Estrutura de dados inesperada:", result);
        setData([]); 
      }
    } catch (err) {
      console.error("Erro ao buscar dados:", err);
    } finally {
      setLoading(false);
    }
  }

  return handleRefresh;
}

"use client";

// Framework - Servidor

// React
import { useState } from "react";
import { toast } from "react-toastify";

// Tipagem
interface RemoveDataProps {
  onClose: () => void;
  onOpen: () => void;
  refresh: () => void;
  url?: string | undefined;
  token?: string;
}

export function removeData({
  onOpen,
  onClose,
  refresh,
  url,
  token,
}: RemoveDataProps) {
  const [id, setId] = useState<string>("");

  function openTakeDownNotice(newId: string) {
    setId(newId);
    onOpen();
  }

  async function handleDeleteData() {
    try {
      const response = await fetch(`https://helpdeskapi.vercel.app${url}${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        toast.error("Ocorreu um error interno no servidor! desculpa :( ");
      }

      toast.success("Máquina excluída com sucesso");
      onClose();
      refresh()
    } catch (err) {
      console.log(`Ocorreu um erro ao excluir os dados: ${err}`);
    }
  }

  return {openTakeDownNotice, handleDeleteData};
}

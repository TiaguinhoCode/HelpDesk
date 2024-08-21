"use client";

// React
import { useState } from "react";

// Tipagem
interface EditDataProps {
  setModalType: (value: string) => void;
}

export function editData({ setModalType }: EditDataProps) {
  const [id, setId] = useState<string>("");

  function openFormEdition(value: string, newId: string) {
    setModalType(value);
    setId(newId);
  }

  return { openFormEdition, id };
}

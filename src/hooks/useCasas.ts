import { useEffect, useState } from "react";
import { getAllCasas } from "@/server";
import { Casa } from "@/types/Casa";

type Filter = {
  key: string;
  value: [number, number];
};

export function useCasas(filter?: Filter) {
  const [casas, setCasas] = useState<Casa[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCasas = async () => {
      setLoading(true);
      setError(null);

      try {
        const casasData = await getAllCasas(filter);
        setCasas(casasData);
      } catch (err) {
        console.error("Error al obtener las casas:", err);
        setError("No se pudo obtener la lista de casas");
      } finally {
        setLoading(false);
      }
    };

    fetchCasas();
  }, [filter]); // Agrega filter como dependencia para ejecutar el efecto cuando cambie

  return { casas, loading, error };
}

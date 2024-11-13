"use client";
import CasaCard from "@/app/components/CasaCard";
// import { featCasas, mockCasas } from "@/app/mockData";
import { Spinner } from "@nextui-org/spinner";
import { useCasas } from "@/hooks/useCasas";

export default function Home() {
  const { casas, loading, error } = useCasas();
  if (loading) return (
    <div className="flex justify-center items-center min-h-screen">
      <Spinner color="primary" />
    </div>
  );

  return (
    <section className="min-h-screen bg-slate-100">
      <div className="flex justify-start text-xs pt-2 p-2 text-default-500 align-middle bg-slate-200">
        <h1 >
          Claudia Uribe &nbsp;|&nbsp; Asesor Inmobiliario
        </h1>
      </div>

      <section className="flex flex-wrap justify-center gap-5 p-4 md:pl-40 md:pr-40">
        {casas.map((casa) => (
          <CasaCard key={casa.id} casa={casa} />
        ))}
      </section>
    </section>
  );
}

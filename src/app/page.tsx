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
      <section className="flex flex-col w-full space-y-4 p-4 md:grid md:grid-cols-3 md:min-h-screen md:gap-5 md:justify-center md:space-y-0 md:pl-40 md:pr-40">
        {casas.map((casa) => (
          <CasaCard key={casa.id} casa={casa} />
        ))}
      </section>
    </section>
  );
}

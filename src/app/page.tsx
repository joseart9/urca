"use client";
import CasaCard from "@/app/components/CasaCard";
// import { featCasas, mockCasas } from "@/app/mockData";
import { Spinner } from "@nextui-org/spinner";
import { useCasas } from "@/hooks/useCasas";
import Navbar from "@/app/components/Navbar";
import { Select, SelectItem } from "@nextui-org/react";

export default function Home() {
  const { casas, loading, error } = useCasas();

  const filters = [
    { key: "price", label: "Precio" },
  ]

  if (loading) return (
    <div className="flex justify-center items-center min-h-screen">
      <Spinner color="primary" />
    </div>
  );

  return (
    <Navbar>
      <section className="min-h-screen bg-slate-100">
        <div className="flex justify-start text-[#006FEE] text-xs pt-2 p-2 align-middle bg-slate-200 uppercase">
          <h1 >
            Claudia Uribe &nbsp;|&nbsp; Asesor Inmobiliario
          </h1>
        </div>

        <section className="p-4 hidden md:w-1/3">
          <Select radius="full" color="primary" variant="bordered" label="Filtrar por">
            {filters.map((filter) => (
              <SelectItem key={filter.key} value={filter.key}>
                {filter.label}
              </SelectItem>
            ))}
          </Select>
        </section>

        <section className="flex w-2/3 pb-1 pt-1">
          <Select radius="full" color="default" variant="underlined" label="Filtrar por">
            {filters.map((filter) => (
              <SelectItem key={filter.key} value={filter.key}>
                {filter.label}
              </SelectItem>
            ))}
          </Select>
        </section>

        <section className="flex flex-wrap justify-center gap-5 md:pl-40 md:pr-40">
          {casas.map((casa) => (
            <CasaCard key={casa.id} casa={casa} />
          ))}
        </section>
      </section>
    </Navbar>
  );
}

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
          <Select radius="full" color="default" variant="underlined" placeholder="Filtrar por" startContent={
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-[#3f3f46]">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z" />
            </svg>
          }>
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

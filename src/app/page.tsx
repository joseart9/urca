"use client";
import CasaCard from "@/app/components/CasaCard";
import { Spinner } from "@nextui-org/spinner";
import { useCasas } from "@/hooks/useCasas";
import Navbar from "@/app/components/Navbar";
import { Button, useDisclosure } from "@nextui-org/react";
import { useState } from "react";
import FilterModal from "@/app/components/FilterModal";

export default function Home() {
  const [filter, setFilter] = useState<any>({
    key: undefined,
    value: [0, 0],
  });
  const { casas, loading, error } = useCasas(filter); // Pasa el filtro al hook
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  if (loading) return (
    <div className="flex justify-center items-center min-h-screen">
      <Spinner color="primary" />
    </div>
  );

  return (
    <Navbar>
      <section className="w-full h-full bg-slate-100">
        <div className="flex flex-row w-full items-center text-[#006FEE] bg-[#006FEE]/5 uppercase">
          <div className="flex flex-row w-fit pb-1 pt-1 px-2 items-center justify-start text-left">
            <Button radius="full" color="primary" variant="bordered" size="sm" className="" onPress={onOpen}>

              <div className="flex flex-row items-center space-x-2">
                <p className="text-[#006FEE]">
                  {filter && filter.key
                    ? filter.key === "tipoPropiedad"
                      ? filter.value
                      : filter.key
                    : "Ordenar por"}
                </p>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 text-[#006FEE]">
                <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
              </svg>
            </Button>
            {filter.key !== undefined && (
              <Button onPress={(e) => setFilter({ key: undefined, value: [0, 0] })} isIconOnly size="sm" className="bg-transparent text-[#006FEE]/50">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
              </Button>
            )}
          </div>
        </div>

        <section className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-3 md:px-10 md:p-4 lg:container lg:mx-auto justify-center">
          {casas.map((casa) => (
            <CasaCard key={casa.id} casa={casa} />
          ))}
        </section>
        <footer className="bg-[#006FEE]/15 text-[#006FEE]/50 text-md text-center pt-7 pb-5">
          <a href="https://www.instagram.com/araf.innovations/">
            Powered by Araf Innovations 2024
          </a>
        </footer>
      </section>
      <FilterModal isOpen={isOpen} onOpenChange={onOpenChange} filter={filter} setFilter={setFilter} />
    </Navbar>
  );
}

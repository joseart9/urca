"use client";
import CasaCard from "@/app/components/CasaCard";
import { Spinner } from "@nextui-org/spinner";
import { useCasas } from "@/hooks/useCasas";
import Navbar from "@/app/components/Navbar";
import { Button, useDisclosure } from "@nextui-org/react";
import { useState, use } from "react";
import FilterModal from "@/app/components/FilterModal";
import { useRouter } from 'next/navigation'

export default function Categorias({
    params,
}: {
    params: Promise<{ type: string }>;
}) {
    const [filter, setFilter] = useState<any>({
        key: undefined,
        value: [0, 0],
    });
    const { type: typeKey } = use(params);
    const { casas, loading, error } = useCasas(filter, typeKey); // Pasa el filtro al hook
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    if (loading) return (
        <div className="flex justify-center items-center min-h-screen">
            <Spinner color="primary" />
        </div>
    );

    return (
        <Navbar>
            <section className="min-h-screen bg-slate-100">
                <div className="flex flex-row w-full items-center text-[#006FEE] bg-[#006FEE]/5 uppercase">
                    <div className="flex flex-row w-fit pb-1 pt-1 items-center justify-start text-left">
                        <Button radius="full" size="sm" className="bg-transparent" onPress={onOpen}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-[#006FEE] p-[2px]">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z" />
                            </svg>
                            <div className="flex flex-row items-center space-x-2">
                                <p className="text-[#006FEE] uppercase">
                                    {filter && filter.key
                                        ? filter.key === "tipoPropiedad"
                                            ? filter.value + "s"
                                            : filter.key
                                        : "Filtrar"}
                                </p>
                            </div>
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
            </section>
            <FilterModal isOpen={isOpen} onOpenChange={onOpenChange} filter={filter} setFilter={setFilter} />
            <footer className="bg-[#006FEE]/15 text-[#006FEE]/50 text-md text-center pt-7 pb-5">
                <a href="https://www.instagram.com/araf.innovations/">
                    Powered by Araf Innovations 2024
                </a>
            </footer>
        </Navbar>
    );
}

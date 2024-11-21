"use client";

import CasaCard from "@/app/admin/components/CasaCard";
import { useCasas } from "@/hooks/useCasas";
import { Spinner } from "@nextui-org/react";

export default function Admin() {
    const { casas, loading, error } = useCasas();

    if (loading) return (
        <div className="flex justify-center items-center min-h-screen">
            <Spinner color="primary" />
        </div>
    );

    return (
        <div>
            <h1 className="text-lg uppercase text-default-500 text-center pt-2">
                Propiedades
            </h1>
            <section className="flex flex-wrap justify-center gap-5 md:pl-40 md:pr-40">
                {casas.map((casa) => (
                    <CasaCard key={casa.id} casa={casa} />
                ))}
            </section>
        </div>
    );
}

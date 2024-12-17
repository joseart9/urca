"use client";
import CasaCard from "./CasaCard";
import { Spinner } from "@nextui-org/spinner";
import { useCasas } from "@/hooks/useCasas";
import Navbar from "@/app/components/Navbar";
import { Button, useDisclosure } from "@nextui-org/react";
import { useState } from "react";
import FilterModal from "@/app/components/FilterModal";
import { LuSettings2 } from "react-icons/lu";
import { IoClose } from "react-icons/io5";

export default function MobileViewMainComponent({ subFilter }: Readonly<{ subFilter?: any }>) {
    const [filter, setFilter] = useState<any>({
        key: undefined,
        value: [0, 0],
    });
    const { casas, loading, error } = useCasas(filter, subFilter); // Pasa el filtro al hook
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    if (loading) return (
        <div className="flex justify-center items-center min-h-screen">
            <Spinner color="primary" />
        </div>
    );

    return (
        <>
            <Navbar />
            <section className="w-full h-full min-h-screen bg-slate-100">
                <div className="flex flex-row w-full items-center text-[#006FEE] bg-[#006FEE]/5 uppercase">
                    <div className="flex flex-row w-full pb-1 pt-1 px-2 items-center justify-end text-right">
                        <Button radius="full" color="primary" variant="light" size="sm" className="" onPress={onOpen}>
                            <p className="text-[#006FEE] uppercase">
                                {filter && filter.key
                                    ? filter.key === "tipoPropiedad"
                                        ? filter.value + "s"
                                        : filter.key
                                    : "Ordenar por"}
                            </p>
                            <LuSettings2 className="text-[#006FEE] text-lg" />
                        </Button>
                        {filter.key !== undefined && (
                            <Button onPress={(e) => setFilter({ key: undefined, value: [0, 0] })} isIconOnly size="sm" className="bg-transparent text-[#006FEE]/80">
                                <IoClose className="text-primary text-lg" />
                            </Button>
                        )}
                    </div>
                </div>

                <section className="w-full grid grid-cols-1 justify-center gap-y-14">
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
        </>
    );
}



// "use client";

// import DesktopView from '@/app/components/DesktopView';

// import useScreenSize from '@/hooks/useScreenSize';
// import MobileView from '@/app/components/MobileView';

// export default function Home() {

//   const screenSize = useScreenSize();

//   switch (screenSize) {
//     case "mobile":
//     case "tablet":
//       return (
//         <MobileView />
//       );
//     case "desktop":
//       return (
//         <DesktopView />
//       );
//     default:
//       return (
//         <div>
//         </div>
//       );
//   }
// }


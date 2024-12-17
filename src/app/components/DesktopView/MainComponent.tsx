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

export default function DesktopViewMainComponent({ subFilter }: Readonly<{ subFilter?: any }>) {
    const [filter, setFilter] = useState<any>({
        key: undefined,
        value: [0, 0],
    });
    const { casas, loading, error } = useCasas(filter, subFilter);
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    if (loading) return (
        <div className="flex justify-center items-center min-h-screen">
            <Spinner color="primary" />
        </div>
    );

    return (
        <>
            <Navbar />
            <main className="flex flex-col flex-grow min-h-screen max-w-7xl container mx-auto gap-y-6">
                <div className="flex flex-row w-full pb-1 pt-1 items-center justify-end text-right container mx-auto">
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


                <section className="justify-items-center grid gap-y-10 w-full grid-cols-[repeat(auto-fill,minmax(500px,1fr))]">
                    {casas.map((casa) => (
                        <CasaCard key={casa.id} casa={casa} />
                    ))}
                </section>


                <FilterModal isOpen={isOpen} onOpenChange={onOpenChange} filter={filter} setFilter={setFilter} />
            </main>
            <footer className="bg-[#006FEE]/15 text-[#006FEE]/50 text-md text-center pt-7 mt-12 pb-5">
                <a href="https://www.instagram.com/araf.innovations/">
                    Powered by Araf Innovations 2024
                </a>
            </footer>
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


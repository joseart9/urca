"use client";
import { Spinner } from "@nextui-org/spinner";
import { useCasas } from "@/hooks/useCasas";
import Navbar from "@/app/components/Navbar";
import { Button, useDisclosure } from "@nextui-org/react";
import { useState, use } from "react";
import FilterModal from "@/app/components/FilterModal";
import { useRouter } from 'next/navigation'

import useScreenSize from "@/hooks/useScreenSize";
import MobileView from "@/app/components/MobileView";
import DesktopView from "@/app/components/DesktopView";

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

    const screenSize = useScreenSize();

    if (loading) return (
        <div className="flex justify-center items-center min-h-screen">
            <Spinner color="primary" />
        </div>
    );

    switch (screenSize) {
        case "mobile":
        case "tablet":
            return (
                <MobileView subFilter={typeKey} />
            );
        case "desktop":
            return (
                <DesktopView subFilter={typeKey} />
            );
        default:
            return (
                <div>
                </div>
            );
    }
}

"use client";

import { Card, CardHeader, CardBody, CardFooter, Divider, Link, useDisclosure } from "@nextui-org/react";
import { Casa } from "@/types/Casa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import CasaModal from "@/app/components/CasaModal";
import 'swiper/css/bundle';
import CasaInfo from "@/app/components/CasaInfo";
import { useRouter } from 'next/navigation'

// Iconos

export default function CasaCard({ casa }: Readonly<{ casa: Casa }>) {

    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const router = useRouter()

    return (
        <Card className="w-full md:h-fit md:w-[600px] rounded-none" shadow="md" isPressable onPress={() => router.push(`/admin/${casa.id}`)}>
            <CardHeader className="p-0">
                <Swiper
                    modules={[Pagination]}
                    pagination={{ dynamicBullets: true }}
                    spaceBetween={10}
                    slidesPerView={1}
                    className="w-full h-[300px] md:h-[500px] mySwiper custom-swiper"
                    loop
                >
                    {casa.imagenes?.map((imagen) => (
                        <SwiperSlide key={imagen.id}>
                            <img
                                alt={casa.nombre}
                                src={imagen.img}
                                className="w-full h-full object-cover"
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </CardHeader>
            <Divider />
            <CardBody>
                <div className="flex flex-col space-y-8">
                    <p className="text-lg md:text-2xl font-semibold">{casa.nombre}</p>
                    <CasaInfo casa={casa} />
                </div>
            </CardBody>
            <Divider />
            <CardFooter>
                <div className="flex flex-row w-full justify-between items-center p-2">
                    <p className="font-semibold text-lg md:text-2xl">${Number(casa.precio).toLocaleString()} MXN</p>
                </div>
            </CardFooter>
            {/* Modal para mostrar más información */}
            <CasaModal isOpen={isOpen} onOpenChange={onOpenChange} casa={casa} />
        </Card>
    );
}
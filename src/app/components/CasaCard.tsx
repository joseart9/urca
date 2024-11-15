"use client";

import { Card, CardHeader, CardBody, CardFooter, Divider, Link, useDisclosure } from "@nextui-org/react";
import { Button } from "@nextui-org/button";
import { Casa } from "@/types/Casa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import CasaModal from "./CasaModal";
import 'swiper/css/bundle';
import CasaInfo from "./CasaInfo";

// Iconos

export default function CasaCard({ casa }: Readonly<{ casa: Casa }>) {

    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    return (
        <Card className="w-full md:h-fit md:w-full rounded-none" shadow="md">
            <CardHeader className="p-0">
                <Swiper
                    modules={[Pagination]}
                    pagination={{ dynamicBullets: true }}
                    spaceBetween={10}
                    slidesPerView={1}
                    className="w-full h-full md:h-[400px] mySwiper custom-swiper"
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

            <CardFooter>
                <div className="flex flex-row w-full justify-between items-center p-2 text-center">
                    <p className="font-semibold text-lg md:text-2xl">${Number(casa.precio).toLocaleString()} MXN</p>

                    <Button color="primary" variant="solid" size="lg" className="md:text-xl" onPress={onOpen}>
                        Ver más
                    </Button>
                </div>
            </CardFooter>
            {/* Modal para mostrar más información */}
            <CasaModal isOpen={isOpen} onOpenChange={onOpenChange} casa={casa} />
        </Card>
    );
}
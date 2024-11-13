"use client";

import { Card, CardHeader, CardBody, CardFooter, Divider, Link, useDisclosure } from "@nextui-org/react";
import { Button } from "@nextui-org/button";
import { Casa } from "@/types/Casa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import CasaModal from "./CasaModal";
import 'swiper/css/bundle';

// Iconos

export default function CasaCard({ casa }: Readonly<{ casa: Casa }>) {

    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    return (
        <Card className="w-full md:h-fit md:w-[600px] rounded-none" shadow="md">
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
function CasaInfo({ casa }: Readonly<{ casa: Casa }>) {
    return (
        <div className="grid grid-cols-4 grid-flow-row w-full justify-around">
            <div className="flex flex-col align-middle text-center items-center">
                <img src="./terreno.svg" alt="Terreno" className="h-10 md:h-14 w-fit" />
                <p className="text-sm md:text-lg text-default-500 w-full overflow-hidden whitespace-nowrap text-ellipsis">{casa.terrenoTotal} m²</p>
            </div>
            <div className="flex flex-col align-middle text-center items-center">
                <img src="./recamara.svg" alt="Recámaras" className="h-10 md:h-14 w-fit" />
                <p className="text-sm md:text-lg text-default-500 w-full overflow-hidden whitespace-nowrap text-ellipsis">{casa.recamaras} Recamaras</p>
            </div>
            <div className="flex flex-col align-middle text-center items-center">
                <img src="./bano.svg" alt="Baños" className="h-10 w-fit md:h-14 fill-white" />
                <p className="text-sm md:text-lg text-default-500 w-full overflow-hidden whitespace-nowrap text-ellipsis">{casa.banos} Baños</p>
            </div>
            <div className="flex flex-col align-middle text-center items-center">
                <img src="./estacionamiento.svg" alt="Estacionamiento" className="h-10 md:h-14 w-fit mt-2" />
                <p className="-mt-2 text-sm md:text-lg text-default-500 w-full overflow-hidden whitespace-nowrap text-ellipsis">{casa.estacionamientos} Cajones</p>
            </div>
        </div>
    );
}
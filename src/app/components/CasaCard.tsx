"use client";

import { Card, CardHeader, CardBody, CardFooter, Divider, Chip, useDisclosure, Modal, ModalContent } from "@nextui-org/react";
import { Button } from "@nextui-org/button";
import { Casa } from "@/types/Casa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import CasaModal from "./CasaModal";
import 'swiper/css/bundle';
import CasaInfo from "./CasaInfo";
import { useState } from "react";

export default function CasaCard({ casa }: Readonly<{ casa: Casa }>) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [imageModalOpen, setImageModalOpen] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(0);

    const openImageModal = (index: number) => {
        setSelectedIndex(index);
        setImageModalOpen(true);
    };

    const closeImageModal = () => {
        setSelectedIndex(0);
        setImageModalOpen(false);
    };

    return (
        <>
            <Card className="h-auto hover:transition hover:ease-in-out hover:delay-150 w-full md:h-fit md:w-full rounded-none hover:shadow-2xl shadow-2xl md:shadow-md" shadow="md">
                <CardHeader className="p-0">
                    <Swiper
                        modules={[Pagination]}
                        pagination={{ dynamicBullets: true }}
                        spaceBetween={10}
                        slidesPerView={1}
                        className="w-full h-[500px] md:h-[500px] mySwiper custom-swiper"
                        loop
                    >
                        {casa.imagenes?.map((imagen, index) => (
                            <SwiperSlide key={imagen.id}>
                                <img
                                    alt={casa.nombre}
                                    src={imagen.img}
                                    className="w-full h-full object-cover cursor-pointer"
                                    onClick={() => openImageModal(index)}
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </CardHeader>
                <Divider />
                <CardBody>
                    <div className="flex flex-col space-y-8">
                        <section className="flex flex-row justify-between items-center">
                            <p className="text-lg md:text-2xl font-semibold">{casa.nombre}</p>
                            <Chip color="primary" size="md" className="w-fit uppercase" variant="flat" >
                                {casa.tipoPropiedad === "casa" ? "Casa" : "Departamento"} {casa.tipoOperacion === "venta" ? "en Venta" : "en Renta"}
                            </Chip>
                        </section>

                        <CasaInfo casa={casa} />
                    </div>
                </CardBody>

                <CardFooter>
                    <div className="flex flex-row w-full justify-between items-center p-2 text-center">
                        <p className="font-semibold text-lg md:text-2xl">${Number(casa.precio).toLocaleString()} MXN</p>

                        <Button color="primary" variant="solid" size="lg" className="md:text-xl uppercase" onPress={onOpen}>
                            Ver más
                        </Button>
                    </div>
                </CardFooter>
                {/* Modal para mostrar más información */}
                <CasaModal isOpen={isOpen} onOpenChange={onOpenChange} casa={casa} />
            </Card>

            {/* Modal para mostrar todas las imágenes */}
            <Modal isOpen={imageModalOpen} hideCloseButton onClose={closeImageModal} disableAnimation size="full" className="bg-black/80">
                <ModalContent className="relative flex items-center justify-center h-full p-0">
                    {/* Botón de cierre */}
                    <Button
                        onClick={closeImageModal}
                        className="absolute top-4 right-4 z-10 rounded-full bg-transparent text-white font-bold"
                        isIconOnly
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>
                    </Button>

                    {/* Swiper */}
                    <Swiper
                        modules={[Navigation]}
                        navigation
                        initialSlide={selectedIndex}
                        spaceBetween={10}
                        slidesPerView={1}
                        className="w-full h-full"
                        loop
                    >
                        {casa.imagenes?.map((imagen) => (
                            <SwiperSlide key={imagen.id}>
                                <img
                                    src={imagen.img}
                                    alt={casa.nombre}
                                    className="w-full h-full object-contain"
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </ModalContent>
            </Modal>
        </>
    );
}

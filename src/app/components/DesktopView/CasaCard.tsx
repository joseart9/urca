"use client";

import { Card, CardHeader, CardBody, CardFooter, Divider, Chip, useDisclosure, Modal, ModalContent } from "@nextui-org/react";
import { Button } from "@nextui-org/button";
import { Casa } from "@/types/Casa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import CasaModal from "@/app/components/CasaModal";
import 'swiper/css/bundle';
import 'swiper/css/navigation';
import CasaInfo from "@/app/components/CasaInfo";
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
            <Card className="h-[830px] w-[500px] bg-transparent" shadow="none">
                <CardHeader className="p-0">
                    <Swiper
                        modules={[Navigation]}
                        navigation
                        pagination={{ dynamicBullets: true }}
                        spaceBetween={10}
                        slidesPerView={1}
                        className="w-full h-[400px] aspect-[1/1] custom-swiper"
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

                <CardBody className="w-full">
                    <div className="flex flex-col space-y-8 min-w-full">
                        <section className="flex flex-row w-full justify-between items-center">
                            <p className="text-lg md:text-xl font-semibold w-full text-ellipsis line-clamp-2 min-h-[4rem]">
                                {casa.nombre}
                            </p>
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

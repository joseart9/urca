import { Casa } from "@/types/Casa";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Divider } from "@nextui-org/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import 'swiper/css/bundle';

import CasaInfo from "./CasaInfo";

const WaIcon = () => (
    <img src="./wa.svg" alt="WhatsApp" className="h-6 w-6" />
);

export default function CasaModal({ isOpen, onOpenChange, casa }: Readonly<{ isOpen: boolean, onOpenChange: (open: boolean) => void, casa: Casa }>) {
    return (
        <>
            <Modal size="xl" hideCloseButton isOpen={isOpen} onOpenChange={onOpenChange} placement="bottom-center" scrollBehavior="inside" >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1 text-default-800">{casa.nombre}</ModalHeader>
                            <ModalBody className="flex flex-col space-y-4">
                                <div className="flex-grow-0 h-[300px] md:h-[500px]">
                                    <Swiper
                                        modules={[Pagination]}
                                        pagination={{ dynamicBullets: true }}
                                        spaceBetween={10}
                                        slidesPerView={1}
                                        className="w-full h-full mySwiper custom-swiper rounded-xl"
                                        loop
                                    >
                                        {casa.imagenes?.map((imagen) => (
                                            <SwiperSlide key={imagen.id}>
                                                <img
                                                    alt={casa.nombre}
                                                    src={imagen.img}
                                                    className="w-full h-full object-cover rounded-xl"
                                                />
                                            </SwiperSlide>
                                        ))}
                                    </Swiper>
                                </div>
                                <CasaInfo casa={casa} />
                                <Divider />
                                <p className="whitespace-pre-wrap text-default-800 text-md">{casa.descripcion}</p>
                            </ModalBody>
                            <ModalFooter>
                                <div className="flex flex-row items-center justify-between w-full p-2">


                                    <h1 className="font-semibold text-lg text-default-800">
                                        ${Number(casa.precio).toLocaleString()} MXN
                                    </h1>
                                    <a href={`https://wa.me/528181611745?text=Hola,%20estoy%20interesado/a%20en%20obtener%20más%20información%20sobre%20una%20propiedad.%20¿Podría%20darme%20detalles%20adicionales%20de%20${casa.nombre}?%20Gracias!`}>
                                        <Button color="primary" className="text-lg" size="md">
                                            <WaIcon />Informes
                                        </Button>
                                    </a>
                                </div>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal >
        </>
    );
}
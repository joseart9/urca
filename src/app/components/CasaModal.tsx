import { Casa } from "@/types/Casa";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Divider, Chip } from "@nextui-org/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import 'swiper/css/bundle';
import 'swiper/css/navigation';

import CasaInfo from "./CasaInfo";

const WaIcon = () => (
    <img src="/wa.svg" alt="WhatsApp" className="h-6 w-6" />
);

export default function CasaModal({ isOpen, onOpenChange, casa }: Readonly<{ isOpen: boolean, onOpenChange: (open: boolean) => void, casa: Casa }>) {
    return (
        <>
            <Modal className="overflow-auto" size="full" hideCloseButton isOpen={isOpen} onOpenChange={onOpenChange} placement="bottom-center" scrollBehavior="inside" >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="items-center w-full p-2 md:p-4 flex flex-col text-default-800 overflow-x-hidden">
                                <div className="max-w-3xl md:px-4 flex flex-row justify-between items-center align-middle w-full">
                                    <section className="flex flex-row items-center text-center">
                                        <Button onPress={onClose} isIconOnly className="rounded-full bg-transparent flex items-center justify-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                                            </svg>
                                        </Button>
                                    </section>
                                    <Chip color="primary" size="md" className="w-fit uppercase" variant="flat" >
                                        {casa.tipoPropiedad === "casa" ? "Casa" : casa.tipoPropiedad === "departamento" ? "Depa" : ""} {casa.tipoOperacion === "venta" ? "en Venta" : "en Renta"}
                                    </Chip>
                                </div>
                            </ModalHeader>
                            <ModalBody className="flex flex-col h-full max-w-3xl space-y-4 w-full p-0 overflow-x-hidden mx-auto container">
                                <p className="text-md font-semibold md:text-xl px-4">{casa.nombre}</p>
                                <div className="flex-grow-0 w-full h-[400px] flex items-center justify-center">
                                    <Swiper
                                        modules={[Navigation]}
                                        navigation
                                        spaceBetween={10}
                                        slidesPerView={1}
                                        className="w-full h-full mySwiper custom-swiper rounded overflow-hidden"
                                        loop
                                    >
                                        {casa.imagenes?.map((imagen) => (
                                            <SwiperSlide key={imagen.id} className="flex items-center justify-center">
                                                <img
                                                    alt={casa.nombre}
                                                    src={imagen.img}
                                                    className="h-full w-auto max-h-full object-contain mx-auto"
                                                />
                                            </SwiperSlide>
                                        ))}
                                    </Swiper>
                                </div>
                                <div className="py-1" />

                                <p className="whitespace-pre-wrap text-default-800 text-md px-4">{casa.descripcion}</p>

                                <div className="py-1" />

                                <Divider />

                                <div className="py-1" />
                                <div className="flex w-full items-center justify-center">
                                    <div className="max-w-lg">
                                        <CasaInfo casa={casa} /></div>
                                </div>

                            </ModalBody>
                            <ModalFooter>
                                <div className="flex flex-row items-center justify-around w-full overflow-x-hidden">
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
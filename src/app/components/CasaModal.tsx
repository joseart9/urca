import { Casa } from "@/types/Casa";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Divider } from "@nextui-org/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import 'swiper/css/bundle';

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
                                <p className="text-default-800 text-md">{casa.descripcion}</p>
                            </ModalBody>
                            <ModalFooter>
                                <div className="flex flex-row items-center justify-between w-full p-2">


                                    <h1 className="font-semibold text-lg text-default-800">
                                        ${Number(casa.precio).toLocaleString()} MXN
                                    </h1>
                                    <Button color="primary" className="text-lg" size="md" onPress={onClose}>
                                        <WaIcon />Informes
                                    </Button>
                                </div>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
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
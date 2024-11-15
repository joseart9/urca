import { Casa } from "@/types/Casa";
import { Chip, Tooltip } from "@nextui-org/react";

export default function CasaInfo({ casa }: Readonly<{ casa: Casa }>) {
    return (
        <div className="grid grid-cols-3 grid-flow-row w-full justify-around text-center items-center">
            <div className="flex flex-col align-middle text-center items-center">
                <Tooltip color="primary" showArrow content="Terreno de Total" placement="top" className="font-bold">
                    <img src="./terrenoTotal.svg" alt="Terreno" className="h-10 md:h-14 w-fit" />
                </Tooltip>
                <p className="text-sm md:text-lg text-default-500 w-full overflow-hidden whitespace-nowrap text-ellipsis">{casa.terrenoTotal} m²</p>
            </div>
            <div className="flex flex-col align-middle text-center items-center">
                <Tooltip color="primary" showArrow content="Terreno de Construcción" placement="top" className="font-bold">
                    <img src="./terrenoConstruccion.svg" alt="Terreno" className="h-10 md:h-14 w-fit" />
                </Tooltip>
                <p className="text-sm md:text-lg text-default-500 w-full overflow-hidden whitespace-nowrap text-ellipsis">{casa.terrenoConstruccion} m²</p>
            </div>
            <div className="flex flex-col align-middle text-center items-center">
                <Tooltip color="primary" showArrow content="Número de Recámaras" placement="top" className="font-bold">
                    <img src="./recamara.svg" alt="Recámaras" className="h-10 md:h-14 w-fit" />
                </Tooltip>
                <p className="text-sm md:text-lg text-default-500 w-full overflow-hidden whitespace-nowrap text-ellipsis">{casa.recamaras} Recámaras</p>
            </div>
            <div className="flex flex-col align-middle text-center items-center">
                <Tooltip color="primary" showArrow content="Número de Baños" placement="top" className="font-bold">
                    <img src="./bano.svg" alt="Baños" className="h-10 w-fit md:h-14" />
                </Tooltip>
                <p className="text-sm md:text-lg text-default-500 w-full overflow-hidden whitespace-nowrap text-ellipsis">{casa.banos} Baños</p>
            </div>
            <div className="flex flex-col align-middle text-center items-center">
                <Tooltip color="primary" showArrow content="Número de Cajones de Estacionamiento" placement="top" className="font-bold">
                    <img src="./estacionamiento.svg" alt="Estacionamiento" className="h-10 md:h-14 w-fit" />
                </Tooltip>
                <p className="-mt-2 text-sm md:text-lg text-default-500 w-full overflow-hidden whitespace-nowrap text-ellipsis">{casa.estacionamientos} Cajones</p>
            </div>
            <div className="flex flex-col align-middle text-center items-center">
                <Chip color="primary" size="lg" className="w-fit uppercase" variant="flat" >
                    {casa.antiguedad === "nueva" ? "A Estrenar" : Number(casa.antiguedad) === 1 ? "1 Año" : `${casa.antiguedadTiempo} Años`}
                </Chip>
            </div>
        </div>
    );
}
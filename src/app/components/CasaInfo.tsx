import { Casa } from "@/types/Casa";

export default function CasaInfo({ casa }: Readonly<{ casa: Casa }>) {
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
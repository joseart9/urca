"use client";

import { Button, Input } from "@nextui-org/react";
import { useState } from "react";
import ImageUpload from "./components/ImageUpload";
import { uploadImageToImgBB } from "@/utils/uploadImageToImgBB";
import { CasaImg } from "@/types/CasaImg";
import { Casa } from "@/types/Casa";
import { v4 as uuidv4 } from "uuid";
import { addCasa } from "@/server";

export default function Admin() {
    const [images, setImages] = useState<File[]>([null as any]);
    const [formData, setFormData] = useState<Casa>({
        id: uuidv4(),
        nombre: "",
        precio: 0,
        terrenoTotal: 0,
        recamaras: 0,
        banos: 0,
        estacionamientos: 0,
        antiguedad: "nueva",
        descripcion: "",
        imagenes: []
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    async function handleSave() {
        // Cargar imágenes a ImgBB
        const uploadedImages = await Promise.all(
            images.map(async (image) => {
                if (image !== null) {
                    const imgData = await uploadImageToImgBB(image);
                    return { id: imgData.id, img: imgData.img } as CasaImg;
                }
                return null;
            })
        );

        // Filtrar imágenes válidas
        const validImages = uploadedImages.filter((img) => img !== null) as CasaImg[];

        // Crear un objeto `casa` actualizado con las imágenes válidas
        const casaData: Casa = {
            ...formData,
            imagenes: validImages,
        };

        // Guardar en la base de datos
        try {
            await addCasa(casaData);
            alert("Casa guardada");
        } catch (error) {
            alert("Error al guardar la casa");
        }
    }

    return (
        <div>
            <section>
                <ImageUpload images={images} setImages={setImages} />
            </section>
            <section>
                <form className="flex h-full flex-col p-2 space-y-3">
                    <Input
                        variant="bordered"
                        color="primary"
                        name="nombre"
                        label="Nombre"
                        value={formData.nombre}
                        onChange={handleInputChange}
                        size="lg"
                    />
                    <Input
                        variant="bordered"
                        color="primary"
                        name="precio"
                        label="Precio"
                        value={formData.precio?.toString()}
                        onChange={handleInputChange}
                        size="lg"
                    />
                    <Input
                        variant="bordered"
                        color="primary"
                        name="terrenoTotal"
                        label="Terreno Total"
                        value={formData.terrenoTotal?.toString()}
                        onChange={handleInputChange}
                        size="lg"
                    />
                    <Input
                        variant="bordered"
                        color="primary"
                        name="recamaras"
                        label="Recamaras"
                        value={formData.recamaras?.toString()}
                        onChange={handleInputChange}
                        size="lg"
                    />
                    <Input
                        variant="bordered"
                        color="primary"
                        name="banos"
                        label="Baños"
                        value={formData.banos?.toString()}
                        onChange={handleInputChange}
                        size="lg"
                    />
                    <Input
                        variant="bordered"
                        color="primary"
                        name="estacionamientos"
                        label="Estacionamientos"
                        value={formData.estacionamientos?.toString()}
                        onChange={handleInputChange}
                        size="lg"
                    />
                    <Input
                        variant="bordered"
                        color="primary"
                        name="antiguedad"
                        label="Antiguedad"
                        value={formData.antiguedad}
                        onChange={handleInputChange}
                        size="lg"
                    />
                    <Input
                        variant="bordered"
                        color="primary"
                        name="descripcion"
                        label="Descripcion"
                        value={formData.descripcion}
                        onChange={handleInputChange}
                        size="lg"
                    />
                    <Button color="primary" onPress={handleSave} variant="solid">
                        Guardar
                    </Button>
                </form>
            </section>
        </div>
    );
}

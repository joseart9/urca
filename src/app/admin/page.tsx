"use client";

import { Button, Input, Select, SelectItem, Textarea } from "@nextui-org/react";
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
    const [loading, setLoading] = useState(false);

    const casaAntiguedad = [
        { key: "nueva", label: "Nueva" },
        { key: "usada", label: "Usada" },
    ];

    const handleInputChange = (e: any) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    async function handleSave() {
        setLoading(true);
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
            setLoading(false);
            setFormData({
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
        } catch (error) {
            setLoading(false);
            setFormData({
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
        }
    }

    return (
        <div className="flex flex-col min-h-screen">
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
                        type="number"
                        value={formData.precio?.toString()}
                        onChange={handleInputChange}
                        size="lg"
                    />
                    <Input
                        variant="bordered"
                        color="primary"
                        name="terrenoTotal"
                        label="Terreno Total"
                        type="number"
                        value={formData.terrenoTotal?.toString()}
                        onChange={handleInputChange}
                        size="lg"
                    />
                    <Input
                        variant="bordered"
                        color="primary"
                        name="recamaras"
                        label="Recamaras"
                        type="number"
                        value={formData.recamaras?.toString()}
                        onChange={handleInputChange}
                        size="lg"
                    />
                    <Input
                        variant="bordered"
                        color="primary"
                        name="banos"
                        label="Baños"
                        type="number"
                        value={formData.banos?.toString()}
                        onChange={handleInputChange}
                        size="lg"
                    />
                    <Input
                        variant="bordered"
                        color="primary"
                        name="estacionamientos"
                        label="Estacionamientos"
                        type="number"
                        value={formData.estacionamientos?.toString()}
                        onChange={handleInputChange}
                        size="lg"
                    />
                    <Select
                        variant="bordered"
                        color="primary"
                        name="antiguedad"
                        label="Antiguedad"
                        selectedKeys={[formData.antiguedad] as string[]}
                        onChange={handleInputChange}
                        size="lg"
                    >
                        {casaAntiguedad.map((option) => (
                            <SelectItem key={option.key} value={option.key}>
                                {option.label}
                            </SelectItem>
                        ))}
                    </Select>
                    <Textarea
                        variant="bordered"
                        color="primary"
                        name="descripcion"
                        label="Descripcion"
                        value={formData.descripcion}
                        onChange={handleInputChange}
                        size="lg"
                    />
                </form>
            </section>
            <section>
                <ImageUpload images={images} setImages={setImages} />
            </section>
            <div className="flex w-full p-2 justify-end">
                <Button color="primary" onPress={handleSave} variant="solid" isLoading={loading}>
                    Guardar
                </Button>
            </div>

        </div>
    );
}

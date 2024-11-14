"use client";

import { Button, Input, Select, SelectItem, Textarea } from "@nextui-org/react";
import { useState } from "react";
import ImageUpload from "@/app/admin/components/ImageUpload";
import { uploadImageToImgBB } from "@/utils/uploadImageToImgBB";
import { CasaImg } from "@/types/CasaImg";
import { Casa } from "@/types/Casa";
import { v4 as uuidv4 } from "uuid";
import { addCasa } from "@/server";
import alert from "@/utils/Alert";

export default function Admin() {
    const [images, setImages] = useState<File[]>([null as any]);
    const [formData, setFormData] = useState<Casa>({
        id: uuidv4(),
        nombre: "",
        precio: undefined,
        terrenoTotal: undefined,
        terrenoConstruccion: undefined,
        recamaras: undefined,
        banos: undefined,
        estacionamientos: undefined,
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
        const { name, value } = e.target;

        if (name === "precio") {
            // Remueve las comas antes de guardar en el estado
            const numericValue = Number(value.replace(/,/g, ""));
            setFormData({ ...formData, [name]: numericValue });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    // Función para agregar comas como separadores de miles
    const formatNumberWithCommas = (num: number | undefined) => {
        if (num === undefined) return "";
        return num.toLocaleString("en-US");
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
                precio: undefined,
                terrenoTotal: undefined,
                terrenoConstruccion: undefined,
                recamaras: undefined,
                banos: undefined,
                estacionamientos: undefined,
                antiguedad: "nueva",
                descripcion: "",
                imagenes: []
            });
            alert("Casa guardada", "success");
            setImages([null as any]);
        } catch (error) {
            setLoading(false);
            alert("Error al guardar la casa, contacte a un administrador", "error");
            console.log("Error al guardar la casa: ", error);
        }
    }

    return (
        <div className="flex flex-col min-h-screen md:pl-52 md:pr-52">
            <h1 className="text-lg uppercase text-default-300 text-center pt-2">
                Agregar Casa
            </h1>
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
                        type="text"
                        value={formatNumberWithCommas(formData.precio)}
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
                        name="terrenoConstruccion"
                        label="Terreno Construccion"
                        type="number"
                        value={formData.terrenoConstruccion?.toString()}
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

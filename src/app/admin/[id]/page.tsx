"use client";

import { getCasaById, updateCasa, deleteCasa } from "@/server";
import { Casa } from "@/types/Casa";
import { use, useState, useEffect } from "react";
import { Button, Input, Modal, ModalContent, ModalFooter, Select, SelectItem, Spinner, Textarea } from "@nextui-org/react";
import alert from "@/utils/Alert";
import { uploadImageToImgBB } from "@/utils/uploadImageToImgBB";
import ImageUpload from "@/app/admin/components/ImageUpload";
import { CasaImg } from "@/types/CasaImg";
import { useRouter } from 'next/navigation'

export default function AdminEdit({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const [images, setImages] = useState<File[]>([null as any]);
    const [imagesSaved, setImagesSaved] = useState<CasaImg[]>([]);
    const [formData, setFormData] = useState<Casa>({
        id: '',
        nombre: '',
        precio: 0,
        terrenoTotal: 0,
        terrenoConstruccion: 0,
        recamaras: 0,
        banos: 0,
        estacionamientos: 0,
        antiguedad: 'nueva',
        antiguedadTiempo: 0,
        descripcion: '',
        imagenes: []
    });

    const [loading, setLoading] = useState(true);
    const [loadingSave, setLoadingSave] = useState(false);
    const [loadingDelete, setLoadingDelete] = useState(false);
    const { id: casaId } = use(params);
    const [error, setError] = useState(false);

    const router = useRouter();

    const [isModalOpen, setIsModalOpen] = useState(false); // Estado para el modal

    useEffect(() => {
        setLoading(true);
        getCasaById(casaId).then((data) => {
            if (data) {
                setFormData({
                    id: data.id,
                    nombre: data.nombre || '',
                    precio: data.precio || 0,
                    terrenoTotal: data.terrenoTotal || 0,
                    terrenoConstruccion: data.terrenoConstruccion || 0,
                    recamaras: data.recamaras || 0,
                    banos: data.banos || 0,
                    estacionamientos: data.estacionamientos || 0,
                    antiguedad: data.antiguedad || 'nueva',
                    antiguedadTiempo: data.antiguedadTiempo || 0,
                    descripcion: data.descripcion || '',
                    imagenes: data.imagenes || [],
                    tipoPropiedad: data.tipoPropiedad || 'casa',
                    tipoOperacion: data.tipoOperacion || 'venta'
                });
                setImagesSaved(data.imagenes || []);
            } else {
                alert("Casa no encontrada", "error");
                setLoading(false);
                setError(true);

            }
            setLoading(false);
        });
    }, [casaId]);

    const casaAntiguedad = [
        { key: "nueva", label: "Nueva" },
        { key: "usada", label: "Usada" },
    ];

    const casaTipoPropiedad = [
        { key: "casa", label: "Casa" },
        { key: "departamento", label: "Departamento" },
        { key: "otro", label: "Otros" },
    ];

    const casaTipoOperacion = [
        { key: "venta", label: "Venta" },
        { key: "renta", label: "Renta" },
    ];

    const handleInputChange = (e: any) => {
        const { name, value } = e.target;

        if (name === "precio") {
            // Remueve las comas antes de guardar en el estado
            const numericValue = Number(value.replace(/,/g, ""));
            setFormData({ ...formData, [name]: numericValue });
        } else if (name === "terrenoTotal" || name === "terrenoConstruccion" || name === "recamaras" || name === "banos" || name === "estacionamientos" || name === "antiguedadTiempo") {
            setFormData({ ...formData, [name]: Number(value) });
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
        setLoadingSave(true);
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
        if (formData.imagenes) {
            validImages.push(...imagesSaved);
        }

        // Crear un objeto `casa` actualizado con las imágenes válidas
        const casaData: Casa = {
            ...formData,
            imagenes: validImages,
        };

        // Guardar en la base de datos
        try {
            await updateCasa(casaData.id, casaData);
            setLoadingSave(false);
            alert("Casa guardada", "success");
            setImages([null as any]);
        } catch (error) {
            setLoadingSave(false);
            setImages([null as any]);
            alert("Error al guardar la casa, contacte a un administrador", "error");
            console.log("Error al guardar la casa: ", error);
        }
    }

    if (loading) return (
        <div className="flex justify-center items-center min-h-screen">
            <Spinner color="primary" />
        </div>
    );

    if (error) return (
        <div className="flex justify-center items-center min-h-screen">
            <h1 className="text-lg uppercase text-default-300 text-center pt-2">
                Casa no encontrada
            </h1>
        </div>
    );


    function handleDelete(e: any): void {
        setLoadingDelete(true);
        deleteCasa(formData.id).then(() => {
            alert("Casa eliminada", "success");
            setLoadingDelete(false);
            router.push(`/admin`);
        }).catch((error) => {
            alert("Error al eliminar la casa, contacte a un administrador", "error");
            console.log("Error al eliminar la casa: ", error);
            setLoadingDelete(false);
        });
    }

    return (
        <div className="flex flex-col min-h-screen md:pl-52 md:pr-52">
            <h1 className="text-lg uppercase text-default-500 text-center pt-2">
                Editar Propiedad
            </h1>
            <section>
                <form className="flex h-full flex-col p-2 space-y-3">
                    <Input
                        variant="bordered"
                        color="primary"
                        name="nombre"
                        label="Título"
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
                        label="Metros de Terreno"
                        type="number"
                        value={formData.terrenoTotal?.toString()}
                        onChange={handleInputChange}
                        size="lg"
                    />
                    <Input
                        variant="bordered"
                        color="primary"
                        name="terrenoConstruccion"
                        label="Metros de Construcción"
                        type="number"
                        value={formData.terrenoConstruccion?.toString()}
                        onChange={handleInputChange}
                        size="lg"
                    />
                    <Input
                        variant="bordered"
                        color="primary"
                        name="recamaras"
                        label="Recámaras"
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
                        name="tipoPropiedad"
                        label="Tipo de Propiedad"
                        selectedKeys={[formData.tipoPropiedad] as string[]}
                        onChange={handleInputChange}
                        size="lg"
                    >
                        {casaTipoPropiedad.map((option) => (
                            <SelectItem key={option.key} value={option.key}>
                                {option.label}
                            </SelectItem>
                        ))}
                    </Select>
                    <Select
                        variant="bordered"
                        color="primary"
                        name="tipoOperacion"
                        label="Tipo de Operación"
                        selectedKeys={[formData.tipoOperacion] as string[]}
                        onChange={handleInputChange}
                        size="lg"
                    >
                        {casaTipoOperacion.map((option) => (
                            <SelectItem key={option.key} value={option.key}>
                                {option.label}
                            </SelectItem>
                        ))}
                    </Select>
                    <Select
                        variant="bordered"
                        color="primary"
                        name="antiguedad"
                        label="Antigüedad"
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
                    {formData.antiguedad === "usada" && (
                        <Input
                            variant="bordered"
                            color="primary"
                            name="antiguedadTiempo"
                            label="Años de Antigüedad"
                            type="number"
                            value={formData.antiguedadTiempo?.toString()}
                            onChange={handleInputChange}
                            size="lg"
                        />
                    )}
                    <Textarea
                        variant="bordered"
                        color="primary"
                        name="descripcion"
                        label="Descripción"
                        value={formData.descripcion}
                        onChange={handleInputChange}
                        size="lg"
                    />
                </form>
            </section>
            <section>
                <ImageUpload images={images} setImages={setImages} imagesSaved={imagesSaved} setImagesSaved={setImagesSaved} />
            </section>
            <div className="flex w-full p-2 justify-between">
                <Button color="danger" onPress={() => setIsModalOpen(true)} variant="flat" isLoading={loadingDelete}>
                    Eliminar
                </Button>
                <Button color="primary" onPress={handleSave} variant="solid" isLoading={loadingSave}>
                    Guardar
                </Button>
            </div>

            {/* Modal de confirmación */}
            <Modal isOpen={isModalOpen} hideCloseButton onClose={() => setIsModalOpen(false)}>
                <ModalContent>
                    <div className="p-4">
                        <h3 className="text-lg font-semibold text-default-500">¿Estás seguro de que deseas eliminar esta propiedad?</h3>
                        <p className="text-sm text-default-400 mt-2">
                            Esta acción no se puede deshacer y eliminará permanentemente la información de esta propiedad.
                        </p>
                    </div>
                    <ModalFooter>
                        <Button color="default" variant="bordered" onPress={() => setIsModalOpen(false)}>
                            Cancelar
                        </Button>
                        <Button color="danger" onPress={handleDelete} isLoading={loadingDelete}>
                            Confirmar
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
    )
}

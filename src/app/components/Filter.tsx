"use client";

import { Select, SelectItem } from "@nextui-org/react";
import { Slider, SliderValue } from "@nextui-org/react";
import { useEffect } from "react";

export default function Filter({ filter, setFilter, classNames, variant }: { filter: any, setFilter: any, classNames?: string, variant?: "flat" | "underlined" }) {
    const filters = [
        { key: "precio", label: "Precio", defaultValue: [1, 30000000] },
        { key: "recamaras", label: "Habitaciones", defaultValue: [1, 10] },
        { key: "banos", label: "Baños", defaultValue: [1, 10] },
        { key: "estacionamientos", label: "Estacionamientos", defaultValue: [1, 10] },
        { key: "terrenoConstruccion", label: "Área", defaultValue: [1, 1000] },
        { key: "antiguedad", label: "Antigüedad", defaultValue: [1, 50] }
    ];

    const handleInputChange = (selectedKey: string) => {
        const selectedFilter = filters.find((f) => f.key === selectedKey);
        if (selectedFilter) {
            setFilter({
                key: selectedFilter.key,
                value: selectedFilter.defaultValue,
            });
        }
    };

    const handleSliderChange = (value: SliderValue) => {
        setFilter({ ...filter, value: value });
    };

    return (
        <div className="flex flex-col w-full space-y-4">
            <Select
                radius="full"
                name="key"
                color="default"
                variant="underlined"
                placeholder="Filtrar por"
                selectionMode="single"
                selectedKeys={filter.key ? [filter.key] : []}
                onSelectionChange={(keys) => handleInputChange(String(Array.from(keys)[0]))}
            >
                {filters.map((f) => (
                    <SelectItem key={f.key} value={f.key}>
                        {f.label}
                    </SelectItem>
                ))}
            </Select>

            {filter.key === "precio" && (
                <Slider
                    label="Precio"
                    minValue={0}
                    maxValue={30000000}
                    step={10000}
                    formatOptions={{ style: "currency", currency: "USD" }}
                    value={filter.value}
                    onChange={handleSliderChange}
                    renderLabel={() => " "}
                />
            )}

            {filter.key === "recamaras" && (
                <Slider
                    label="Habitaciones"
                    minValue={0}
                    maxValue={10}
                    value={filter.value}
                    onChange={handleSliderChange}
                    renderValue={() => `${filter.value[0]} - ${filter.value[1]}`}
                />
            )}

            {filter.key === "banos" && (
                <Slider
                    label="Baños"
                    minValue={0}
                    maxValue={10}
                    value={filter.value}
                    onChange={handleSliderChange}
                    renderValue={() => `${filter.value[0]} - ${filter.value[1]}`}
                />
            )}

            {filter.key === "estacionamientos" && (
                <Slider
                    label="Estacionamientos"
                    minValue={0}
                    maxValue={10}
                    value={filter.value}
                    onChange={handleSliderChange}
                    renderValue={() => `${filter.value[0]} - ${filter.value[1]}`}
                />
            )}

            {filter.key === "terrenoConstruccion" && (
                <Slider
                    label="Área"
                    minValue={0}
                    maxValue={1000}
                    value={filter.value}
                    onChange={handleSliderChange}
                    renderValue={() => `${filter.value[0]} - ${filter.value[1]} m²`}
                />
            )}
        </div>
    );
}

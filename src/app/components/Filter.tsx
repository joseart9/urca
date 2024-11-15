"use client";

import { Select, SelectItem } from "@nextui-org/react";
import { Slider, SliderValue } from "@nextui-org/react";
import { useState } from "react";

export default function Filter({ filter, setFilter, classNames, variant }: { filter: any, setFilter: any, classNames?: string, variant?: "flat" | "underlined" }) {
    const filters = [
        { key: "precio", label: "Precio" },
        { key: "recamaras", label: "Habitaciones" },
        { key: "banos", label: "Baños" },
        { key: "estacionamientos", label: "Garajes" },
        { key: "terrenoConstruccion", label: "Área" },
        { key: "antiguedad", label: "Antigüedad" },
    ]

    const handleInputChange = (e: any) => {
        const { name, value } = e.target;
        setFilter({ ...filter, [name]: value });
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
                selectedKeys={filter ? [filter.key] : []}
                onClick={() => setFilter({ value: [0, 0] })}
                onChange={handleInputChange}>
                {filters.map((filter) => (
                    <SelectItem key={filter.key} value={filter.key}>
                        {filter.label}
                    </SelectItem>
                ))}
            </Select >
            {filter.key === "precio" && (
                <Slider
                    label="Precio"
                    minValue={0}
                    maxValue={30000000}
                    step={10000}
                    formatOptions={{ style: "currency", currency: "USD" }}
                    value={filter.value}
                    onChange={handleSliderChange}
                    renderLabel={(value) => " "}
                />
            )}

            {filter.key === "recamaras" && (
                <Slider
                    label="Habitaciones"
                    minValue={0}
                    maxValue={10}
                    value={filter.value}
                    onChange={handleSliderChange}
                    renderLabel={(value) => ``}
                    renderValue={(value) => `${filter.value}`}
                />
            )}

            {filter.key === "banos" && (
                <Slider
                    label="Baños"
                    minValue={0}
                    maxValue={10}
                    value={filter.value}
                    onChange={handleSliderChange}
                    renderLabel={(value) => ``}
                    renderValue={(value) => `${filter.value}`}
                />
            )}

            {filter.key === "estacionamientos" && (
                <Slider
                    label="Garajes"
                    minValue={0}
                    maxValue={10}
                    value={filter.value}
                    onChange={handleSliderChange}
                    renderLabel={(value) => ``}
                    renderValue={(value) => `${filter.value}`}
                />
            )}

            {filter.key === "terrenoConstruccion" && (
                <Slider
                    label="Área"
                    minValue={0}
                    maxValue={1000}
                    value={filter.value}
                    onChange={handleSliderChange}
                    renderLabel={(value) => ``}
                    renderValue={(value) => `${filter.value} m²`}
                />
            )}
        </div>
    );
}
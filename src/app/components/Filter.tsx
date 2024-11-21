"use client";

import { Select, SelectItem } from "@nextui-org/react";
import { Slider, SliderValue } from "@nextui-org/react";

export default function Filter({
    filter,
    setFilter,
    classNames,
    variant,
}: {
    filter: any;
    setFilter: any;
    classNames?: string;
    variant?: "flat" | "underlined";
}) {
    const filters = [
        { key: "precio", label: "Precio", defaultValue: [1, 30000000], type: "range" },
        { key: "tipoPropiedad", label: "Casas", defaultValue: "casa", type: "property" },
        { key: "tipoPropiedad", label: "Departamentos", defaultValue: "departamento", type: "property" },
        { key: "tipoPropiedad", label: "Otros", defaultValue: "otro", type: "property" },
    ];

    const handleInputChange = (selectedLabel: string) => {
        const selectedFilter = filters.find((f) => f.label === selectedLabel);
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
                placeholder="Selecciona una opción"
                selectionMode="single"
                selectedKeys={filter.key ? [filters.find((f) => f.key === filter.key)?.label || ""] : []}
                onSelectionChange={(keys) => handleInputChange(String(Array.from(keys)[0]))}
            >
                {filters.map((f) => (
                    <SelectItem key={f.label} value={f.label}>
                        {f.label}
                    </SelectItem>
                ))}
            </Select>

            {/* Renderizar el rango de precio si el filtro es "precio" */}
            {filter.key === "precio" && (
                <Slider
                    label="Precio"
                    minValue={1}
                    maxValue={30000000}
                    step={10000}
                    formatOptions={{ style: "currency", currency: "USD" }}
                    value={filter.value}
                    onChange={handleSliderChange}
                    renderLabel={() => " "}
                />
            )}
        </div>
    );
}

"use client";
import React from "react";
import { Navbar, NavbarBrand, NavbarContent } from "@nextui-org/react";

export default function App({ children }: Readonly<{ children?: React.ReactNode }>) {
    return (
        <>
            <Navbar
                isBordered
            >
                <NavbarContent className="sm:hidden" justify="start">
                    <p className="font-semibold text-sm uppercase text-default-800">
                        Urca Bienes Raíces
                    </p>
                </NavbarContent>

                <NavbarContent className="sm:hidden pr-3" justify="center">
                    <NavbarBrand>
                        <img src="/logo.svg" alt="Logo" className="h-16 w-auto object-cover" />
                    </NavbarBrand>
                </NavbarContent>

                <NavbarContent className="hidden sm:flex gap-4" justify="center">
                    <NavbarBrand>
                        <img src="/logo.svg" alt="Logo" className="h-16 w-auto" />
                    </NavbarBrand>
                </NavbarContent>
            </Navbar>
            {children}
        </>
    );
}

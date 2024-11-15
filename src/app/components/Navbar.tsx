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
                    <a href="/" className="font-bold text-lg uppercase text-default-800">
                        Urca Bienes Raíces
                    </a>
                </NavbarContent>

                <NavbarContent className="sm:hidden pr-3" justify="center">
                    <NavbarBrand>
                        <img src="/logo.svg" alt="Logo" className="h-16 w-auto object-cover" />
                    </NavbarBrand>
                </NavbarContent>

                <NavbarContent className="hidden sm:flex gap-4" justify="start">
                    <a href="/" className="font-bold text-2xl uppercase text-default-800">
                        Urca Bienes Raíces
                    </a>
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

"use client";
import React from "react";
import { Link, Navbar, NavbarBrand, NavbarContent, NavbarMenu, NavbarMenuItem, NavbarMenuToggle } from "@nextui-org/react";
import { usePathname } from 'next/navigation'
import { p } from "framer-motion/client";

export default function App({ children }: Readonly<{ children?: React.ReactNode }>) {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const pathname = usePathname()

    const menuItems = [
        {
            key: "Venta",
            href: "/categorias/venta",
        },
        {
            key: "Renta",
            href: "/categorias/renta",
        }
    ];

    return (
        <>
            <Navbar>
                <NavbarContent className="sm:hidden" justify="start">
                    <NavbarMenuToggle
                        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                        className="sm:hidden"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    />
                    {!isMenuOpen && (
                        <a href="/" className="font-bold text-default-800 text-sm text-ellipsis uppercase tracking-wider">
                            Urca Bienes Raíces
                        </a>
                    )}
                </NavbarContent>

                <NavbarContent className="sm:hidden pr-3" justify="center">
                    <NavbarBrand>
                        {!isMenuOpen && (
                            <img src="/logo.png" alt="Logo" className="h-16 w-auto object-cover" />
                        )}
                    </NavbarBrand>
                </NavbarContent>

                <NavbarContent className="hidden sm:flex gap-4" justify="start">
                    <NavbarMenuToggle
                        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                        className=""
                    />
                    {isMenuOpen && (
                        <a href="/" className="font-bold text-2xl uppercase text-[#006FEE]">
                            Urca Bienes Raíces
                        </a>
                    )}

                </NavbarContent>

                <NavbarContent className="hidden sm:flex gap-4" justify="center">
                    <NavbarBrand>
                        {isMenuOpen && (
                            <img src="/logo.png" alt="Logo" className="h-16 w-auto" />
                        )}
                    </NavbarBrand>
                </NavbarContent>

                <NavbarMenu className="space-y-3">
                    <p className="text-xl font-bold text-[#006FEE]/80">
                        Categorías
                    </p>
                    {menuItems.map((item, index) => (
                        <NavbarMenuItem key={`${item}-${index}`}>
                            <div className={`${item.href.toLocaleLowerCase() === pathname ? "bg-[#006FEE]/20" : "bg-[#006FEE]/10"}  rounded-2xl shadow-sm p-2 px-4 text-white`}>
                                <Link
                                    className={`w-full ${item.href.toLocaleLowerCase() === pathname ? "text-primary" : "text-primary/50"}`}
                                    href={item.href}
                                    size="lg"
                                >
                                    {item.key}
                                </Link>
                            </div>

                        </NavbarMenuItem>
                    ))}
                </NavbarMenu>
            </Navbar>
            {children}
        </>
    );
}

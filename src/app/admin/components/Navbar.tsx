"use client";
import React from "react";
import { Navbar, NavbarBrand, NavbarMenuToggle, NavbarMenuItem, NavbarMenu, NavbarContent, NavbarItem, Link, Button } from "@nextui-org/react";

export default function App({ children }: Readonly<{ children?: React.ReactNode }>) {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    const menuItems = [
        {
            label: "Casas",
            icon: "home",
            href: "/admin",
        },
        {
            label: "Agregar Casa",
            icon: "home",
            href: "/admin/new",
        },
    ];

    return (
        <>
            <Navbar
                isBordered
                isMenuOpen={isMenuOpen}
                onMenuOpenChange={setIsMenuOpen}
            >
                <NavbarContent className="sm:hidden" justify="start">
                    <NavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu"} />
                    <p className="font-semibold text-sm uppercase">
                        ADMIN
                    </p>
                </NavbarContent>

                <NavbarContent className="sm:hidden pr-3" justify="center">
                    <NavbarBrand>
                        <img src="/logo.svg" alt="Logo" className="h-16 w-auto object-cover" />
                    </NavbarBrand>
                </NavbarContent>

                <NavbarContent className="hidden sm:flex gap-4" justify="center">
                    {menuItems.map((item, index) => (
                        <NavbarItem key={`${item}-${index}`}>
                            <Button
                                size="lg"
                                variant="light"
                                color="primary"
                                radius="full"
                                className="uppercase"
                            >
                                <Link href={item.href}>
                                    {item.label}
                                </Link>
                            </Button>
                        </NavbarItem>
                    ))}
                </NavbarContent>

                <NavbarContent className="hidden sm:flex gap-4" justify="center">
                    <NavbarBrand className="space-x-5 items-center">
                        <p className="text-xl uppercase">
                            ADMIN
                        </p>
                        <img src="/logo.svg" alt="Logo" className="h-16 w-auto" />
                    </NavbarBrand>
                </NavbarContent>



                <NavbarMenu className="space-y-4">
                    {menuItems.map((item, index) => (
                        <NavbarMenuItem key={`${item}-${index}`}>
                            <Link
                                className="w-full"
                                href={item.href}
                                size="lg"
                            >
                                {item.label}
                            </Link>
                        </NavbarMenuItem>
                    ))}
                </NavbarMenu>
            </Navbar>
            {children}
        </>
    );
}

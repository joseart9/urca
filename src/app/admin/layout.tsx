import Navbar from "@/app/admin/components/Navbar";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <Navbar>
            {children}
        </Navbar>
    );
}

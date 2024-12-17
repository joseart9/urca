import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/app/providers";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Hind } from 'next/font/google'

const font = Hind({ subsets: ['latin'], weight: "400" })

export const metadata: Metadata = {
  title: "Urca Bienes Raíces",
  description: "Urca, Bienes Raíces en la ciudad de Monterrey",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={font.className}
      >
        <Providers>
          <ToastContainer />
          {children}
        </Providers>
      </body>
    </html>
  );
}

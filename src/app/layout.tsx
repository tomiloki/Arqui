// app/layout.tsx

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ClientProvider from "@/app/providers/ClientProvider"; // Asegúrate de que la ruta es correcta
import Navbar from "@/components/Navbar"; 

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata = {
  title: "Ferremas",
  description: "Tienda de herramientas y materiales de construcción",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={geistSans.variable}>
        {/* Navbar */}

        {/* Main Content */}
        <ClientProvider>
          <Navbar />
          <main className="min-h-screen bg-gray-100 p-6">{children}</main>
        </ClientProvider>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-6 mt-10">
          <div className="container mx-auto text-center">
            <p className="text-gray-400">
              &copy; {new Date().getFullYear()} Ferremas. Todos los derechos
              reservados.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
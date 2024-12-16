"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface Producto {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  stock: number;
  categoria: {
    nombre: string;
  };
}

export default function ProductosPage() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProductos() {
      try {
        const response = await fetch("/api/productos");
        const data = await response.json();
        setProductos(data);
      } catch (error) {
        console.error("Error al obtener los productos:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchProductos();
  }, []);

  if (loading) return <p className="text-center text-gray-700">Cargando productos...</p>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">Nuestros Productos</h1>
      {productos.length === 0 ? (
        <p className="text-center text-gray-500">No hay productos disponibles.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {productos.map((producto) => (
            <div
              key={producto.id}
              className="border border-gray-200 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="p-4">
                {/* Título */}
                <h2 className="text-xl font-semibold text-gray-800 mb-2">{producto.nombre}</h2>

                {/* Descripción */}
                <p className="text-gray-600 text-sm mb-4">
                  {producto.descripcion || "Sin descripción disponible."}
                </p>

                {/* Precio */}
                <p className="text-green-600 font-bold mb-2">
                  Precio: ${new Intl.NumberFormat("es-CL").format(producto.precio)}
                </p>

                {/* Stock */}
                <p className="text-gray-500 text-sm mb-4">Stock: {producto.stock}</p>

                {/* Enlace a detalles */}
                <Link
                  href={`/productos/${producto.id}`}
                  className="block w-full text-center bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
                >
                  Ver Detalle
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

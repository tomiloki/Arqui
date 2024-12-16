"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";

interface Producto {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  stock: number;
}

export default function ProductosPorCategoriaPage() {
  const { id } = useParams();
  const [productos, setProductos] = useState<Producto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    async function fetchProductos() {
      try {
        const response = await fetch(`/api/categorias/${id}/productos`);
        const data = await response.json();
        setProductos(data);
      } catch (error) {
        console.error("Error al obtener los productos:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchProductos();
  }, [id]);

  if (loading) return <p>Cargando productos...</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Productos de la Categoría</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {productos.map((producto) => (
          <div
            key={producto.id}
            className="border rounded-md p-4 shadow hover:shadow-lg"
          >
            <h2 className="text-xl font-semibold">{producto.nombre}</h2>
            <p className="text-gray-700">{producto.descripcion}</p>
            <p className="text-green-600 font-bold">Precio: ${producto.precio}</p>
            <p className="text-sm text-gray-500">Stock: {producto.stock}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

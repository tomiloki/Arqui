"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useCart } from "@/context/CarritoContext";

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

export default function ProductoPage() {
  const { id } = useParams();
  const [producto, setProducto] = useState<Producto | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { addToCart } = useCart();

  useEffect(() => {
    async function fetchProducto() {
      try {
        const response = await fetch(`/api/productos?id=${id}`);
        if (!response.ok) throw new Error("Producto no encontrado");
        const data = await response.json();
        setProducto(data);
      } catch (error: any) {
        setError("Error al obtener el producto. Inténtalo más tarde.");
      } finally {
        setLoading(false);
      }
    }

    if (id) fetchProducto();
  }, [id]);

  if (loading) return <p>Cargando producto...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!producto) return <p>Producto no encontrado.</p>;
  
  const handleAgregarAlCarrito = () => {
    addToCart({ ...producto, cantidad: 1 });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{producto.nombre}</h1>
      <p className="text-gray-700">{producto.descripcion}</p>
      <p className="text-green-600 font-bold">Precio: ${producto.precio}</p>
      <p className="text-gray-500">Stock: {producto.stock}</p>
      <p className="text-gray-400 text-sm">Categoría: {producto.categoria.nombre}</p>
      <button
        onClick={handleAgregarAlCarrito}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Agregar al Carrito
      </button>
    </div>
  );
}

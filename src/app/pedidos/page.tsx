"use client";

import { useState, useEffect } from "react";

interface Pedido {
  id: number;
  usuario: {
    nombre: string;
  };
  estado: {
    nombre: string;
  };
  productos: {
    cantidad: number;
    producto: {
      nombre: string;
    };
  }[];
}

export default function PedidosPage() {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPedidos() {
      try {
        const response = await fetch("/api/pedidos");
        const data = await response.json();
        setPedidos(data);
      } catch (error) {
        console.error("Error al obtener los pedidos:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchPedidos();
  }, []);

  if (loading) return <p>Cargando pedidos...</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Pedidos</h1>
      <div className="space-y-4">
        {pedidos.map((pedido) => (
          <div
            key={pedido.id}
            className="border rounded-md p-4 shadow hover:shadow-lg"
          >
            <h2 className="text-lg font-semibold">Pedido #{pedido.id}</h2>
            <p className="text-gray-500">
              Usuario: {pedido.usuario.nombre} | Estado: {pedido.estado.nombre}
            </p>
            <div className="mt-2">
              {pedido.productos.map((item, index) => (
                <p key={index}>
                  {item.cantidad}x {item.producto.nombre}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

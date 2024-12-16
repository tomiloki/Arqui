"use client";

import { useState, useEffect } from "react";

interface Categoria {
  id: number;
  nombre: string;
}

export default function CategoriasPage() {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null); // Nuevo estado para errores

  useEffect(() => {
    async function fetchCategorias() {
      try {
        const response = await fetch("/api/categorias");
        
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Error al obtener las categorías");
        }

        const data: Categoria[] = await response.json();
        setCategorias(data);
      } catch (error: any) {
        console.error("Error al obtener las categorías:", error);
        setError(error.message || "Error desconocido");
      } finally {
        setLoading(false);
      }
    }

    fetchCategorias();
  }, []);

  if (loading) return <p>Cargando categorías...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>; // Mostrar error en UI

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Categorías</h1>
      {categorias.length === 0 ? (
        <p>No hay categorías disponibles.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {categorias.map((categoria) => (
            <a
              key={categoria.id}
              href={`/categorias/${categoria.id}`}
              className="border rounded-md p-4 shadow hover:shadow-lg"
            >
              <h2 className="text-xl font-semibold">{categoria.nombre}</h2>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

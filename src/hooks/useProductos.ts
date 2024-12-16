"use client;"
import { useEffect, useState } from 'react';

interface Producto {
  id: number;
  nombre: string;
  descripcion?: string;
  precio: number;
  stock: number;
  categoriaId: number;
  createdAt: string;
  updatedAt: string;
}

const useProductos = () => {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProductos = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/productos');
      if (!res.ok) {
        throw new Error('Error al obtener los productos');
      }
      const data = await res.json();
      setProductos(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductos();
  }, []);

  return { productos, loading, error };
};

export default useProductos;

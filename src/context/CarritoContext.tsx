// app/context/CarritoContext.tsx

"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface ProductoCarrito {
  id: number;
  nombre: string;
  precio: number;
  cantidad: number;
}

interface CarritoContextProps {
  cart: ProductoCarrito[];
  addToCart: (producto: ProductoCarrito) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
}

const CarritoContext = createContext<CarritoContextProps | undefined>(undefined);

export const CarritoProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<ProductoCarrito[]>([]);

  const addToCart = (producto: ProductoCarrito) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === producto.id);
      if (existing) {
        return prev.map((item) =>
          item.id === producto.id
            ? { ...item, cantidad: item.cantidad + producto.cantidad }
            : item
        );
      }
      return [...prev, producto];
    });
  };

  const removeFromCart = (id: number) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CarritoContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CarritoContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CarritoContext);
  if (!context) {
    throw new Error("useCart debe usarse dentro de un CarritoProvider");
  }
  return context;
};

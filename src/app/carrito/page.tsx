"use client";

import { useCart } from "@/context/CarritoContext";

export default function CarritoPage() {
  const { cart, removeFromCart, clearCart } = useCart();

  // Calcular el total del carrito
  const total = cart.reduce(
    (acc, producto) => acc + Number(producto.precio) * producto.cantidad,
    0
  );

  if (cart.length === 0) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Carrito</h1>
        <p>El carrito está vacío.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Carrito</h1>
      <table className="w-full border-collapse border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2">Nombre</th>
            <th className="border px-4 py-2">Precio</th>
            <th className="border px-4 py-2">Cantidad</th>
            <th className="border px-4 py-2">Subtotal</th>
            <th className="border px-4 py-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {cart.map((producto) => (
            <tr key={producto.id} className="text-center">
              <td className="border px-4 py-2">{producto.nombre}</td>
              <td className="border px-4 py-2">
                $
                {producto.precio && !isNaN(Number(producto.precio))
                  ? Number(producto.precio).toFixed(2)
                  : "0.00"}
              </td>
              <td className="border px-4 py-2">{producto.cantidad}</td>
              <td className="border px-4 py-2">
                $
                {producto.precio && !isNaN(Number(producto.precio))
                  ? (Number(producto.precio) * producto.cantidad).toFixed(2)
                  : "0.00"}
              </td>
              <td className="border px-4 py-2">
                <button
                  onClick={() => removeFromCart(producto.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-between items-center mt-4">
        <h2 className="text-xl font-bold">
          Total: $
          {total && !isNaN(total) ? total.toFixed(2) : "0.00"}
        </h2>
        <button
          onClick={clearCart}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Vaciar Carrito
        </button>
      </div>
    </div>
  );
}

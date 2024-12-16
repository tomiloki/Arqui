"use client";
import Link from "next/link";
import { useCart } from "@/context/CarritoContext";

export default function Navbar() {
  const { cart } = useCart();

  return (
    <header className="bg-gray-800 text-white shadow-md sticky top-0 z-50">
      <nav className="container mx-auto flex justify-between items-center p-4">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold tracking-wide hover:text-gray-300">
          🛠️ <span className="text-yellow-400">Ferremas</span>
        </Link>

        {/* Links */}
        <div className="hidden md:flex space-x-6">
          <Link href="/" className="hover:text-yellow-400">Inicio</Link>
          <Link href="/productos" className="hover:text-yellow-400">Productos</Link>
          <Link href="/categorias" className="hover:text-yellow-400">Categorías</Link>
          <Link href="/pedidos" className="hover:text-yellow-400">Pedidos</Link>
        </div>

        {/* Carrito */}
        <Link href="/carrito" className="relative flex items-center">
          🛒
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full px-2">
            {cart.length}
          </span>
        </Link>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <button className="text-white focus:outline-none">
            ☰
          </button>
        </div>
      </nav>
    </header>
  );
}

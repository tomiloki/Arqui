export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-6">Bienvenido a Ferremas</h1>
      <a
        href="/productos"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-800"
      >
        Ver Productos
      </a>
    </div>
  );
}

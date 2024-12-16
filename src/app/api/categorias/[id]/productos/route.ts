import prisma from "@/lib/prisma"; // Ajusta la ruta según tu configuración
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

// Esquema de validación para crear un nuevo producto
const productoSchema = z.object({
  nombre: z.string().max(100),
  descripcion: z.string().optional(),
  precio: z.number().min(0),
  stock: z.number().int().min(0),
});

// Función manejadora para solicitudes GET
export async function GET(
  req: NextRequest,
  context: { params: { id: string } } // Recibe 'context' y extrae params
) {
  try {
    const { id } = await context.params; // Se debe 'await' para parámetros dinámicos
    const categoriaId = parseInt(id, 10);

    // Validar el ID
    if (isNaN(categoriaId)) {
      return NextResponse.json(
        { error: "ID de categoría inválido" },
        { status: 400 }
      );
    }

    // Obtener los productos asociados a la categoría
    const productos = await prisma.producto.findMany({
      where: { categoriaId },
      include: { categoria: true },
    });

    return NextResponse.json(productos, { status: 200 });
  } catch (error: unknown) {
    console.error(
      "Error en GET /api/categorias/[id]/productos:",
      (error as Error).message
    );
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}

// Función manejadora para solicitudes POST
export async function POST(
  req: NextRequest,
  context: { params: { id: string } }
) {
  try {
    const { id } = await context.params; // Se debe 'await' aquí también
    const categoriaId = parseInt(id, 10);

    // Validar el ID
    if (isNaN(categoriaId)) {
      return NextResponse.json(
        { error: "ID de categoría inválido" },
        { status: 400 }
      );
    }

    // Validar y parsear los datos entrantes
    const body = await req.json();
    const parsedData = productoSchema.parse(body);
    const { nombre, descripcion, precio, stock } = parsedData;

    // Verificar si la categoría existe
    const categoriaExistente = await prisma.categoria.findUnique({
      where: { id: categoriaId },
    });

    if (!categoriaExistente) {
      return NextResponse.json(
        { error: `Categoría con ID ${categoriaId} no encontrada` },
        { status: 404 }
      );
    }

    // Crear un nuevo producto asociado a la categoría
    const nuevoProducto = await prisma.producto.create({
      data: {
        nombre,
        descripcion,
        precio,
        stock,
        categoriaId,
      },
      include: { categoria: true },
    });

    return NextResponse.json(nuevoProducto, { status: 201 });
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      // Extraer y formatear mensajes de error de validación
      const errorMessages = error.errors.map((e) => e.message).join(", ");
      return NextResponse.json({ error: errorMessages }, { status: 400 });
    }

    console.error(
      "Error en POST /api/categorias/[id]/productos:",
      (error as Error).message
    );
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}

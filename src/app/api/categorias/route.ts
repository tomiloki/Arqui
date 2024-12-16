// app/api/categorias/route.ts

import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

// Esquema de validación para crear una nueva categoría
const categoriaSchema = z.object({
  nombre: z.string().max(100),
});

// Función manejadora para solicitudes GET y POST
export async function GET(req: NextRequest) {
  try {
    // Obtener todas las categorías
    const categorias = await prisma.categoria.findMany();
    return NextResponse.json(categorias, { status: 200 });
  } catch (error: unknown) {
    console.error('Error en GET /api/categorias:', (error as Error).message);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    // Validar y parsear los datos entrantes
    const body = await req.json();
    const parsedData = categoriaSchema.parse(body);
    const { nombre } = parsedData;

    // Crear la nueva categoría
    const nuevaCategoria = await prisma.categoria.create({
      data: { nombre },
    });

    return NextResponse.json(nuevaCategoria, { status: 201 });
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      // Extraer y formatear mensajes de error de validación
      const errorMessages = error.errors.map((e) => e.message).join(', ');
      return NextResponse.json({ error: errorMessages }, { status: 400 });
    }

    console.error('Error en POST /api/categorias:', (error as Error).message);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}

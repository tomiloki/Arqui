import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

// Obtener todos los productos o uno específico por ID
export async function GET(req: NextRequest): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (id) {
      const producto = await prisma.producto.findUnique({
        where: { id: parseInt(id) },
        include: { categoria: true }, // Incluye la categoría para más contexto
      });
      if (!producto) {
        return NextResponse.json({ error: 'Producto no encontrado' }, { status: 404 });
      }
      return NextResponse.json(producto, { status: 200 });
    }

    const productos = await prisma.producto.findMany({
      include: { categoria: true }, // Incluye categorías en la lista
    });
    return NextResponse.json(productos, { status: 200 });
  } catch (error: any) {
    console.error('Error en GET /api/productos:', error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Crear un nuevo producto
export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const body = await req.json();
    const { nombre, descripcion, precio, stock, categoriaId } = body;

    // Validar que la categoría exista
    const categoria = await prisma.categoria.findUnique({ where: { id: categoriaId } });
    if (!categoria) {
      return NextResponse.json({ error: 'Categoría no encontrada' }, { status: 400 });
    }

    const nuevoProducto = await prisma.producto.create({
      data: { nombre, descripcion, precio, stock, categoriaId },
    });
    return NextResponse.json(nuevoProducto, { status: 201 });
  } catch (error: any) {
    console.error('Error en POST /api/productos:', error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Actualizar un producto existente
export async function PUT(req: NextRequest): Promise<NextResponse> {
  try {
    const body = await req.json();
    const { id, ...data } = body;

    // Validar que el producto exista
    const producto = await prisma.producto.findUnique({ where: { id: parseInt(id) } });
    if (!producto) {
      return NextResponse.json({ error: 'Producto no encontrado' }, { status: 404 });
    }

    const productoActualizado = await prisma.producto.update({
      where: { id: parseInt(id) },
      data,
    });

    return NextResponse.json(productoActualizado, { status: 200 });
  } catch (error: any) {
    console.error('Error en PUT /api/productos:', error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Eliminar un producto
export async function DELETE(req: NextRequest): Promise<NextResponse> {
  try {
    const body = await req.json();
    const { id } = body;

    // Validar que el producto exista
    const producto = await prisma.producto.findUnique({ where: { id: parseInt(id) } });
    if (!producto) {
      return NextResponse.json({ error: 'Producto no encontrado' }, { status: 404 });
    }

    // Eliminar relaciones en PedidoProducto si existen
    await prisma.pedidoProducto.deleteMany({ where: { productoId: parseInt(id) } });

    // Eliminar el producto
    await prisma.producto.delete({ where: { id: parseInt(id) } });

    return NextResponse.json({ message: 'Producto eliminado correctamente' }, { status: 200 });
  } catch (error: any) {
    console.error('Error en DELETE /api/productos:', error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

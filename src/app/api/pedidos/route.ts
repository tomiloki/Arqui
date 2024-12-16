import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

// Obtener todos los pedidos o uno específico por ID
export async function GET(req: NextRequest): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (id) {
      const pedido = await prisma.pedido.findUnique({
        where: { id: parseInt(id) },
        include: {
          usuario: true,
          estado: true,
          productos: {
            include: { producto: true },
          },
        },
      });

      if (!pedido) {
        return NextResponse.json({ error: 'Pedido no encontrado' }, { status: 404 });
      }

      return NextResponse.json(pedido, { status: 200 });
    }

    const pedidos = await prisma.pedido.findMany({
      include: {
        usuario: true,
        estado: true,
        productos: {
          include: { producto: true },
        },
      },
    });

    return NextResponse.json(pedidos, { status: 200 });
  } catch (error: any) {
    console.error('Error en GET /api/pedidos:', error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Crear un nuevo pedido
export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const body = await req.json();
    const { usuarioId, estadoId, productos } = body;

    // Validaciones
    if (!usuarioId || !estadoId || !productos || !Array.isArray(productos) || productos.length === 0) {
      return NextResponse.json(
        { error: 'Datos incompletos. Se requieren usuarioId, estadoId y una lista de productos.' },
        { status: 400 }
      );
    }

    console.log('Validando usuario...');
    const usuario = await prisma.usuario.findUnique({ where: { id: usuarioId } });
    if (!usuario) {
      return NextResponse.json({ error: `Usuario con ID ${usuarioId} no encontrado.` }, { status: 400 });
    }

    console.log('Validando estado...');
    const estado = await prisma.estadoPedido.findUnique({ where: { id: estadoId } });
    if (!estado) {
      return NextResponse.json({ error: `Estado con ID ${estadoId} no encontrado.` }, { status: 400 });
    }

    console.log('Validando productos...');
    for (const p of productos) {
      if (!p.productoId || !p.cantidad || p.cantidad <= 0) {
        return NextResponse.json(
          { error: `Producto inválido en la lista: ${JSON.stringify(p)}` },
          { status: 400 }
        );
      }

      const producto = await prisma.producto.findUnique({ where: { id: p.productoId } });
      if (!producto) {
        return NextResponse.json({ error: `Producto con ID ${p.productoId} no encontrado.` }, { status: 400 });
      }
    }

    console.log('Creando pedido...');
    const nuevoPedido = await prisma.pedido.create({
      data: {
        usuarioId,
        estadoId,
        productos: {
          create: productos.map((p: { productoId: number; cantidad: number }) => ({
            productoId: p.productoId,
            cantidad: p.cantidad,
          })),
        },
      },
      include: {
        productos: {
          include: { producto: true },
        },
      },
    });

    return NextResponse.json(nuevoPedido, { status: 201 });
  } catch (error: any) {
    console.error('Error en POST /api/pedidos:', error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Actualizar el estado de un pedido
export async function PUT(req: NextRequest): Promise<NextResponse> {
  try {
    const body = await req.json();
    const { id, estadoId } = body;

    if (!id || !estadoId) {
      return NextResponse.json(
        { error: 'Datos incompletos. Se requieren id del pedido y estadoId.' },
        { status: 400 }
      );
    }

    console.log('Actualizando estado del pedido...');
    const pedidoActualizado = await prisma.pedido.update({
      where: { id: parseInt(id) },
      data: { estadoId },
      include: {
        productos: {
          include: { producto: true },
        },
      },
    });

    return NextResponse.json(pedidoActualizado, { status: 200 });
  } catch (error: any) {
    console.error('Error en PUT /api/pedidos:', error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Eliminar un pedido
export async function DELETE(req: NextRequest): Promise<NextResponse> {
  try {
    const body = await req.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json({ error: 'ID del pedido es requerido.' }, { status: 400 });
    }

    console.log('Eliminando relaciones en PedidoProducto...');
    await prisma.pedidoProducto.deleteMany({ where: { pedidoId: parseInt(id) } });

    console.log('Eliminando pedido...');
    await prisma.pedido.delete({ where: { id: parseInt(id) } });

    return NextResponse.json({ message: 'Pedido eliminado correctamente' }, { status: 200 });
  } catch (error: any) {
    console.error('Error en DELETE /api/pedidos:', error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

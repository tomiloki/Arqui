import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Creando datos iniciales...');

  // Crear Categorías
  const categorias = await prisma.categoria.createMany({
    data: [
      { nombre: 'Herramientas' },
      { nombre: 'Materiales de Construcción' },
      { nombre: 'Jardinería' },
      { nombre: 'Electricidad' },
    ],
  });

  console.log('Categorías creadas:', categorias);

  // Crear Productos
  const productos = await prisma.producto.createMany({
    data: [
      { nombre: 'Martillo', descripcion: 'Martillo de acero reforzado', precio: 19990, stock: 15, categoriaId: 1 },
      { nombre: 'Taladro', descripcion: 'Taladro inalámbrico de 12V', precio: 49990, stock: 10, categoriaId: 1 },
      { nombre: 'Cemento', descripcion: 'Saco de cemento de 25kg', precio: 8990, stock: 50, categoriaId: 2 },
      { nombre: 'Tierra para Jardín', descripcion: 'Saco de tierra de 10kg', precio: 5990, stock: 30, categoriaId: 3 },
      { nombre: 'Bombilla LED', descripcion: 'Bombilla LED de 10W', precio: 2990, stock: 100, categoriaId: 4 },
    ],
  });

  console.log('Productos creados:', productos);

  // Crear Estados de Pedido
  const estados = await prisma.estadoPedido.createMany({
    data: [
      { nombre: 'PENDIENTE' },
      { nombre: 'EN PROCESO' },
      { nombre: 'COMPLETADO' },
      { nombre: 'CANCELADO' },
    ],
  });

  console.log('Estados de Pedido creados:', estados);
}

main()
  .then(() => {
    console.log('Datos iniciales insertados con éxito');
    prisma.$disconnect();
  })
  .catch((error) => {
    console.error('Error al insertar datos iniciales:', error);
    prisma.$disconnect();
  });

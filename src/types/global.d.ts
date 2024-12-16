import { PrismaClient } from '@prisma/client';

// Declara la propiedad `prisma` en el espacio global de Node.js
declare global {
  var prisma: PrismaClient | undefined;
}

// Esto convierte el archivo en un módulo de TypeScript
export {};

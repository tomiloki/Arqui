export interface Producto {
    id: number;
    nombre: string;
    descripcion?: string;
    precio: number;
    stock: number;
    categoriaId: number;
    createdAt: Date;
    updatedAt: Date;
  }
  
  export interface Usuario {
    id: number;
    nombre: string;
    email: string;
    password: string;
    rolId: number;
    createdAt: Date;
    updatedAt: Date;
  }
  
  export interface Pedido {
    id: number;
    usuarioId: number;
    estadoId: number;
    fecha: Date;
    createdAt: Date;
    updatedAt: Date;
  }
  
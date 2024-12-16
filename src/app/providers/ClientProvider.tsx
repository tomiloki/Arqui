// app/providers/ClientProvider.tsx

"use client";

import { CarritoProvider } from "@/context/CarritoContext";
import React, { ReactNode } from "react";

interface ClientProviderProps {
  children: ReactNode;
}

const ClientProvider = ({ children }: ClientProviderProps) => {
  return <CarritoProvider>{children}</CarritoProvider>;
};

export default ClientProvider;

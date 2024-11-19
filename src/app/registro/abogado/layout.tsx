"use client";

import { RegistroAbogadoProvider } from "@/contexts/registroAbogadoContext";
import React, { ReactNode } from "react";

const RegistroAbogadoLayout = ({ children }:{ children: ReactNode }) => {
  return <RegistroAbogadoProvider>{children}</RegistroAbogadoProvider>;
};

export default RegistroAbogadoLayout;
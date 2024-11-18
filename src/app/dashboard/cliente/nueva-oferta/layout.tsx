"use client";

import { OfertaProvider } from "@/contexts/ofertaContext";
import React, { ReactNode } from "react";

const OfertaLayout = ({ children }:{ children: ReactNode }) => {
  return <OfertaProvider>{children}</OfertaProvider>;
};

export default OfertaLayout;
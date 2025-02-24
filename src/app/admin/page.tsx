"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

function AdminPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/admin/abogados"); // Redirige automáticamente
  }, [router]);

  return null; // No renderiza nada, ya que redirige inmediatamente
}

export default AdminPage;

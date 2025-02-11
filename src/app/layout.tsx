import { Metadata } from "next";
import "@/app/globals.css";
import LoaderComponent from "@/components/LoaderComponent";
import { LoaderProvider } from "@/contexts/loaderContext";
import { ToastProvider } from "@/contexts/toastContext";
import { AuthProvider } from "@/contexts/authContext";

// El metadata también puede incluir el favicon aquí
export const metadata: Metadata = {
  title: "LEGALO | Plataforma para conectar abogados y clientes",
  description: "Conecta con abogados especializados en diversas áreas legales y recibe asesoría profesional de manera rápida y segura.",
  keywords: [
    "abogados",
    "asesoría legal",
    "consultas legales",
    "derecho",
    "abogados online",
    "servicios legales",
  ],
  authors: [{ name: "LEGALO", url: "https://legalo.com" }], // Autor del sitio
  creator: "LEGALO", // Creador del sitio

  openGraph: {
    title: "LEGALO | Conecta con abogados expertos",
    description:
      "Encuentra el abogado ideal para tu caso y recibe asesoría legal de manera rápida y segura.",
    url: "https://legalo.com",
    siteName: "LEGALO",
    images: [
      {
        url: "/og-image.jpg", // Imagen para compartir en redes sociales (debe estar en `/public`)
        width: 1200,
        height: 630,
        alt: "LEGALO - Conecta con abogados expertos",
      },
    ],
    locale: "es_ES", // Idioma del sitio (ajusta según el público objetivo)
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    site: "@legalo", // Usuario de Twitter de tu empresa
    title: "LEGALO | Conecta con abogados expertos",
    description:
      "Encuentra el abogado ideal para tu caso y recibe asesoría legal de manera rápida y segura.",
    images: ["/og-image.jpg"],
  },

  icons: {
    icon: "/favicon.png", // Favicon del sitio
    apple: "/apple-touch-icon.png", // Icono para dispositivos Apple
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ToastProvider>
          <LoaderProvider>
            <LoaderComponent />
              <AuthProvider>
              {children}
              </AuthProvider>
          </LoaderProvider>
        </ToastProvider>
      </body>
    </html>
  );
}

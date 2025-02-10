import { Metadata } from "next";
import "@/app/globals.css";
import LoaderComponent from "@/components/LoaderComponent";
import { LoaderProvider } from "@/contexts/loaderContext";
import { ToastProvider } from "@/contexts/toastContext";
import { AuthProvider } from "@/contexts/authContext";

// El metadata también puede incluir el favicon aquí
export const metadata: Metadata = {
  title: "Legalo",
  description: "Abogados especializados",
  icons: {
    icon: "/favicon.png", // Coloca la ruta de tu favicon aquí
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

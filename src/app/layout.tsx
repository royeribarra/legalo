export const metadata = {
  title: "Legalo",
  description: "Abogados especializados",
};

import "@/app/globals.css";
import { ToastProvider } from "@/contexts/toastContext";
// import "antd/dist/antd.css";
// import "../../public/assets/styles/main.css";
// import "../../public/assets/styles/responsive.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ToastProvider>
        {children}
        </ToastProvider>
      </body>
    </html>
  );
}

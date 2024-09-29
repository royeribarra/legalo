export const metadata = {
  title: "Legalo",
  description: "Abogados especializados",
};

import "@/app/globals.css";
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
      <body>{children}</body>
    </html>
  );
}

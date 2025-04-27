import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "CRUD de productos y servicios",
  description: "Generado por Next.js v14 usando App Router",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["600", "700", "800", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BLESS RIFAS - Rifas Online con Premios Increíbles",
  description: "Participa en rifas online y gana premios increíbles. Transformamos las rifas online en una verdadera oportunidad para ganar dinero real.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${poppins.variable} antialiased`}
        style={{fontFamily: 'var(--font-poppins)'}}
      >
        {children}
      </body>
    </html>
  );
}

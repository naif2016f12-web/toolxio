import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Toolxio | AI-Powered Document Platform",
  description: "Generate presentations, documents, and spreadsheets with AI.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" className="dark">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#0b0f1a" />
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3884075444224312"
          crossOrigin="anonymous"></script>
      </head>
      <body className={`${inter.className} min-h-screen bg-background text-foreground flex`}>
        <Sidebar />
        <main className="flex-1 mr-64 p-8 min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}

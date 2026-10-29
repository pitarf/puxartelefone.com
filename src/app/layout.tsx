import type { Metadata } from "next";
import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "sonner";
import { prisma } from "../lib/prisma";
import "./globals.css";

export const revalidate = 0;
export const dynamic = 'force-dynamic';

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#ffffff',
};

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

/**
 * Gera os metadados da página dinamicamente a partir das configurações do banco.
 * Permite que o Admin altere título, descrição e favicon sem precisar fazer deploy.
 */
export async function generateMetadata(): Promise<Metadata> {
  try {
    const settings = await prisma.systemSetting.findFirst();

    const title = settings?.siteTitle || "PuxarTelefone - Consulta de Telefone e Validação Cadastral";
    const description = settings?.siteDescription || "Consulte informações a partir de um número de telefone com DDD. Plataforma rápida, segura e em conformidade com a LGPD.";
    const keywords = settings?.siteKeywords || "consulta telefone, puxar telefone, titular de telefone, consulta cadastral, validação de contato, lgpd";
    
    // Favicon com fallback seguro para /favicon.ico e /favicon.png
    const rawFavicon = settings?.faviconUrl?.trim();
    const faviconUrl = (rawFavicon && !rawFavicon.includes('canva.com')) ? rawFavicon : "/favicon.ico";

    return {
      title,
      description,
      keywords,
      icons: {
        icon: [
          { url: faviconUrl, href: faviconUrl },
          { url: '/favicon.png', href: '/favicon.png', sizes: '32x32', type: 'image/png' },
          { url: '/android-chrome-192x192.png', href: '/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
        ],
        apple: [
          { url: '/apple-touch-icon.png', href: '/apple-touch-icon.png', sizes: '180x180' }
        ],
        shortcut: faviconUrl,
      },
      openGraph: {
        title,
        description,
        type: "website",
        locale: "pt_BR",
        images: [
          {
            url: "/logo.png",
            width: 550,
            height: 540,
            alt: "PuxarTelefone Logo",
          }
        ],
      },
    };
  } catch {
    // Fallback caso o banco não esteja acessível ainda
    return {
      title: "PuxarTelefone - Consulta de Telefone",
      description: "Plataforma de consultas cadastrais a partir de número de telefone.",
      icons: {
        icon: "/favicon.ico",
        shortcut: "/favicon.ico",
        apple: "/apple-touch-icon.png",
      }
    };
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen flex flex-col`}
      >
        {/* Google Analytics (gtag.js) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-7S1B7HEF50"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-7S1B7HEF50');
          `}
        </Script>
        <main className="flex-1 flex flex-col">
          {children}
        </main>
        <Toaster richColors theme="dark" position="top-right" duration={4000} />
      </body>
    </html>
  );
}

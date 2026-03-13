import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import MultiChainProvider from "@/providers/MultiChainProvider";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "Proof of Funds Generator - Demo",
  description:
    "Generate professional proof of funds documents for your crypto portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=Roboto+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const theme = localStorage.getItem('theme') || 
                  (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
                document.documentElement.setAttribute('data-theme', theme);
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-screen relative overflow-x-hidden selection:bg-[#064E3B]/30">
        {/* Modern Background */}
        <div className="fixed inset-0 -z-50 pointer-events-none overflow-hidden">
          {/* Base Layer */}
          <div className="absolute inset-0 bg-[#f8fafc] dark:bg-[#0a0a0a]" />
          {/* Subtle Gradient Glow */}
          <div
            className="absolute -bottom-1/4 left-1/2 -translate-x-1/2 w-[150%] h-full opacity-40 dark:opacity-20 blur-[120px]"
            style={{
              background:
                "radial-gradient(circle at center, #6366f1 0%, transparent 70%)",
            }}
          />

          {/* Elegant Grid Pattern */}
          <div
            className="absolute inset-0 opacity-[0.15] dark:opacity-[0.05]"
            style={{
              backgroundImage: `
                linear-gradient(to right, #94a3b8 1px, transparent 1px),
                linear-gradient(to bottom, #94a3b8 1px, transparent 1px)
              `,
              backgroundSize: "32px 32px",
              maskImage:
                "radial-gradient(circle at 50% 0%, #000 30%, transparent 100%)",
              WebkitMaskImage:
                "radial-gradient(circle at 50% 0%, #000 30%, transparent 100%)",
            }}
          />
        </div>

        <ThemeProvider>
          <MultiChainProvider>
            <div className="relative z-10 flex flex-col min-h-screen">
              {children}
            </div>
            <Toaster position="top-right" richColors closeButton />
          </MultiChainProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

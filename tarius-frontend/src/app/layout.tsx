// Filename: src/app/layout.tsx

import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import ThemeRegistry from "@/components/ThemeRegistry";
import { supabase } from "@/lib/api";

export const revalidate = 60;

export const metadata: Metadata = {
  title: {
    default: "TARIUS — Organic. Powerful. Natural.",
    template: "%s | TARIUS",
  },
  description:
    "TARIUS — premium spirulina and moringa powders crafted from nature.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Resolve the admin-configured navbar on the server so the CTA label is
  // correct on first paint (no fallback label flash before hydration).
  const { data: navSettings } = await supabase
    .from("SiteSettings")
    .select("value")
    .eq("key", "navbar_settings")
    .single();

  return (
    <html lang="en" className="scroll-smooth">
      <body>
        <ThemeRegistry />
        <Navbar initialNavData={navSettings?.value ?? undefined} />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
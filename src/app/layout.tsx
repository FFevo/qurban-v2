import type { Metadata } from "next";
import { Inter, DM_Serif_Display } from "next/font/google";
import Image from "next/image";
import "./globals.css";

const MAINTENANCE_MODE = true;

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const dmSerif = DM_Serif_Display({
  variable: "--font-serif-display",
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Qurban — Maintenance en cours",
  description:
    "Le site Qurban est actuellement en maintenance. Nous revenons tres bientot.",
  icons: { icon: "/images/brand/logo.png" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" className="scroll-smooth">
      <body
        className={`${inter.variable} ${dmSerif.variable} antialiased`}
        style={{ fontFamily: "var(--font-inter), sans-serif" }}
      >
        {MAINTENANCE_MODE ? (
          <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center"
            style={{ background: "linear-gradient(145deg, #091a0f 0%, #0c1e12 50%, #091a0f 100%)" }}
          >
            <Image
              src="/images/brand/logo.png"
              alt="Qurban"
              width={64}
              height={64}
              className="mb-8"
            />
            <h1
              className="text-3xl sm:text-4xl font-bold tracking-tight mb-3"
              style={{ color: "#f5f5f0", fontFamily: "var(--font-inter)" }}
            >
              Maintenance en cours
            </h1>
            <p className="text-sm sm:text-base max-w-md leading-relaxed" style={{ color: "#a3a89e" }}>
              Nous preparons quelque chose de beau pour vous.<br />
              Le site sera de retour tres bientot insha&apos;Allah.
            </p>
            <div className="mt-8 flex items-center gap-2 rounded-full px-4 py-2"
              style={{ background: "rgba(212,168,83,0.1)", border: "1px solid rgba(212,168,83,0.2)" }}
            >
              <span className="h-2 w-2 rounded-full animate-pulse" style={{ background: "#d4a853" }} />
              <span className="text-xs tracking-wide" style={{ color: "#d4a853", fontFamily: "var(--font-inter)" }}>
                RETOUR IMMINENT
              </span>
            </div>
          </div>
        ) : (
          children
        )}
      </body>
    </html>
  );
}

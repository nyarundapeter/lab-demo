import type { Metadata } from "next";
import { Manrope, Public_Sans } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import { getCurrentAccount } from "@/lib/auth";
import SignOutButton from "@/components/sign-out-button";

const manrope = Manrope({ subsets: ["latin"], weight: ["600", "700", "800"], variable: "--font-manrope" });
const publicSans = Public_Sans({ subsets: ["latin"], weight: ["400", "600"], variable: "--font-public-sans" });

export const metadata: Metadata = {
  title: "BioTest — Book a diagnostic visit",
  description: "Browse services, book a visit, and track your results at BioTest.",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const account = await getCurrentAccount();

  return (
    <html lang="en" className={`${manrope.variable} ${publicSans.variable}`}>
      <body className="flex min-h-screen flex-col font-body antialiased">
        <header className="border-b border-ink-100 bg-white/90 backdrop-blur">
          <div className="container-page flex h-16 items-center justify-between">
            <Link href="/" className="font-display text-lg font-bold tracking-tight text-ink-500">
              Bio<span className="text-teal-500">Test</span>
            </Link>
            <nav className="flex items-center gap-6 text-sm font-medium text-ink-600">
              <Link href="/" className="transition hover:text-ink-900">Home</Link>
              <Link href="/marketplace" className="transition hover:text-ink-900">Services</Link>
              {account ? (
                <>
                  <Link href="/my-bookings" className="transition hover:text-ink-900">My Bookings</Link>
                  <span className="text-ink-300">·</span>
                  <span className="text-ink-500">Hi, {account.name.split(" ")[0]}</span>
                  <SignOutButton />
                </>
              ) : (
                <Link href="/sign-in" className="btn-primary !px-4 !py-2">Sign in</Link>
              )}
            </nav>
          </div>
        </header>

        <main className="flex-1">{children}</main>

        <footer className="border-t border-ink-100 bg-white">
          <div className="container-page flex flex-col gap-1 py-8 text-sm text-ink-500">
            <p className="font-medium text-ink-700">BioTest — Precision Imaging. Trusted Care.</p>
            <p>Prof. Nelson Awori Building, Upper Hill, Nairobi</p>
          </div>
        </footer>
      </body>
    </html>
  );
}

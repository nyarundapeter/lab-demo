import type { Metadata } from "next";
import { Manrope, Public_Sans } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import { getCurrentAccount } from "@/lib/auth";
import { ROLE_LABELS } from "@/lib/schemas";
import SignOutButton from "@/components/sign-out-button";

const manrope = Manrope({ subsets: ["latin"], weight: ["600", "700", "800"], variable: "--font-manrope" });
const publicSans = Public_Sans({ subsets: ["latin"], weight: ["400", "600"], variable: "--font-public-sans" });

export const metadata: Metadata = {
  title: "BioTest Referral Portal",
  description: "Refer a patient, browse services and SLAs, and track your referrals at BioTest.",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const account = await getCurrentAccount();

  return (
    <html lang="en" className={`${manrope.variable} ${publicSans.variable}`}>
      <body className="flex min-h-screen flex-col font-body antialiased">
        <header className="border-b border-ink-100 bg-ink-900">
          <div className="container-page flex h-16 items-center justify-between">
            <Link href="/" className="font-display text-lg font-bold tracking-tight text-white">
              Bio<span className="text-teal-400">Test</span>{" "}
              <span className="text-sm font-medium text-ink-300">Referrals</span>
            </Link>
            <nav className="flex items-center gap-6 text-sm font-medium text-ink-200">
              <Link href="/" className="transition hover:text-white">Home</Link>
              <Link href="/marketplace" className="transition hover:text-white">Services</Link>
              {account ? (
                <>
                  <Link href="/my-referrals" className="transition hover:text-white">My Referrals</Link>
                  <span className="badge badge-role bg-ink-800 text-ink-200">{ROLE_LABELS[account.role]}</span>
                  <span className="text-ink-500">·</span>
                  <span className="text-ink-300">{account.name.split(" ")[0]}</span>
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
            <p className="font-medium text-ink-700">BioTest Referral Portal — for referring clinicians</p>
            <p>Prof. Nelson Awori Building, Upper Hill, Nairobi</p>
          </div>
        </footer>
      </body>
    </html>
  );
}

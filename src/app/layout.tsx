import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { tenant } from "@/lib/tenant";
import { ThemeProvider } from "@/components/ThemeProvider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: `${tenant.businessName} | Mobile Auto Detailing`,
  description: tenant.tagline,
};

// Clerk keys aren't configured in this environment yet — ClerkProvider
// throws without a publishable key, so skip wrapping until it's set.
// Auth enforcement (middleware.ts) is gated on CLERK_SECRET_KEY the same way.
const clerkEnabled = Boolean(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY);

export default function RootLayout({ children }: LayoutProps<"/">) {
  const body = (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
      {children}
    </ThemeProvider>
  );

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col">
        {clerkEnabled ? <ClerkProvider>{body}</ClerkProvider> : body}
      </body>
    </html>
  );
}

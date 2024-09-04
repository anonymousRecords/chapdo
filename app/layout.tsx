import React from "react";
import type { Metadata } from "next";
import "@/styles/globals.css";
import ThemeProvider from "@/components/Common/ThemeProvider";
import Navigation from "@/components/Common/navigation/navigation";
import WelcomeDialog from "@/components/Common/WelcomeDialog";

export const metadata: Metadata = {
  title: "chapdo-blog",
  description: "This is chapdo's blog",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-gray-50 dark:bg-black dark:text-gray-100">
        <ThemeProvider>
          <Navigation />
          <main className="mx-auto max-w-4xl px-4 pt-24 sm:px-6 lg:px-16">
            <WelcomeDialog />
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}

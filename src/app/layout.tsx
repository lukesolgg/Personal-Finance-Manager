import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./styles/globals.css";
import ClientLayout from './ClientLayout';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Personal Finance Manager',
  description: 'Track your income, expenses, and manage your budget.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
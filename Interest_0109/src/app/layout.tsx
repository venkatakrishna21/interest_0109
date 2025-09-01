import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Debt Tracker • Finance UI",
  description: "Track customers, debts, and interest with monthly rollups."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen text-gray-900">
        <div className="max-w-6xl mx-auto p-6">{children}</div>
      </body>
    </html>
  );
}

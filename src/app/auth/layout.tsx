import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Authentication",
  description: "Sign Up or Login to Todo app",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`font-sans ${inter.variable}`}>
        <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-gradient-to-b from-[#56a360] to-[#323adb] text-white">
          {children}
        </main>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import "./globals.css";

import { Inter as FontSans } from "next/font/google"
 
import { cn } from "@/lib/utils"
import { ThemeProvider } from "@/components/theme-provider";
 
export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: "Frappe Library System",
  description: "by Ravi",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={
			cn(
			"min-h-screen bg-background font-sans antialiased",
			fontSans.variable
			)
		}>
			<ThemeProvider
				attribute="class"
				defaultTheme="dark"
				enableSystem
				disableTransitionOnChange
			>
				{children}
		  	</ThemeProvider>
		</body>
    </html>
  );
}

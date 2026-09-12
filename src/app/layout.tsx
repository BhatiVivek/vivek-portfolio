import type { Metadata } from "next";
import { cookies } from 'next/headers';
import { Providers } from "./providers";
import { Inter } from "next/font/google";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v16-appRouter';
import "./globals.css";
import TopUtilityBar from "@/components/TopUtilityBar";
import { defaultThemeId, getTheme, getThemeVariables, isThemeId } from '@/theme';

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Vivek Bhati | Specialist Full stack Engineer",
  description: "Senior Full-Stack Developer specializing in React, TypeScript, Node.js, AEM and Cloud Technologies. 11+ years of experience building scalable web applications.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // get the saved theme from cookies, or use the default theme if not set
  const cookieStore = await cookies();
  const savedThemeId = cookieStore.get('portfolio-theme')?.value;
  const themeId = isThemeId(savedThemeId) ? savedThemeId : defaultThemeId;
  const initialTheme = getTheme(themeId);

  return (
    <html lang="en" data-theme={themeId} style={{ ...getThemeVariables(initialTheme), colorScheme: initialTheme.colorScheme }}>
      <body className={inter.variable}>
        <AppRouterCacheProvider>
          <Providers initialThemeId={themeId}>
            <TopUtilityBar />
            {children}
          </Providers>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}

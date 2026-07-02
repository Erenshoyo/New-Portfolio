import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Tauhid | Full Stack Software Engineer Portfolio",
  description: "Explore Tauhid's developer portfolio showcasing professional projects, skills, education, experience, and blogs. Managed via a secure custom dashboard.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" data-theme="figmaDark" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const savedTheme = localStorage.getItem('portfolio-theme') || 'figmaDark';
                  document.documentElement.setAttribute('data-theme', savedTheme);
                  if (savedTheme === 'figmaDark') {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {}
              })();
            `
          }}
        />
      </head>
      <body
        className={`${jetbrainsMono.variable} antialiased bg-base-100 text-base-content transition-colors duration-300 min-h-screen`}
      >
        {children}
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import Container from "@components/Container/Container";
import Header from "@components/Header/Header";
import Footer from "@components/Footer/Footer";
import ReduxProvider from "@components/ReduxProvider/ReduxProvider";

export const metadata: Metadata = {
  title: "TypingContest",
  description: "TypingContest",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
    shortcut: "/favicon-32x32.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>
          <Container>
            <Header/>
            {children}
            <Footer/>
          </Container>
        </ReduxProvider>
      </body>
    </html>
  );
}

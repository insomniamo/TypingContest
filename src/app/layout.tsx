import type { Metadata } from "next";
import Container from "@components/Container/Container";
import ReduxProvider from "@components/ReduxProvider/ReduxProvider";

export const metadata: Metadata = {
  title: "TypingContest",
  description: "TypingContest",
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
          <Container>{children}</Container>
        </ReduxProvider>
      </body>
    </html>
  );
}

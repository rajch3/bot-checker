import type { Metadata } from "next";
import { BotIdProvider } from "botid";
import "./globals.css";

export const metadata: Metadata = {
  title: "Are You a Bot?",
  description: "Test if you're detected as a bot by Kasada/Vercel BotID",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <BotIdProvider protectedRoutes={["/api/check-bot"]}>
          {children}
        </BotIdProvider>
      </body>
    </html>
  );
}

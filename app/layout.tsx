import type { Metadata } from "next";
import { BotIdClient } from "botid/client";
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
      <head>
        <BotIdClient
          protect={[
            {
              path: "/api/check-bot",
              method: "POST",
            },
          ]}
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}

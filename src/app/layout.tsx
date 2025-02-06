import "../styles/globals.css";
import {SessionProvider} from "next-auth/react";
import {auth} from "@/lib/auth";
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    const session = await auth();
  return (
    <html lang="fr">
      <body className="bg-gray-950 text-white">
      <SessionProvider session={session}>
        {children}
      </SessionProvider>

      </body>
    </html>
  );
}

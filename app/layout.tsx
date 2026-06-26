import "./globals.css";

import AppKitProvider from "@/providers/AppKitProvider";
import { WalletProvider } from "@/providers/WalletProvider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AppKitProvider>
          <WalletProvider>
            {children}
          </WalletProvider>
        </AppKitProvider>
      </body>
    </html>
  );
}
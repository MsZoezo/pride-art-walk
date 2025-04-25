import { UserLocationProvider } from "@/context/UserLocationContextProvider";
import "./globals.css";

import type { Metadata } from "next";
import { ExhibitionsContextProvider } from "@/context/ExhibitionsContextProvider";

export const metadata: Metadata = {
    title: "Pride Walk App",
    description: "",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>
                <ExhibitionsContextProvider>
                    <UserLocationProvider>
                        {children}
                    </UserLocationProvider>
                </ExhibitionsContextProvider>
            </body>
        </html>
    );
}

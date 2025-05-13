import "./globals.css";

import type { Metadata } from "next";
import Providers from "./providers";
import { Suspense } from "react";

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
                <Suspense fallback={null}>
                    <Providers>
                        {children}
                    </Providers>
                </Suspense>
            </body>
        </html>
    );
}

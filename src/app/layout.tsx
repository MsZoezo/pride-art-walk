import "./globals.css";
import type { Metadata } from "next";
import Providers from "./providers";
import { Suspense } from "react";
import Script from "next/script";

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
			<head>
				<Script
					id="clarity-script"
					strategy="afterInteractive"
					dangerouslySetInnerHTML={{
						__html: `
			(function(c,l,a,r,i,t,y){
				c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
				t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
				y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
			})(window, document, "clarity", "script", "rzh379l2rb");
		`,
					}}
				/>

			</head>
			<body>
				<Suspense fallback={null}>
					<Providers>{children}</Providers>
				</Suspense>
			</body>
		</html>
	);
}

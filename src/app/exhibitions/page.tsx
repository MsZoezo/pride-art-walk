"use client";

import Navigation from "@/components/navigation/navigation";
import Link from "next/link";

export default function Exhibitions() {
    return(
        <>
            <Navigation>
                <Link href="/">Home</Link>
                <Link href="/exhibitions">Exhibitions</Link>
                <Link href="/">News</Link>
            </Navigation>
            <h1>Hello world</h1>
        </>
    );
}
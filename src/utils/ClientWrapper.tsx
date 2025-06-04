"use client";

import { usePathname } from "next/navigation";
import Rocket from "./Rocket";

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isLandingPage = pathname === "/";

    return (
        <>
            {isLandingPage && <Rocket />}
            {children}
        </>
    );
}

"use client";
import { useState } from "react";
export const AnimatedButton = ({ styles, onClick }: { styles: React.CSSProperties, onClick: () => void }) => {
    const [hovered, setHovered] = useState(false);

    const StandardButton = ({ onClick }: { styles: React.CSSProperties, onClick: () => void }) => {
        return (
            <button className="w-48 h-18 rounded-4xl bg-black text-white flex justify-center items-center border-white border-[0.15rem] cursor-pointer" onClick={onClick} onMouseLeave={() => setHovered(false)}>
                Get Started
            </button>
        )
    }

    if (hovered) return <StandardButton styles={styles} onClick={onClick} />

    return (
        <div className="w-48 h-18 animate-rotate-border rounded-4xl bg-conic/[from_var(--border-angle)] from-black via-white to-black flex p-[2px] cursor-pointer" style={styles} onClick={onClick} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(!hovered)} >
            <div className="p-2 w-full rounded-4xl bg-black flex justify-center items-center text-white">Get Started</div>
        </div>
    )
}


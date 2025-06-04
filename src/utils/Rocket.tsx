"use client";
import React, { useEffect, useState } from "react";
import rocket from "../../public/rocket.png";
import Image from "next/image";

const Rocket = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const updatePosition = (e: MouseEvent) => {
            setPosition({ x: e.clientX, y: e.clientY });
        };
        window.addEventListener("mousemove", updatePosition);
        return () => window.removeEventListener("mousemove", updatePosition);
    }, []);

    return (
        <Image
            src={rocket}
            alt="Spaceship Cursor"
            style={{
                position: "fixed",
                left: position.x,
                top: position.y,
                width: "40px",
                height: "40px",
                pointerEvents: "none",
                transform: "translate(-50%, -50%)",
                zIndex: 9999,
                userSelect: "none",
            }}
            draggable="false"
        />
    );
};

export default Rocket;

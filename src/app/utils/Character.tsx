"use client";
import { useEffect, useRef } from "react";
import { useScroll, motion, useTransform, MotionValue } from "framer-motion";

interface ParagraphProps {
    value: string;
    style: string;
}

export default function Paragraph({ value, style }: ParagraphProps) {
    const element = useRef<HTMLParagraphElement>(null);
    const { scrollYProgress } = useScroll({
        target: element,
        offset: ["start 0.6", "end 0.3"],
    });

    useEffect(() => {
        scrollYProgress.on("change", (progress) => {
            console.log(`Scroll progress: ${progress}`);
        });
    }, [scrollYProgress]);

    const words = value.split(" ");
    return (
        <p className={`${style} flex flex-wrap justify-center`} ref={element}>
            {words.map((word, i) => {
                const start = i / words.length;
                const end = start + 1 / words.length;
                return (
                    <Word key={i} range={[start, end]} progress={scrollYProgress}>
                        {word}
                    </Word>
                );
            })}
        </p>
    );
}

interface WordProps {
    children: string;
    range: [number, number];
    progress: MotionValue<number>;
}

const Word = ({ children, range, progress }: WordProps) => {
    const characters = children.split("");
    const amount = range[1] - range[0];
    const step = amount / characters.length;

    return (
        <span className="mr-2 mt-4">
            {characters.map((char, i) => {
                const start = range[0] + i * step;
                const end = range[0] + (i + 1) * step;
                return (
                    <Character key={i} range={[start, end]} progress={progress}>
                        {char}
                    </Character>
                );
            })}
        </span>
    );
};

interface CharacterProps {
    children: string;
    range: [number, number];
    progress: MotionValue<number>;
}

const Character = ({ children, range, progress }: CharacterProps) => {
    const opacity = useTransform(progress, range, [0, 1]);
    return (
        <span>
            <span className="absolute opacity-10">{children}</span>
            <motion.span className="relative" style={{ opacity }}>
                {children}
            </motion.span>
        </span>
    );
};

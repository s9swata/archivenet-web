export const AnimatedButton = ({ styles }: { styles: React.CSSProperties }) => {
    return (
        <div className="group w-48 h-18 animate-rotate-border rounded-4xl bg-conic/[from_var(--border-angle)] from-black via-white to-black flex p-[2px] hover:bg-white cursor-pointer" style={styles}>
            <div className="p-2 w-full rounded-4xl bg-black flex justify-center items-center text-white">Get Started</div>
        </div>
    )
}
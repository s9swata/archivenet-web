"use client";

const LoadingScreen = ({ progress = 0 }) => {
    return (
        <div className="fixed z-999 inset-0 flex flex-col items-center justify-center bg-black">
            <style jsx>{`
                @keyframes pingpong {
                    0% {
                        transform: translateX(-100%);
                    }
                    100% {
                        transform: translateX(100%);
                    }
                }
            `}</style>

            <div className="flex flex-col items-center gap-4">
                <div className="w-64 h-[0.1rem] rounded-full overflow-hidden relative">
                    <div
                        className="absolute h-full w-1/4 bg-white rounded-full"
                        style={{
                            animation: "pingpong 1.5s linear infinite alternate",
                        }}
                    />
                </div>
            </div>
            <div className="absolute bottom-2 left-2">
                <p className="text-5xl text-white font-[neuePlackExtendedBlack]">
                    {Math.floor(progress)}
                </p>
            </div>
        </div>
    );
};

export default LoadingScreen;

"use client";

const LoadingScreen = ({ progress = 0 }) => {
    return (
        <div className="fixed z-999 inset-0 flex flex-col items-center justify-center bg-black">
            <style jsx>{`
                @keyframes slide {
                    0% {
                        transform: translateX(-100%);
                    }
                    100% {
                        transform: translateX(100%);
                    }
                }
            `}</style>

            <div className="flex flex-col items-center gap-4">
                {/* Track */}
                <div className="w-64 h-[0.1rem] rounded-full overflow-hidden relative">
                    {/* Animated white bar */}
                    <div
                        className="absolute h-full w-1/4 bg-white rounded-full animate-[slide_1.5s_linear_infinite]"
                        style={{
                            transform: 'translateX(-100%)',
                        }}
                    />
                </div>
            </div>
            <div className="absolute bottom-2 left-2">
                {/* Loading text */}
                <p className="text-5xl text-white font-[neuePlackExtendedBlack]">
                    {Math.floor(progress)}
                </p>
            </div>
        </div>
    );
};

export default LoadingScreen;

"use client"
import React, { useState, useEffect, useRef } from 'react'
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Navbar } from '../utils/Navbar';
import Lenis from 'lenis'
import { Models, Features } from '../utils/constants';
import { useGSAP } from '@gsap/react';
import LoadingScreen from '../utils/Loader';
import Paragraph from '../utils/Character';
import { AnimatedButton } from '../utils/AnimatedButton';
import Pricing from '../utils/Pricing';
import { useRouter } from 'next/navigation';

function Home() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const imagesRef = useRef<HTMLImageElement[]>([]);
    const imagesLoadedRef = useRef(0);
    const [isLoading, setIsLoading] = useState(true);
    const [progress, setProgress] = useState(0);

    const router = useRouter();

    useEffect(() => {
        const lenis = new Lenis();

        lenis.on('scroll', ScrollTrigger.update);

        const update = (time: number) => {
            lenis.raf(time * 1000);
        };

        gsap.ticker.add(update);
        gsap.ticker.lagSmoothing(0);

        return () => {
            gsap.ticker.remove(update);
            lenis.destroy();
        };
    }, [])

    const frames = {
        currentIndex: 0,
        maxIndex: 316
    };

    const CDN_URL = process.env.NEXT_PUBLIC_CDN_URL;

    gsap.registerPlugin(ScrollTrigger);

    useGSAP(() => {

        gsap.to('.claude', {
            scale: 1.1,
            yoyo: true,
            repeat: -1,
            duration: 2,
            ease: 'sine.inOut',
        })
        gsap.to('.openAI', {
            scale: 1.1,
            yoyo: true,
            repeat: -1,
            duration: 3,
            ease: 'sine.inOut',
        })
        gsap.to('.grok', {
            scale: 1.1,
            yoyo: true,
            repeat: -1,
            duration: 3,
            ease: 'sine.inOut',
        })
        gsap.to('.llama', {
            scale: 1.1,
            yoyo: true,
            repeat: -1,
            duration: 2,
            ease: 'sine.inOut',
        })
        gsap.to('.deepseek', {
            scale: 1.1,
            yoyo: true,
            repeat: -1,
            duration: 2,
            ease: 'sine.inOut',
        })
        gsap.to('.gemini', {
            scale: 1.1,
            yoyo: true,
            repeat: -1,
            duration: 2,
            ease: 'sine.inOut',
        })

    }, [isLoading]);

    function startAnimation() {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: '.parent',
                start: 'top top',
                scrub: 2,
                end: 'bottom bottom',
            }
        });

        function updateFrame(index: number) {
            return {
                ease: 'linear',
                currentIndex: index,
                onUpdate: () => loadImage(Math.floor(frames.currentIndex)),
            }
        }

        tl
            .to(frames, updateFrame(100), 'a')
            .to(frames, updateFrame(200), 'b')
            .to(".animate1", { opacity: 1, ease: 'linear' }, 'b')
            .to(".first", { opacity: 0.8, ease: 'linear' }, 'b')
            .to(frames, updateFrame(250), 'c')
            .to(".third", { opacity: 0.8, ease: 'linear' }, 'c')
            .to(frames, updateFrame(316), 'c')
            .to(".animate2", { opacity: 1, ease: 'linear' }, 'c')
            .to(".second", { opacity: 0.8, ease: 'linear' }, 'c')
    }

    function preloadImages() {
        if (!CDN_URL) {
            console.error('CDN_URL is not defined');
            return;
        }

        for (let i = 1; i <= frames.maxIndex; i++) {
            const imageUrl = `${CDN_URL}/frame_${i.toString().padStart(4, '0')}.jpg`;
            const img = new Image();

            img.onload = () => {
                imagesLoadedRef.current++;
                imagesRef.current[i - 1] = img;

                const loadProgress = (imagesLoadedRef.current / frames.maxIndex) * 100;
                setProgress(loadProgress);

                if (imagesLoadedRef.current === frames.maxIndex) {
                    console.log('All images preloaded');
                    setTimeout(() => {
                        setIsLoading(false);
                    }
                        , 1000);
                }
            };

            img.onerror = (error) => {
                console.error(`Failed to load image: ${imageUrl}`, error);
            };

            img.src = imageUrl;
        }
    }

    function loadImage(index: number) {

        const canvas = canvasRef.current;
        if (!canvas) return;

        const context = canvas.getContext('2d');
        if (!context) return;

        if (index >= 0 && index < frames.maxIndex) {
            const image = imagesRef.current[index];

            if (!image) {
                console.warn(`Image at index ${index} is not loaded yet`);
                return;
            }

            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;

            const scaleX = canvas.width / image.width;
            const scaleY = canvas.height / image.height;
            const scale = Math.max(scaleX, scaleY); // Maintain aspect ratio

            const newWidth = image.width * scale;
            const newHeight = image.height * scale;

            const offsetX = (canvas.width - newWidth) / 2;
            const offsetY = (canvas.height - newHeight) / 2;

            context.clearRect(0, 0, canvas.width, canvas.height);
            context.imageSmoothingEnabled = true;
            context.imageSmoothingQuality = 'high';
            context.drawImage(image, offsetX, offsetY, newWidth, newHeight);

            const opacityAmount = Math.min(1, index / frames.maxIndex);
            const minOpacity = 0.6;
            const finalOpacity = 1 - (1 - minOpacity) * opacityAmount; // Remap to [1 → 0.6]
            canvas.style.opacity = finalOpacity.toFixed(2);

            canvas.style.transition = "opacity 0.3s ease-out";

            frames.currentIndex = index;
        }
    }

    useEffect(() => {
        preloadImages();

        const handleResize = () => {
            loadImage(Math.floor(frames.currentIndex));
        };

        window.addEventListener('resize', handleResize);

        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        if (!isLoading) {
            requestAnimationFrame(() => {
                loadImage(frames.currentIndex);
                startAnimation();
                ScrollTrigger.refresh();
            });
        }
    }, [isLoading]);

    if (isLoading) return <LoadingScreen progress={progress} />;

    return (
        <div className='w-full bg-black'>
            <div className='parent relative w-full h-[1000vh]'>
                <div className='w-full h-screen sticky top-0 left-0'>
                    <canvas
                        ref={canvasRef}
                        className='w-full h-screen'
                        id="canvas"
                    />
                    <Navbar />
                    <div className='absolute z-2 w-[80vw] top-[40%] left-1/2 transform -translate-x-1/2 text-center space-y-7'>
                        <h1 className='animate1 font-[neuePlackExtendedBlack] text-2xl md:text-5xl text-white opacity-0 drop-shadow-2xl'>WORLD&apos;S FIRST DECENTRALIZED PROTOCOL FOR AI AGENTS</h1>
                        <h2 className='animate2 font-[neuePlackExtendedBold] text-xl md:text-3xl text-white mt-4 opacity-0 drop-shadow-2xl'>THOUSANDS OF AI AGENTS, ONE CONTEXT</h2>
                    </div>
                    <div className='absolute z-2 bottom-5 right-10'>
                        <p className='text-white font-[mubold] text-sm md:text-lg'>+ SCROLL DOWN</p>
                    </div>
                    <div className='absolute z-2 top-30 left-30 rotate-20 claude first opacity-0'>
                        <img src={Models.claude.src} alt="Claude" className='w-20 h-20' />
                    </div>
                    <div className='absolute z-2 top-40 right-30 -rotate-20 openAI second opacity-0'>
                        <img src={Models.openAI.src} alt="OpenAI" className='w-20 h-20' />
                    </div>
                    <div className='absolute z-2 top-20 left-170 grok third opacity-0'>
                        <img src={Models.grok.src} alt="Grok" className='w-20 h-20' />
                    </div>
                    <div className='absolute z-2 bottom-20 left-170 llama first opacity-0'>
                        <img src={Models.llama.src} alt="LLama" className='w-30 h-30' />
                    </div>
                    <div className='absolute z-2 bottom-30 right-30 rotate-20 gemini third opacity-0'>
                        <img src={Models.gemini.src} alt="Gemini" className='w-20 h-20' />
                    </div>
                    <div className='absolute z-2 bottom-40 left-40 -rotate-30 deepseek second opacity-0'>
                        <img src={Models.deepseek.src} alt="Deepseek" className='w-30 h-30' />
                    </div>
                </div>
            </div>
            {/*How it Works Section*/}
            <div className='w-full flex flex-col justify-center p-5 mt-20'>
                <div className='flex flex-col justify-center gap-7 pt-10 px-30'>
                    {Features.map((item, index) => (<ul key={index} className='text-[#dfdcff]'>
                        <h1 className='text-5xl font-[neuePlackExtendedRegular]'>{item.title}</h1>
                        <h2 className='text-2xl'>{item.description}</h2></ul>))}
                </div>
            </div>
            <div className='w-full'>
                <Paragraph value={"Take the first :smirk_cat: step towards secure :smile:, universal memory for agentic models :sunglasses: , unlock shared context and scalable :brain: intelligence"} style={"w-full px-30 pt-20 text-7xl font-[neuePlackExtendedRegular] text-[#dfdcff] text-center"}>
                </Paragraph>
            </div>
            <div className='w-full flex justify-center items-center my-10'>
                <AnimatedButton styles={{ backgroundColor: '#dfdcff' }} onClick={() => router.push("/get-started")} />
            </div>
            <div>
                <Pricing />
            </div>
        </div>
    )
}

export default Home




"use client"
import React, { useEffect, useRef, useState } from 'react'
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';


function Home() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const imagesRef = useRef<HTMLImageElement[]>([]);
    const imagesLoadedRef = useRef(0);


    const frames = {
        currentIndex: 0,
        maxIndex: 316
    }

    const CDN_URL = process.env.NEXT_PUBLIC_CDN_URL;

    gsap.registerPlugin(ScrollTrigger);

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

        tl.to(frames, {
            currentIndex: frames.maxIndex,
            onUpdate: () => loadImage(Math.floor(frames.currentIndex)),
        });
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
                imagesRef.current[i - 1] = img; // Store at correct index

                if (imagesLoadedRef.current === frames.maxIndex) {
                    console.log('All images preloaded');
                    loadImage(frames.currentIndex);
                    startAnimation();
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

            frames.currentIndex = index;
        }
    }

    useEffect(() => {
        preloadImages();

        // Add resize listener inside useEffect to avoid multiple listeners
        const handleResize = () => {
            loadImage(Math.floor(frames.currentIndex));
        };

        window.addEventListener('resize', handleResize);

        // Cleanup function
        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
            window.removeEventListener('resize', handleResize);
        };
    }, []);


    return (
        <div className='w-full bg-zinc-900'>
            <div className='parent relative w-full h-[1000vh]'>
                <div className='w-full h-screen sticky top-0 left-0'>
                    <canvas
                        ref={canvasRef}
                        className='w-full h-screen'
                        id="canvas"
                    />
                    {/*}
                    <div className='absolute z-10 inset-0'>
                        <img
                            src={filter.src}
                            alt="Paper"
                            className='w-full h-screen object-cover pointer-events-none opacity-10'
                        />
                    </div>
                    */}
                </div>
            </div>
        </div>
    )
}

export default Home




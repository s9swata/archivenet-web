import React from 'react';

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-black text-white">
            <div className="container mx-auto px-4 py-16">
                <h1 className="text-4xl font-bold mb-8 text-center font-[neuePlackExtendedBold]">About Us</h1>

                <div className="max-w-3xl mx-auto space-y-8">
                    <h1 className='text-[#dfdcff] w-full text-center text-5xl font-bold font-[neuePlackExtendedBlack]'>Team Vyse</h1>
                    <section>
                        <h2 className="text-2xl font-bold mb-4 font-[neuePlackExtendedBold]">Our Mission</h2>
                        <p className="text-white font-semibold leading-relaxed text-lg">
                            To build bold, beautifully crafted products that solve real problems, spark curiosity, and push the boundaries of what indie hackers can achieve. We believe in shipping fast, learning faster, and creating tools that people truly love to use.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4 font-[neuePlackExtendedBold]">Our Story</h2>
                        <p className="text-white font-semibold text-lg leading-relaxed">
                            We started as a few friends and builders with one shared belief: the best ideas don&apos;t come from massive corporations — they come from small, nimble teams who care deeply about what they&apos;re making.
                            From late-night brainstorming sessions to scrappy prototypes, we&apos;ve turned our passion for solving quirky, overlooked, or downright hard problems into a studio of indie products that punch above their weight.

                            What began as experiments became our way of life — shipping things we&apos;d want to use, and sharing them with the world.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4 font-[neuePlackExtendedBold]">Our Values</h2>
                        <ul className="list-disc list-inside text-white text-lg font-semibold space-y-2">
                            <li>Build Fast, Build Smart</li>
                            <li>Craft &gt; Hype</li>
                            <li>Solve Real Problems</li>
                            <li>Stay Curious</li>
                            <li>Keep It Real</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4 font-[neuePlackExtendedBold]">Our Team</h2>
                        <p className="text-white text-lg font-semibold leading-relaxed">
                            We&apos;re indie makers, hackers, designers, and dreamers — united by a shared love for building cool stuff.
                        </p>
                        <ul className='mt-5 list-disc list-inside'>
                            <li><a href="https://github.com/s9swata" className='text-[#dfdcff] font-bold'>s9swata</a> &#8208; Full Stack Dev & AI Tinkerer<br />
                                Loves shipping fast, breaking things (on purpose), and making tools that feel like magic.
                                Also writes commit messages like haikus.</li>
                            <li><a href="https://github.com/Itz-Agasta" className='text-[#dfdcff] font-bold'>Itz-Agasta</a> &#8208; Full Stack Sorcerer & Infra Whisperer <br />Knows so much about code, cloud, and containers that we&apos;re 90% sure they&apos;re secretly a distributed system in human form.</li>
                            <li><a href="https://github.com/y4sh-codes" className='text-[#dfdcff] font-bold'>y4sh-codes</a> &#8208; The Minimalist Coder <br />Doesn&apos;t overthink, doesn&apos;t overbuild — just gets things done with clean code, calm focus, and zero drama.</li>
                            <li><a href="https://github.com/ZotacMaster" className='text-[#dfdcff] font-bold'>zotac-master</a> &#8208; The Underdog Hacker <br />Constantly second-guesses his code, yet keeps delivering in ways that make us say, “Wait… that actually works?!</li>

                        </ul>
                    </section>
                </div>
            </div>
        </div>
    );
}

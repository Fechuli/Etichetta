"use client";

import Image from "next/image";
import React, { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger, SplitText);

export default function ChSiamo() {
    const containerRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLImageElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const paragraphRef = useRef<HTMLParagraphElement>(null);
    const buttonsRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const wrapWords = (words: Element[]) => {
                words.forEach((word: Element) => {
                    const wrapper = document.createElement("div");
                    wrapper.style.display = "inline-block";
                    wrapper.style.overflow = "hidden";
                    wrapper.style.verticalAlign = "bottom";
                    wrapper.style.paddingRight = "0.2em";
                    word.parentNode?.insertBefore(wrapper, word);
                    wrapper.appendChild(word);
                });
            };

            const splitTitle = new SplitText(titleRef.current, {
                type: "words",
                wordsClass: "word-child",
            });
            const splitParagraph = new SplitText(paragraphRef.current, {
                type: "words",
                wordsClass: "word-child",
            });

            wrapWords(splitTitle.words);
            wrapWords(splitParagraph.words);

            const allWords = [...splitTitle.words, ...splitParagraph.words];

            gsap.set(buttonsRef.current, { opacity: 0, y: 20 });
            gsap.set(imageRef.current, { y: 100, opacity: 0 });
            gsap.set(allWords, {
                y: "100%",
                rotation: 5,
                transformOrigin: "left bottom",
            });

            gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 75%",
                },
            })
            .to(imageRef.current, {
                y: 0,
                opacity: 1,
                duration: 1.2,
                ease: "power3.out",
            })
            .to(
                splitTitle.words,
                {
                    y: "0%",
                    rotation: 0,
                    duration: 1,
                    ease: "power2.out",
                },
                "-=1"
            )
            .to(
                splitParagraph.words,
                {
                    y: "0%",
                    rotation: 0,
                    duration: 0.8,
                    stagger: 0.03,
                    ease: "power2.out",
                },
                "-=0.8"
            )
            .to(
                buttonsRef.current,
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.5,
                    ease: "power2.out",
                },
                "-=0.5" 
            );
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <div className="relative inter overflow-hidden ">
            <div className="absolute bottom-0 left-0 z-0">
                <Image
                    ref={imageRef}
                    src={"/images/manifesto.svg"}
                    alt="Manifesto Image"
                    width={500}
                    height={500}
                    className="lg:w-[40vw] w-[80vw] opacity-30 lg:opacity-100"
                />
            </div>
            
            <div
                ref={containerRef}
                className="relative z-10 lg:py-0 pb-0 lg:pb-[10vw] lg:grid lg:grid-cols-2 flex flex-col inter h-screen w-screen lg:pt-[15vw] pt-[25vw] px-[5vw] lg:px-0 overflow-hidden backdrop-blur-[1vw] bg-[rgba(255,255,255,0.8)]"
            >
                <div className="lg:grid lg:grid-cols-2 lg:items-start lg:justify-center mb-[10vw] lg:mb-0">
                    <h1
                        ref={titleRef}
                        className="lg:col-start-2 text-[12vw] lg:text-[3.5vw] font-semibold -tracking-[0.5vw] lg:-tracking-[0.2vw] leading-[10vw] lg:leading-[3vw] lg:pr-[2vw]"
                    >
                        Chi siamo
                    </h1>
                </div>

                <div className="lg:pr-[2vw] flex flex-col gap-[15vw] lg:gap-[5vw]">
                    <p
                        ref={paragraphRef}
                        className="text-[#878787] lg:max-w-[45vw] lg:px-[1vw] text-[4vw] lg:text-[1vw] leading-[6vw] lg:leading-normal"
                    >
                        <strong className="text-[#0c0c0c]">
                            Backdoor Studio.
                        </strong>{" "}
                        Facciamo branding, web design e molte altre cose.
                        <br />
                        <br />
                        Ogni tanto, però, ci prendiamo del tempo per disturbare
                        il mercato. Questo è uno di quei momenti.
                        <br />
                        <br />
                        Se ti piace &quot;*****&quot;, probabilmente hai bisogno
                        di aiuto.
                        <br />
                        <strong className="text-[#0c0c0c]">
                            Oppure di noi.
                        </strong>
                    </p>

                    <div 
                        ref={buttonsRef}
                        className="flex lg:justify-start justify-between lg:items-center gap-[5vw] lg:gap-[3vw] lg:px-[1vw]">
                        <Link
                            href="https://backdoor-studio.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group duration-300 hover:bg-[#0c0c0c] hover:text-white rounded-full border border-[#0c0c0c] inline-flex items-center justify-center px-[6vw] lg:px-[3vw] py-[2vw] lg:py-[0.5vw] gap-[2vw] lg:gap-[1vw] cursor-pointer w-fit"
                        >
                            <span className="text-[3.5vw] lg:text-[1vw]">
                                Website
                            </span>
                            <svg
                                className="w-[4vw] h-[4vw] lg:w-[1.2vw] lg:h-[1.2vw] transition-transform duration-300 group-hover:translate-x-1"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                                />
                            </svg>
                        </Link>
                        <Link
                            href="https://www.instagram.com/backdoorstudiodesign/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[3.5vw] lg:translate-y-0 translate-y-[1.5vw] lg:text-[1vw] text-[#878787] hover:text-[#0c0c0c] transition-colors duration-300 underline"
                        >
                            Instagram
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
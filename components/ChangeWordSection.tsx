/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useRef, useEffect, useState } from "react";
import ButtonHero from "./ButtonHero";

export default function ChangeWordSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLHeadingElement>(null);
    const wordRef = useRef<HTMLHeadingElement>(null);
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const animationRef = useRef<any>(null);

    const simpleWords = [
        "rof",
        "lodza", 
        "vexzo", 
        "tuc", 
        "vol",
        "tenbra",
    ];

    useEffect(() => {
        setCurrentWordIndex(Math.floor(Math.random() * simpleWords.length));
    }, [simpleWords.length]);

    useEffect(() => {
        const loadGSAP = async () => {
            const { gsap } = await import("gsap");
            const { ScrollTrigger } = await import("gsap/ScrollTrigger");
            const { SplitText } = await import("gsap/SplitText");

            gsap.registerPlugin(ScrollTrigger, SplitText);
            if (!containerRef.current) return;
            await new Promise((resolve) => setTimeout(resolve, 100));

            const textSplit = new SplitText(textRef.current, {
                type: "words",
                wordsClass: "word",
            });

            textSplit.words.forEach((word) => {
                const wrapper = document.createElement("div");
                wrapper.style.overflow = "hidden";
                wrapper.style.display = "inline-block";
                wrapper.style.verticalAlign = "bottom";
                wrapper.style.paddingLeft = "0.1em";
                wrapper.style.paddingRight = "0.1em";
                wrapper.style.marginLeft = "-0.1em";
                wrapper.style.marginRight = "-0.1em";
                word.parentNode?.insertBefore(wrapper, word);
                wrapper.appendChild(word);
            });

            gsap.set(textSplit.words, {
                y: "100%",
                rotation: 5,
                transformOrigin: "left bottom",
            });

            ScrollTrigger.create({
                trigger: containerRef.current,
                start: "top 80%",
                once: true,
                onEnter: () => {
                    gsap.to(textSplit.words, {
                        y: 0,
                        rotation: 0,
                        duration: 0.8,
                        stagger: 0.05,
                        ease: "power2.out",
                    });
                },
            });

            const setupWordAnimation = () => {
                if (!wordRef.current) return;
                const wordWrapper = document.createElement("div");
                wordWrapper.style.overflow = "hidden";
                wordWrapper.style.display = "inline-block";
                wordWrapper.style.position = "relative";

                const isMobile = window.innerWidth < 1024;
                wordWrapper.style.height = isMobile ? "30vw" : "12vw";
                wordWrapper.style.lineHeight = "1";

                if (wordRef.current.parentNode) {
                    wordRef.current.parentNode.insertBefore(
                        wordWrapper,
                        wordRef.current
                    );
                    wordWrapper.appendChild(wordRef.current);
                }
                return wordWrapper;
            };

            const wordWrapper = setupWordAnimation();

            const animateWord = () => {
                const tl = gsap.timeline();
                tl.to(wordRef.current, {
                    y: "-120%",
                    rotation: -5,
                    duration: 0.6,
                    ease: "power2.in",
                    onComplete: () => {
                        setCurrentWordIndex(
                            (prev) => (prev + 1) % simpleWords.length
                        );
                        gsap.set(wordRef.current, { y: "120%", rotation: 5 });
                    },
                }).to(wordRef.current, {
                    y: "0%",
                    rotation: 0,
                    duration: 0.6,
                    ease: "power2.out",
                });
            };

            gsap.set(wordRef.current, {
                y: "120%",
                rotation: 5,
                transformOrigin: "left bottom",
                position: "relative",
            });

            ScrollTrigger.create({
                trigger: containerRef.current,
                start: "top 80%",
                once: true,
                onEnter: () => {
                    gsap.to(wordRef.current, {
                        y: "0%",
                        rotation: 0,
                        duration: 1.2,
                        ease: "power2.out",
                        delay: 0.5,
                        onComplete: () => {
                            animationRef.current = setInterval(
                                animateWord,
                                1500
                            );
                        },
                    });
                },
            });

            return () => {
                ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
                if (animationRef.current) clearInterval(animationRef.current);
                textSplit.revert();
            };
        };

        loadGSAP();
    }, [simpleWords.length]);

    return (
        <div
            ref={containerRef}
            className="relative min-h-screen flex flex-col lg:flex-row inter px-[5vw] items-center justify-center lg:justify-between py-[20vw] lg:py-0 gap-[10vw] lg:gap-0"
        >
            <div className="flex items-center justify-center w-full lg:w-auto">
                <h1
                    ref={textRef}
                    className="text-[7vw] lg:text-[4vw] font-semibold leading-[8vw] lg:leading-[4vw] -tracking-[0.5vw] lg:-tracking-[0.3vw] text-center lg:text-left"
                >
                    Nessuna parola ti definisce,
                    <br />
                    tranne quella che{" "}
                    <span className="text-[#878787]">ti capita.</span>
                </h1>
            </div>

            <div className="flex flex-col items-center relative w-full lg:w-auto">
                <div className="flex flex-col items-center justify-center relative lg:pr-[5vw] blur-[3vw] lg:blur-[2vw] min-w-[80vw] lg:min-w-[40vw] py-[8vw] lg:py-0">
                    <h1
                        ref={wordRef}
                        className="text-[18vw] lg:text-[10vw] font-bold text-[#0c0c0c] -tracking-[0.8vw] lg:-tracking-[0.5vw]"
                        style={{ fontFamily: "Inter, sans-serif" }}
                    >
                        {simpleWords[currentWordIndex]}
                    </h1>
                </div>

                <div className="w-full text-center absolute -bottom-[15vw] lg:-bottom-[5vw]">
                    <div className="mb-[3vw] lg:mb-4">
                        <ButtonHero
                            text="Fai il test ora"
                            function={() => {
                                window.scrollTo({
                                    top: document.body.scrollHeight,
                                    behavior: "smooth",
                                });
                            }}
                            arrowDirection="down"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

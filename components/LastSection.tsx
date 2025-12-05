"use client";

import Link from "next/link";
import React, { useRef, useEffect } from "react";

export default function LastSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const paragraph1Ref = useRef<HTMLParagraphElement>(null);
    const buttonRef = useRef<HTMLDivElement>(null);
    const paragraph2Ref = useRef<HTMLParagraphElement>(null);
    const paragraph3Ref = useRef<HTMLParagraphElement>(null);

    useEffect(() => {
        const loadGSAP = async () => {
            const { gsap } = await import("gsap");
            const { ScrollTrigger } = await import("gsap/ScrollTrigger");
            const { SplitText } = await import("gsap/SplitText");

            gsap.registerPlugin(ScrollTrigger, SplitText);

            if (!containerRef.current) return;

            await new Promise((resolve) => setTimeout(resolve, 100));

            const splitTitle = new SplitText(titleRef.current, {
                type: "words",
                wordsClass: "word",
            });
            const splitP1 = new SplitText(paragraph1Ref.current, {
                type: "words",
                wordsClass: "word",
            });
            const splitP2 = new SplitText(paragraph2Ref.current, {
                type: "words",
                wordsClass: "word",
            });
            const splitP3 = new SplitText(paragraph3Ref.current, {
                type: "words",
                wordsClass: "word",
            });

            const allWords = [
                ...splitTitle.words,
                ...splitP1.words,
                ...splitP2.words,
                ...splitP3.words,
            ];

            allWords.forEach((word) => {
                const wrapper = document.createElement("div");
                wrapper.style.overflow = "hidden";
                wrapper.style.display = "inline-block";
                wrapper.style.verticalAlign = "bottom";
                wrapper.style.paddingLeft = "0.15em";
                wrapper.style.paddingRight = "0.15em";
                wrapper.style.marginLeft = "-0.15em";
                wrapper.style.marginRight = "-0.15em";
                word.parentNode?.insertBefore(wrapper, word);
                wrapper.appendChild(word);
            });

            gsap.set(allWords, {
                y: "100%",
                rotation: 5,
                transformOrigin: "left bottom",
            });

            gsap.set(buttonRef.current, {
                opacity: 0,
                y: 20,
            });

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 80%",
                    end: "bottom 20%",
                    toggleActions: "play none none reverse",
                },
            });

            tl.to(splitTitle.words, {
                y: 0,
                rotation: 0,
                duration: 0.8,
                stagger: 0.1,
                ease: "power2.out",
            })
                .to(
                    splitP1.words,
                    {
                        y: 0,
                        rotation: 0,
                        duration: 0.8,
                        stagger: 0.05,
                        ease: "power2.out",
                    },
                    "-=0.4"
                )
                .to(
                    buttonRef.current,
                    {
                        opacity: 1,
                        y: 50,
                        duration: 0.6,
                        ease: "power2.out",
                    },
                    "-=0.4"
                )
                .to(
                    splitP2.words,
                    {
                        y: 0,
                        rotation: 0,
                        duration: 0.8,
                        stagger: 0.05,
                        ease: "power2.out",
                    },
                    "-=0.2"
                )
                .to(
                    splitP3.words,
                    {
                        y: 0,
                        rotation: 0,
                        duration: 0.8,
                        stagger: 0.05,
                        ease: "power2.out",
                    },
                    "-=0.4"
                );

            return () => {
                ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
                splitTitle.revert();
                splitP1.revert();
                splitP2.revert();
                splitP3.revert();
            };
        };

        loadGSAP();
    }, []);

    return (
        <div
            ref={containerRef}
            className="relative bg-[#0c0c0c] h-screen flex item-center flex-col justify-center text-center inter overflow-hidden px-[5vw] lg:px-0"
        >
            <div className="lg:-translate-y-0 -translate-y-[15vw]">
                <h1
                    ref={titleRef}
                    className="text-[10vw] lg:text-[4vw] font-semibold leading-[8vw] lg:leading-[4vw] -tracking-[0.5vw] lg:-tracking-[0.3vw] mb-[5vw] lg:mb-[2vw]"
                >
                    <span className="text-white">Finche&apos; lo vorrai,</span>
                    <br />
                    <span className="text-[#878787]">sarai questo</span>
                </h1>

                <p
                    ref={paragraph1Ref}
                    className="text-white lg:mb-[2vw] text-[3.5vw] lg:text-[1vw] leading-[5vw] lg:leading-normal"
                >
                    Puoi farlo <strong>una volta sola.</strong>
                    <br />
                    Perché scegliere davvero significa non tornare indietro.
                </p>
            </div>

            <div ref={buttonRef}>
                <Link
                    href={"/test"}
                    className="cursor-pointer hover:bg-[#0c0c0c] transition-colors hover:text-white border lg:px-[2vw] px-[8vw] py-[2vw] lg:py-[0.5vw] border-white rounded-full bg-white text-[#0c0c0c]"
                >
                    Inizia il test*
                </Link>
            </div>

            <div className="mt-[20vw] lg:mt-[8vw]">
                <p
                    ref={paragraph2Ref}
                    className="text-[#878787] mb-[3vw] lg:mb-[1.5vw] text-[3.5vw] lg:text-[1vw] leading-[5vw] lg:leading-normal"
                >
                    10 domande • 3 min • 1 parola
                </p>

                <p
                    ref={paragraph3Ref}
                    className="text-[#878787] text-[3.5vw] lg:text-[1vw] leading-[5vw] lg:leading-normal"
                >
                    *Questo manifesto continuerà ad esistere <br />
                    ma le parole non verranno più stampate a <br />
                    partire dal 20/1/26
                </p>
            </div>
        </div>
    );
}

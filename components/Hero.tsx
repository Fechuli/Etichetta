"use client";

import Image from "next/image";
import React, { useRef, useEffect } from "react";
import ButtonHero from "./ButtonHero";

export default function Hero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const title1Ref = useRef<HTMLHeadingElement>(null);
    const title2Ref = useRef<HTMLHeadingElement>(null);
    const title3Ref = useRef<HTMLHeadingElement>(null);
    const paragraphRef = useRef<HTMLParagraphElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const loadGSAP = async () => {
            const { gsap } = await import("gsap");
            const { ScrollTrigger } = await import("gsap/ScrollTrigger");
            const { SplitText } = await import("gsap/SplitText");

            gsap.registerPlugin(ScrollTrigger, SplitText);

            if (!containerRef.current) return;

            await new Promise((resolve) => setTimeout(resolve, 100));

            const split1 = new SplitText(title1Ref.current, {
                type: "words",
                wordsClass: "word",
            });
            const split2 = new SplitText(title2Ref.current, {
                type: "words",
                wordsClass: "word",
            });
            const split3 = new SplitText(title3Ref.current, {
                type: "words",
                wordsClass: "word",
            });
            const splitP = new SplitText(paragraphRef.current, {
                type: "words",
                wordsClass: "word",
            });

            const allWords = [
                ...split1.words,
                ...split2.words,
                ...split3.words,
                ...splitP.words,
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

            gsap.set([imageRef.current, buttonRef.current], {
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

            tl.to(split1.words, {
                y: 0,
                rotation: 0,
                duration: 0.8,
                stagger: 0.1,
                ease: "power2.out",
            })
                .to(
                    split2.words,
                    {
                        y: 0,
                        rotation: 0,
                        duration: 0.8,
                        stagger: 0.1,
                        ease: "power2.out",
                    },
                    "-=0.4"
                )
                .to(
                    imageRef.current,
                    {
                        opacity: 1,
                        y: 10,
                        duration: 0.6,
                        ease: "power2.out",
                    },
                    "-=0.6"
                )
                .to(
                    split3.words,
                    {
                        y: 0,
                        rotation: 0,
                        duration: 0.8,
                        stagger: 0.1,
                        ease: "power2.out",
                    },
                    "-=0.4"
                )
                .to(
                    splitP.words,
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
                );

            return () => {
                ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
                split1.revert();
                split2.revert();
                split3.revert();
                splitP.revert();
            };
        };

        loadGSAP();
    }, []);

    return (
        <div
            ref={containerRef}
            className="relative h-screen flex item-center flex-col justify-center text-center inter overflow-hidden px-[5vw] lg:px-0"
        >
            <div className="lg:-translate-y-0 -translate-y-[15vw]">
                <h1
                    ref={title1Ref}
                    className="text-[10vw] lg:text-[4vw] font-semibold text-[#878787] leading-[8vw] lg:leading-[4vw] -tracking-[0.5vw] lg:-tracking-[0.3vw]"
                >
                    Ti sono state date
                </h1>
                <div className="relative my-[2vw] lg:my-0">
                    <h1
                        ref={title2Ref}
                        className="text-[10vw] lg:text-[4vw] font-semibold text-[#0C0C0C] -tracking-[0.5vw] lg:-tracking-[0.3vw]"
                    >
                        etichette
                    </h1>
                    <div
                        ref={imageRef}
                        className="absolute -top-[8%] left-[50%] -translate-x-[50%] lg:top-0 "
                    >
                        <Image
                            src={"/images/etichetta.svg"}
                            alt="Hero Image"
                            width={500}
                            height={500}
                            className="w-[50vw] lg:w-[20vw]"
                        />
                    </div>
                </div>
                <h1
                    ref={title3Ref}
                    className="text-[10vw] lg:text-[4vw] font-semibold text-[#878787] leading-[8vw] lg:leading-[4vw] -tracking-[0.5vw] lg:-tracking-[0.3vw]"
                >
                    tutta la vita
                </h1>
                <p
                    ref={paragraphRef}
                    className="text-[#878787] mt-[5vw] lg:mt-[2vw] text-[3.5vw] lg:text-[1vw] leading-[5vw] lg:leading-normal"
                >
                    Parole scelte da altri.
                    <br /> Stavolta la scegli tu.
                </p>
            </div>
            <div ref={buttonRef}>
                <ButtonHero
                    text="Dimmi di più"
                    arrowDirection="down"
                    function={() => {
                        window.scrollTo({
                            top: window.innerHeight,
                            behavior: "smooth",
                        });
                    }}
                />
            </div>
        </div>
    );
}

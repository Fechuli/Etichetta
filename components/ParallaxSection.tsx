/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useRef, useEffect } from "react";

export default function ParallaxSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const word1Ref = useRef<HTMLDivElement>(null);
    const word2Ref = useRef<HTMLDivElement>(null);
    const paragraph1Ref = useRef<HTMLDivElement>(null);
    const paragraph2Ref = useRef<HTMLDivElement>(null);
    const topSectionRef = useRef<HTMLDivElement>(null);
    const bottomSectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const loadGSAP = async () => {
            try {
                const { gsap } = await import("gsap");
                const { ScrollTrigger } = await import("gsap/ScrollTrigger");
                const { SplitText } = await import("gsap/SplitText");

                gsap.registerPlugin(ScrollTrigger, SplitText);

                if (!containerRef.current || !contentRef.current) return;

                const waitForDOM = () => {
                    return new Promise<void>((resolve) => {
                        const checkDOM = () => {
                            if (
                                word1Ref.current?.textContent &&
                                word2Ref.current?.textContent &&
                                paragraph1Ref.current?.textContent &&
                                paragraph2Ref.current?.textContent
                            ) {
                                resolve();
                            } else {
                                requestAnimationFrame(checkDOM);
                            }
                        };
                        checkDOM();
                    });
                };

                await waitForDOM();

                if (!word1Ref.current || !word2Ref.current || !paragraph1Ref.current || !paragraph2Ref.current) return;

                gsap.set(paragraph1Ref.current, { opacity: 0 });
                gsap.set(paragraph2Ref.current, { opacity: 0 });

                const split1 = new SplitText(word1Ref.current, { type: "chars" });
                const split2 = new SplitText(word2Ref.current, { type: "chars" });

                const paragraph1Split = new SplitText(paragraph1Ref.current, {
                    type: "words",
                    wordsClass: "word",
                });

                const paragraph2Split = new SplitText(paragraph2Ref.current, {
                    type: "words",
                    wordsClass: "word2",
                });

                gsap.set(paragraph1Ref.current, { opacity: 1 });
                gsap.set(paragraph2Ref.current, { opacity: 1 });

            const wrapWords = (words: any[]) => {
                words.forEach((word) => {
                    const wrapper = document.createElement("div");
                    wrapper.style.overflow = "hidden";
                    wrapper.style.display = "inline-block";
                    wrapper.style.verticalAlign = "bottom";
                    word.parentNode?.insertBefore(wrapper, word);
                    wrapper.appendChild(word);
                });
            };

            wrapWords(paragraph1Split.words);
            wrapWords(paragraph2Split.words);

            gsap.set(paragraph1Split.words, {
                y: "100%",
                rotation: 5,
                transformOrigin: "left bottom",
            });

            gsap.set(paragraph2Split.words, {
                y: "100%",
                rotation: 5,
                transformOrigin: "left bottom",
            });

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: "bottom bottom",
                    pin: contentRef.current,
                    scrub: 1,
                },
            });

            tl.from(split1.chars, {
                opacity: 1,
                y: 200,
                duration: 2,
                stagger: 0.4,
                ease: "power2.out",
            })
                .to(
                    paragraph1Split.words,
                    {
                        y: 0,
                        rotation: 0,
                        duration: 1.2,
                        stagger: 0.08,
                        ease: "power2.out",
                    },
                    "-=1.5"
                )

                .addLabel("colorChange")
                .to(
                    topSectionRef.current,
                    {
                        backgroundColor: "#0c0c0c",
                        duration: 1.5,
                        ease: "power2.inOut",
                    },
                    "colorChange"
                )
                .to(
                    bottomSectionRef.current,
                    {
                        backgroundColor: "#ffffff",
                        duration: 1.5,
                        ease: "power2.inOut",
                    },
                    "colorChange"
                )

                .to(
                    word1Ref.current,
                    {
                        y: "-100vh",
                        opacity: 0,
                        duration: 1,
                        ease: "power2.in",
                    },
                    "colorChange+=1"
                )
                .to(
                    paragraph1Ref.current,
                    {
                        duration: 1,
                        opacity: 0,
                        ease: "power2.in",
                    },
                    "colorChange+=1"
                );
            tl.addLabel("scena2", "colorChange+=1.5")
                .fromTo(
                    word2Ref.current,
                    { y: "100vh", opacity: 0 },
                    { y: 0, opacity: 1, duration: 1.5, ease: "power2.out" },
                    "scena2"
                )
                .from(
                    split2.chars,
                    {
                        opacity: 1,
                        y: 200,
                        duration: 2,
                        stagger: 0.4,
                        ease: "power2.out",
                    },
                    "scena2+=0.7"
                );

            tl.to(
                paragraph2Split.words,
                {
                    y: 0,
                    rotation: 0,
                    duration: 1,
                    stagger: 0.08,
                    ease: "power2.out",
                },
                "scena2+=2.8"
            );

                return () => {
                    split1?.revert();
                    split2?.revert();
                    paragraph1Split?.revert();
                    paragraph2Split?.revert();
                    tl?.kill();
                    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
                };
            } catch (error) {
                console.error("Errore caricamento GSAP:", error);
                return;
            }
        };

        loadGSAP();
    }, []);

    return (
        <div ref={containerRef} className="relative lg:h-[500vw] h-[1000vw]">
            <div ref={contentRef} className="h-screen relative overflow-hidden">
                <div
                    ref={topSectionRef}
                    className="absolute top-0 left-0 w-full h-[40vh]"
                    style={{ backgroundColor: "#ffffff" }}
                />

                <div
                    ref={bottomSectionRef}
                    className="absolute bottom-0 left-0 w-full h-[60vh]"
                    style={{ backgroundColor: "#0c0c0c" }}
                />

                <div
                    ref={word1Ref}
                    className="absolute left-1/2 lg:top-[35vh] top-[39vh] transform -translate-x-1/2 -translate-y-1/2 z-10 w-full whitespace-nowrap"
                    style={{
                        fontSize: "clamp(3rem, 22vw, 25rem)",
                        fontWeight: "bold",
                        color: "#0c0c0c",
                        fontFamily: "Inter, sans-serif",
                        letterSpacing: "-0.05em",
                        textAlign: "center",
                        lineHeight: "0.8",
                    }}
                >
                    Inventato
                </div>

                <div
                    ref={word2Ref}
                    className="absolute left-1/2 lg:top-[35vh] top-[39vh] transform -translate-x-1/2 -translate-y-1/2 z-10 opacity-0 w-full px-[2vw] whitespace-nowrap"
                    style={{
                        fontSize: "clamp(3rem, 22vw, 25rem)",
                        fontWeight: "bold",
                        color: "#ffffff",
                        fontFamily: "Inter, sans-serif",
                        letterSpacing: "-0.05em",
                        textAlign: "center",
                        lineHeight: "0.8",
                    }}
                >
                    Sbagliato
                </div>

                <div
                    ref={paragraph1Ref}
                    className="absolute right-[5vw] lg:right-[15vw] bottom-[70vw] lg:top-[28vw] max-w-[90vw] lg:max-w-[35vw] z-20 text-white text-[3.5vw] lg:text-[1vw] leading-[5vw] lg:leading-[1.2vw] font-light"
                >
                    Come tutte
                    <br /> <span className="font-bold">le parole.</span>
                    <br />
                    <br />
                    (e come tutte le parole avrà un significato)
                </div>

                <div
                    ref={paragraph2Ref}
                    className="text-[#878787] absolute right-[48vw] lg:right-[15vw] bottom-[75vw] lg:top-[28vw] max-w-[90vw] lg:max-w-[35vw] z-20 text-[3.5vw] lg:text-[1vw] leading-[5vw] lg:leading-[1.2vw] font-light lg:pr-[12vw] inter"
                >
                    Ma solo perché
                    <br />
                    domani potresti
                    <br />
                    <span className="font-bold text-[#0c0c0c]">cambiare.</span>
                </div>
            </div>
        </div>
    );
}

"use client";

import Image from "next/image";
import React, { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

export default function Manifesto() {
    const containerRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLImageElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const paragraphRef = useRef<HTMLParagraphElement>(null);

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
                );
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <div className="relative inter overflow-hidden ">
            <div className="absolute bottom-0  left-0">
                <Image
                    ref={imageRef}
                    src={"/images/manifesto.svg"}
                    alt="Manifesto Image"
                    width={500}
                    height={500}
                    className="lg:w-[40vw] w-[100vw] opacity-30 lg:opacity-100"
                />
            </div>

            <div
                ref={containerRef}
                className="lg:py-0 py-[10vw] lg:grid lg:grid-cols-2 flex flex-col inter min-h-screen w-screen lg:pt-[15vw] pt-[25vw] px-[5vw] lg:px-0 overflow-hidden backdrop-blur-[1vw] bg-[rgba(255,255,255,0.8)]"
            >
                <div className="lg:grid lg:grid-cols-2 lg:items-start lg:justify-center mb-[10vw] lg:mb-0">
                    <h1
                        ref={titleRef}
                        className="lg:col-start-2 text-[12vw] lg:text-[3.5vw] font-semibold -tracking-[0.5vw] lg:-tracking-[0.2vw] leading-[10vw] lg:leading-[3vw] lg:pr-[2vw]"
                    >
                        Manifesto
                    </h1>
                </div>

                <div className="lg:pr-[2vw] text-[#878787]">
                    <p
                        ref={paragraphRef}
                        className="lg:max-w-[45vw] lg:px-[1vw] text-[4vw] lg:text-[1vw] leading-[6vw] lg:leading-normal"
                    >
                        <strong className="text-[#0c0c0c]">
                            Le parole ci precedono.
                        </strong>{" "}
                        Prima ancora di nascere, esistono già le categorie che
                        ci definiranno: figlio, figlia, primo, secondo, atteso,
                        non voluto.
                        <br />
                        <br />
                        <strong className="text-[#0c0c0c]">
                            &quot;Questo progetto è un esperimento di libertà
                            temporanea.&quot;
                        </strong>
                        <br />
                        <br />
                        Cresciamo raccogliendo etichette. Gli altri decidono che
                        siamo timidi, estroversi, bravi, cattivi, normali,
                        strani.
                        <strong className="text-[#0c0c0c]">
                            {" "}
                            Ci abituiamo a riconoscerci in parole che non
                            abbiamo scelto.
                        </strong>
                        <br />
                        <br />
                        Ti offriamo una parola inventata.
                        <strong className="text-[#0c0c0c]">
                            {" "}
                            Non ha storia, non ha giudizi, non ha aspettative.
                        </strong>{" "}
                        È tua nel momento in cui la ricevi, e resterà tua finché
                        sceglierai di tenerla.
                        <br />
                        <br />
                        <strong className="text-[#0c0c0c]">
                            La parola sbagliata non esiste.
                        </strong>{" "}
                        Esiste solo la parola che hai oggi, che potresti non
                        avere domani, che nessuno può toglierti se non tu.
                        <br />
                        <br />
                        Quello che riceverai è il promemoria di questo momento:
                        <strong className="text-[#0c0c0c]">
                            {" "}
                            quando hai scelto di essere qualcosa che nessuno
                            aveva mai nominato prima.
                        </strong>
                    </p>
                </div>
            </div>
        </div>
    );
}

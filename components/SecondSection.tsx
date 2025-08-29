'use client'

import Image from "next/image";
import React, { useRef, useEffect } from "react";

export default function SecondSection() {
    const containerRef = useRef<HTMLDivElement>(null)
    const text1Ref = useRef<HTMLParagraphElement>(null)
    const text2Ref = useRef<HTMLParagraphElement>(null)
    const titleRef = useRef<HTMLHeadingElement>(null)
    const text3Ref = useRef<HTMLParagraphElement>(null)

    useEffect(() => {
        const loadGSAP = async () => {
            const { gsap } = await import('gsap')
            const { ScrollTrigger } = await import('gsap/ScrollTrigger')
            const { SplitText } = await import('gsap/SplitText')

            gsap.registerPlugin(ScrollTrigger, SplitText)

            if (!containerRef.current) return

            await new Promise(resolve => setTimeout(resolve, 100))

            const split1 = new SplitText(text1Ref.current, { 
                type: 'words',
                wordsClass: 'word'
            })
            const split2 = new SplitText(text2Ref.current, { 
                type: 'words',
                wordsClass: 'word'
            })
            const split3 = new SplitText(titleRef.current, { 
                type: 'words',
                wordsClass: 'word'
            })
            const split4 = new SplitText(text3Ref.current, { 
                type: 'words',
                wordsClass: 'word'
            })

            const setupWords = (words: Element[]) => {
                words.forEach(word => {
                    const wrapper = document.createElement('div')
                    wrapper.style.overflow = 'hidden'
                    wrapper.style.display = 'inline-block'
                    wrapper.style.verticalAlign = 'bottom'
                    wrapper.style.paddingLeft = '0.1em'
                    wrapper.style.paddingRight = '0.1em'
                    wrapper.style.marginLeft = '-0.1em'
                    wrapper.style.marginRight = '-0.1em'
                    word.parentNode?.insertBefore(wrapper, word)
                    wrapper.appendChild(word)
                })

                gsap.set(words, {
                    y: '100%',
                    rotation: 5,
                    transformOrigin: 'left bottom'
                })
            }

            setupWords(split1.words)
            setupWords(split2.words)
            setupWords(split3.words)
            setupWords(split4.words)

            ScrollTrigger.batch([...split1.words, ...split2.words], {
                onEnter: batch => {
                    gsap.to(batch, {
                        y: 0,
                        rotation: 0,
                        duration: 0.8,
                        stagger: 0.05,
                        ease: 'power2.out',
                        overwrite: true
                    })
                },
                start: 'top 85%',
                once: true
            })

            ScrollTrigger.batch([...split3.words, ...split4.words], {
                onEnter: batch => {
                    gsap.to(batch, {
                        y: 0,
                        rotation: 0,
                        duration: 0.8,
                        stagger: 0.05,
                        ease: 'power2.out',
                        overwrite: true
                    })
                },
                start: 'top 85%',
                once: true
            })

            return () => {
                ScrollTrigger.getAll().forEach(trigger => trigger.kill())
                split1.revert()
                split2.revert()
                split3.revert()
                split4.revert()
            }
        }

        loadGSAP()
    }, [])

    return (
        <div ref={containerRef} className="relative inter">
            <div className="absolute -top-[25vw] lg:-top-[27.5vw] w-screen pointer-events-none">
                <Image
                    src={"/images/cupro.svg"}
                    alt="Hero Background"
                    width={1000}
                    height={1000}
                    className="w-full h-auto"
                />
            </div>
            
            <div className="absolute -bottom-[30vw] lg:-bottom-[18vw] w-screen">
                <Image
                    src={"/images/moffo.svg"}
                    alt="Hero Background"
                    width={1000}
                    height={1000}
                    className="w-[90%] lg:w-[60%] h-auto"
                />
            </div>
            
            <div className="pt-[30vw] lg:pt-[15vw] flex flex-col lg:flex-row justify-between items-start w-full h-full backdrop-blur-[2vw] bg-[rgba(255,255,255,0.8)] px-[5vw] lg:px-[10vw] gap-[10vw] lg:gap-0">
                <p ref={text1Ref} className="text-[5vw] lg:text-[2vw] backdrop-blur-full blur-[0.8vw] lg:blur-[0.5vw] leading-[7vw] lg:leading-normal">
                    <strong>Non</strong> ti chiede chi sei. <br />
                    <strong>Non</strong> cerca di etichettarti. <br />
                    <strong>Non</strong> vuole capirti.
                </p>
                <p ref={text2Ref} className="text-[#878787] text-[3.5vw] lg:text-[1vw] text-left leading-[5vw] lg:leading-normal">
                    Da quando sei nato le parole ti definiscono.
                    <br />
                    <strong className="text-[#0c0c0c]">
                        Figlio, studente, amico.
                    </strong>
                    <br />
                    <br />
                    Poi arrivano quelle degli altri.
                    <br />
                    <strong className="text-[#0c0c0c]">
                        Timido, estroverso, bravo.
                    </strong>
                    <br />
                    <br />
                    Questo progetto ti offre una parola diversa.
                    <br />
                    <strong className="text-[#0c0c0c]">
                        Inventata.
                        <br /> Temporanea.
                        <br />
                        <br /> TUA.
                    </strong>
                </p>
            </div>
            
            <div className="pt-[30vw] lg:pt-[20vw] flex flex-col items-start lg:items-end justify-center backdrop-blur-[2vw] pb-[20vw] lg:pb-[10vw] bg-[rgba(255,255,255,0.8)] px-[5vw] lg:px-0">
                <div className="flex flex-col">
                    <h1 ref={titleRef} className="text-[6vw] lg:text-[3vw] text-left text-[#878787] leading-[7vw] lg:leading-[3vw] lg:pr-[15vw]">
                        <strong className="text-[#0c0c0c]">Tutti hanno un&apos;idea di te.</strong><br/>
                        <strong>Questo progetto no.</strong>
                    </h1>
                </div>
                <p ref={text3Ref} className="text-[3.5vw] lg:text-[1vw] text-[#878787] text-left lg:pr-[25vw] pt-[8vw] lg:pt-[5vw] leading-[5vw] lg:leading-normal">
                    <strong className="text-[#0c0c0c]">Non</strong> ti chiede chi sei. <br />
                    <strong className="text-[#0c0c0c]">Non</strong> cerca di etichettarti. <br />
                    <strong className="text-[#0c0c0c]">Non</strong> vuole capirti.
                    <br/><br/>
                    Ti fa delle domanda e, poi, ti <strong className="text-[#0c0c0c]">affida una parola</strong>.
                </p>
            </div>
        
        </div>
    );
}
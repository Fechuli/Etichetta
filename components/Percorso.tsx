"use client";

import React, { useRef, useEffect, useState } from "react";

interface Step {
    id: number;
    title: string;
    description: string;
}

const steps: Step[] = [
    {
        id: 1,
        title: "Rispondi",
        description: "10 domande per esplorare chi sei ora",
    },
    {
        id: 2,
        title: "Ricevi",
        description: "Una parola inventata, solo per te",
    },
    {
        id: 3,
        title: "Scegli",
        description: "Se accettare questa nuova identità",
    },
    {
        id: 4,
        title: "Stampa",
        description: "La parola diventa oggetto tangibile",
    },
    { id: 5, title: "Usalo", description: "Finché lo vorrai, sarai questo" },
];

export default function Percorso() {
    const containerRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const [progress, setProgress] = useState(0);
    const [activeStep, setActiveStep] = useState(1);

    useEffect(() => {
        let isMounted = true;
        
        const loadGSAP = async () => {
            try {
                const { gsap } = await import("gsap");
                const { ScrollTrigger } = await import("gsap/ScrollTrigger");

                gsap.registerPlugin(ScrollTrigger);

                const waitForElements = () => {
                    return new Promise<void>((resolve) => {
                        const check = () => {
                            if (containerRef.current && contentRef.current) {
                                resolve();
                            } else {
                                requestAnimationFrame(check);
                            }
                        };
                        check();
                    });
                };

                await waitForElements();

                if (!containerRef.current || !contentRef.current || !isMounted) return;

                ScrollTrigger.refresh();

                const trigger = ScrollTrigger.create({
                    trigger: containerRef.current,
                    start: "top top",
                    end: "bottom bottom",
                    pin: contentRef.current,
                    pinSpacing: false,
                    scrub: 1,
                    invalidateOnRefresh: true,
                    onUpdate: (self) => {
                        if (!isMounted) return;
                        
                        const rawProgress = self.progress;
                        const step = Math.min(Math.floor(rawProgress * 5) + 1, 5);
                        setActiveStep(step);

                        const lineProgress = Math.min(
                            (step - 1) / (steps.length - 1),
                            1
                        );
                        setProgress(lineProgress);
                    },
                });

                return () => {
                    isMounted = false;
                    trigger.kill();
                };
            } catch (error) {
                console.error("Errore caricamento GSAP:", error);
                return;
            }
        };

        loadGSAP();

        return () => {
            isMounted = false;
        };
    }, []);

    return (
        <div ref={containerRef} className="relative h-[400vh]">
            <div
                ref={contentRef}
                className="h-screen flex items-center justify-center p-[5vw] lg:p-[2vw]"
            >
                <div className="w-full max-w-[90vw] mx-auto rounded-[6vw] lg:rounded-[3vw] bg-[#F3F4F6] inter px-[8vw] lg:px-[5vw] py-[15vw] lg:py-[10vw]">
                    <h1 className="font-semibold text-[#0c0c0c] text-center text-[10vw] lg:text-[5vw] mb-[8vw] lg:mb-[4vw] tracking-tighter">
                        Come funziona
                    </h1>

                    <div className="relative">
                        <div className="hidden lg:block">
                            <div className="flex items-start gap-[6vw] relative z-10">
                                <div
                                    className="absolute top-[1vw] left-[0.6vw] h-[0.2vw] bg-[#EBEBEB] rounded-full"
                                    style={{
                                        width: `calc(100% - ${6 + 5}vw)`,
                                    }}
                                >
                                    <div
                                        className="h-full bg-[#0c0c0c] rounded-full origin-left transition-all duration-500 ease-out"
                                        style={{ width: `${progress * 100}%` }}
                                    />
                                </div>
                                {steps.map((step) => (
                                    <div
                                        key={step.id}
                                        className="flex flex-col items-start w-[16vw]"
                                    >
                                        <div
                                            className="translate-y-[0.5vw] w-[1.2vw] h-[1.2vw] rounded-full border-[0.15vw] mb-[1vw] transition-all duration-500 ease-out"
                                            style={{
                                                borderColor:
                                                    activeStep >= step.id
                                                        ? "#0c0c0c"
                                                        : "#EBEBEB",
                                                backgroundColor:
                                                    activeStep >= step.id
                                                        ? "#0c0c0c"
                                                        : "#EBEBEB",
                                            }}
                                        />

                                        <div
                                            className={
                                                "text-[2vw] font-bold text-[#0c0c0c] mb-[0.8vw]"
                                            }
                                            style={{
                                                opacity:
                                                    activeStep >= step.id
                                                        ? 1
                                                        : 0.5,
                                            }}
                                        >
                                            {step.id}
                                        </div>

                                        <div
                                            className="text-left transition-all duration-500 ease-out"
                                            style={{
                                                opacity:
                                                    activeStep >= step.id
                                                        ? 1
                                                        : 0,
                                            }}
                                        >
                                            <h3 className="font-semibold text-[#0c0c0c] text-[1.5vw] mb-[0.4vw]">
                                                {step.title}
                                            </h3>
                                            <p className="text-[#878787] text-[0.9vw] leading-relaxed">
                                                {step.description}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="lg:hidden space-y-[8vw]">
                            {steps.map((step, index) => (
                                <div
                                    key={step.id}
                                    className="flex items-start space-x-[4vw] relative"
                                >
                                    {index < steps.length - 1 && (
                                        <div className="absolute left-[1.8vw] top-[8vw] w-[0.5vw] h-[12vw] bg-[#EBEBEB]">
                                            <div
                                                className="w-full bg-[#0c0c0c] origin-top transition-all duration-500 ease-out"
                                                style={{
                                                    height:
                                                        activeStep > step.id
                                                            ? "100%"
                                                            : "0%",
                                                }}
                                            />
                                        </div>
                                    )}

                                    <div className="flex flex-col items-center">
                                        <div
                                            className="w-[4vw] h-[4vw] rounded-full border-[0.8vw] mb-[2vw] transition-all duration-500 ease-out"
                                            style={{
                                                borderColor:
                                                    activeStep >= step.id
                                                        ? "#0c0c0c"
                                                        : "#EBEBEB",
                                                backgroundColor:
                                                    activeStep >= step.id
                                                        ? "#0c0c0c"
                                                        : "transparent",
                                            }}
                                        />
                                    </div>

                                    <div
                                        className="flex-1 text-left transition-all duration-500 ease-out pt-[1vw]"
                                        style={{
                                            opacity:
                                                activeStep >= step.id ? 1 : 0.3,
                                        }}
                                    >
                                        <h3 className="font-semibold text-[#0c0c0c] text-[5vw] mb-[1vw]">
                                            {step.title}
                                        </h3>
                                        <p className="text-[#878787] text-[3.5vw] leading-[5vw]">
                                            {step.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

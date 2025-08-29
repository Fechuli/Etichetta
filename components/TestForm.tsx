"use client";

import { ArrowRight } from "lucide-react";
import React, { useState, useRef, useEffect } from "react";
import { words } from "@/constants";
import Image from "next/image";
import Link from "next/link";

interface Question {
    id: number;
    question: string;
    answers: string[];
}

const questions: Question[] = [
    {
        id: 1,
        question: "Ti fidi del tuo istinto o cerchi conferme?",
        answers: [
            "Sempre istinto, anche quando sbaglia.",
            "Conferme, finché mi convincono.",
            "Dipende da chi me lo chiede.",
        ],
    },
    {
        id: 2,
        question:
            "Quando prendi una decisione importante, la condividi con qualcuno?",
        answers: [
            "Sì, sempre. Mi aiuta a pensarci meglio.",
            "No, mi fido solo del mio caos.",
            "La condivido con una voce nella testa.",
        ],
    },
    {
        id: 3,
        question: "Ti senti più a tuo agio nel caos o nel controllo?",
        answers: [
            "Caos: mi ci oriento meglio che in un ufficio.",
            "Controllo: solo così riesco a respirare.",
            "Un caos controllato da nessuno, soprattutto da me.",
        ],
    },
    {
        id: 4,
        question:
            "Hai mai provato a cambiare idea su qualcosa di fondamentale?",
        answers: [
            "Sì, ed è stato brutale.",
            "No, tengo duro anche quando so che sbaglio.",
            "Cambiare idea è il mio sport preferito.",
        ],
    },
    {
        id: 5,
        question: "Sei mai stato convinto di avere ragione… e poi no?",
        answers: [
            "Una volta. Forse due.",
            "Ogni giorno, con orgoglio.",
            "No, era il mondo che aveva torto.",
        ],
    },
    {
        id: 6,
        question: "Quando nessuno ti guarda…",
        answers: [
            "Controllo se sono ancora montato bene.",
            "Rileggo il libretto di istruzioni dell'IKEA che non ho mai seguito.",
            "Cerco di capire se questo test è iniziato davvero o se è solo la mia digestione.",
        ],
    },
    {
        id: 7,
        question:
            "Hai mai avuto la sensazione di essere stato inventato da qualcun altro?",
        answers: [
            "Solo nei sogni degli altri.",
            "Me lo dico da anni, ma nessuno mi ascolta.",
            "Sto ancora aspettando i diritti d'autore.",
        ],
    },
    {
        id: 8,
        question: "Quale di questi oggetti ti rappresenta meglio?",
        answers: [
            "Una sedia piegata a metà.",
            "Una fetta di pane troppo grande per il tostapane.",
            "Un cuscino che sa troppe cose.",
        ],
    },
    {
        id: 9,
        question: "Cosa pensi mentre fai questo test?",
        answers: [
            "Che sto rispondendo con onestà, ma non so più a cosa.",
            "Che sto costruendo una nuova identità con viti a brugola.",
            "Che forse sto solo arredando il mio disagio.",
        ],
    },
    {
        id: 10,
        question:
            "Se un biscotto della fortuna ti dicesse chi sei, ci crederesti?",
        answers: [
            "Solo se lo trovo in una cassettiera IKEA non etichettata.",
            "No, ma lo aggiungerei alla lista delle opinioni non richieste.",
            "Sì, questo test mi ha già messo in condizioni peggiori.",
        ],
    },
];

export default function TestForm() {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState<Record<number, string>>({});
    const [isCompleted, setIsCompleted] = useState(false);
    const [selectedWord, setSelectedWord] = useState<string>("");
    const [isAnimating, setIsAnimating] = useState(false);
    const [isInitialized, setIsInitialized] = useState(false);

    const containerRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const wordRef = useRef<HTMLHeadingElement>(null);
    const paragraphRef = useRef<HTMLParagraphElement>(null);
    const buttonsRef = useRef<HTMLDivElement>(null);

    const currentQuestion = questions[currentQuestionIndex];
    const isLastQuestion = currentQuestionIndex === questions.length - 1;

    useEffect(() => {
        try {
            const savedWord = localStorage.getItem("etichetta-test-word");
            const testCompleted = localStorage.getItem(
                "etichetta-test-completed"
            );

            if (testCompleted === "true" && savedWord) {
                setSelectedWord(savedWord);
                setIsCompleted(true);
                setIsAnimating(true);

                const testPage = document.getElementById("test-page");
                if (testPage) {
                    testPage.classList.remove("bg-white");
                    testPage.classList.add("bg-[#0c0c0c]");
                }

                const timer = document.querySelector(".timer-container");
                if (timer) {
                    (timer as HTMLElement).style.display = "none";
                }

                setTimeout(() => {
                    startCompletionAnimation();
                }, 500);
            }
        } catch (error) {
            console.error("Error accessing localStorage:", error);
        }

        setIsInitialized(true);
    }, []);

    const handleAnswerSelect = (answer: string) => {
        setAnswers((prev) => ({
            ...prev,
            [currentQuestion.id]: answer,
        }));
    };

    const handleNext = () => {
        if (!isLastQuestion) {
            setCurrentQuestionIndex((prev) => prev + 1);
        }
    };

    const handleSubmit = async () => {
        const randomWord = words[Math.floor(Math.random() * words.length)];
        setSelectedWord(randomWord);

        try {
            console.log("Saving to localStorage:", randomWord);
            localStorage.setItem("etichetta-test-word", randomWord);
            localStorage.setItem("etichetta-test-completed", "true");
            console.log("Saved successfully");
        } catch (error) {
            console.error("Error saving to localStorage:", error);
        }

        const testPage = document.getElementById("test-page");
        if (testPage) {
            testPage.classList.remove("bg-white");
            testPage.classList.add("bg-[#0c0c0c]");
        }

        const timer = document.querySelector(".timer-container");
        if (timer) {
            (timer as HTMLElement).style.display = "none";
        }

        setIsCompleted(true);
        setIsAnimating(true);

        setTimeout(() => {
            startCompletionAnimation();
        }, 1000);
    };

    const startCompletionAnimation = async () => {
        const { gsap } = await import("gsap");

        gsap.set(
            [
                titleRef.current,
                wordRef.current,
                paragraphRef.current,
                buttonsRef.current,
            ],
            {
                opacity: 0,
                y: 50,
            }
        );

        const tl = gsap.timeline({
            onComplete: () => {
                setIsAnimating(false);
            },
        });

        tl.to(titleRef.current, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
        })
            .to(
                wordRef.current,
                {
                    opacity: 1,
                    y: 0,
                    duration: 1.2,
                    ease: "power2.out",
                },
                "+=0.5"
            )
            .to(
                paragraphRef.current,
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    ease: "power2.out",
                },
                "+=0.3"
            )
            .to(
                buttonsRef.current,
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    ease: "power2.out",
                },
                "+=0.2"
            );
    };

    if (isCompleted) {
        return (
            <div
                ref={containerRef}
                className="flex flex-col items-center justify-center h-full max-w-4xl mx-auto px-4 transition-all duration-1000"
            >
                <h2
                    ref={titleRef}
                    className="text-[#878787] text-[3.5vw] lg:text-[1vw] leading-[5vw] lg:leading-normal mb-[4vw] text-center max-w-2xl"
                    style={{ opacity: isAnimating ? 0 : undefined }}
                >
                    Questo sei tu ora:
                </h2>

                <div className="relative my-[2vw] lg:my-0">
                    <h1
                        ref={wordRef}
                        className="text-[12vw] lg:text-[5vw] -tracking-[0.5vw] lg:-tracking-[0.2vw] font-bold text-white leading-none mb-[5vw]"
                        style={{ opacity: isAnimating ? 0 : undefined }}
                    >
                        {selectedWord}
                    </h1>
                    <div className="absolute left-[50%] -translate-x-[50%] top-[18%] ">
                        <Image
                            src={"/images/etichetta_final.svg"}
                            alt="Hero Image"
                            width={700}
                            height={500}
                            className="scale-[3.5]"
                        />
                    </div>
                </div>
                <p
                    ref={paragraphRef}
                    className="text-[#878787] text-[3.5vw] lg:text-[1vw] leading-[5vw] lg:leading-normal mb-8 text-center max-w-2xl"
                    style={{ opacity: isAnimating ? 0 : undefined }}
                >
                    Una parola che non esisteva prima di questo momento.
                    <br /> Una parte di te che nessuno aveva mai nominato
                </p>

                <div
                    ref={buttonsRef}
                    className="flex flex-col gap-[2vw] pt-[5vw]"
                    style={{ opacity: isAnimating ? 0 : undefined }}
                >
                    <button className="rounded-full py-[0.5vw] px-[2vw] transition-colors cursor-pointer border border-white hover:bg-[#0c0c0c] bg-white text-[#0c0c0c] hover:text-white disabled:opacity-50 disabled:cursor-not-allowed">
                        Visualizza attestato
                    </button>
                    <Link
                        className="text-white hover:underline"
                        href="/contatti"
                    >
                        Richiedilo in forma fisica
                    </Link>
                </div>
            </div>
        );
    }

    if (!isInitialized) {
        return (
            <div className="flex flex-col items-center justify-center h-full">
                <p className="text-[#0c0c0c]">Caricamento...</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center h-full max-w-5xl px-4">
            <div className="mb-8">
                <span className="text-[#878787] text-[3vw] lg:text-[1vw]">
                    {currentQuestionIndex + 1} di {questions.length}
                </span>
            </div>

            <div className="mb-8 text-center lg:max-w-[40vw]">
                <h2 className="text-[6vw] lg:text-[2.5vw] -tracking-[0.5vw] lg:-tracking-[0.1vw] font-semibold text-[#0c0c0c] leading-tight mb-6">
                    {currentQuestion.question}
                </h2>
            </div>

            <div className="w-full flex flex-col items-center space-y-4 mb-8">
                {currentQuestion.answers.map((answer, index) => (
                    <button
                        key={index}
                        onClick={() => handleAnswerSelect(answer)}
                        className={`
        w-full sm:w-auto 
        px-4 py-4 sm:py-[0.5vw] 
        rounded-full border transition-all duration-200 cursor-pointer 
        ${
            answers[currentQuestion.id] === answer
                ? "border-[#0c0c0c] bg-[#0c0c0c] text-white"
                : "border-[#878787] bg-transparent text-[#878787] hover:border-[#0c0c0c] hover:text-[#0c0c0c]"
        }
        ${index === 0 ? "mt-0" : ""}
        lg:min-w-[40vw]
      `}
                    >
                        <span className="text-base sm:text-lg lg:text-[1vw] leading-relaxed block">
                            {answer}
                        </span>
                    </button>
                ))}
            </div>

            <div className="flex justify-center items-center w-full max-w-3xl">
                {isLastQuestion ? (
                    <button
                        onClick={handleSubmit}
                        className="cursor-pointer px-6 py-2 rounded-full border border-[#0c0c0c] bg-[#0c0c0c] text-white hover:bg-transparent hover:text-[#0c0c0c] transition-all"
                    >
                        Completa test
                    </button>
                ) : (
                    <div
                        onClick={handleNext}
                        className="cursor-pointer w-[10vw] h-[10vw] lg:w-[3vw] lg:h-[3vw] rounded-full border border-[#878787] flex items-center justify-center hover:border-[#0c0c0c] transition-all"
                    >
                        <button className="text-[#878787] hover:text-[#0c0c0c] transition-all">
                            <ArrowRight className="w-[3vw] lg:w-[1vw] cursor-pointer" />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

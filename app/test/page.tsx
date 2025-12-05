import PersistentTimer from "@/components/Timer";
import TestForm from "@/components/TestForm";
import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Test",
    description:
        "Fai il Test dell'Impossibilità di Essere Definiti. Rispondi alle domande e scopri la tua parola unica, che non esisteva prima di questo momento.",
    openGraph: {
        title: "Test | Etichetta",
        description:
            "Fai il Test dell'Impossibilità di Essere Definiti. Rispondi alle domande e scopri la tua parola unica.",
    },
};

export default function TestPage() {
    return (
        <div className="h-screen w-screen bg-white grid grid-cols-3 grid-rows-3 lg:px-[2vw] px-[5vw] transition-colors duration-1000" id="test-page">
            
            <div className="col-span-3 row-start-2 flex justify-center items-center">
                <TestForm />
            </div>

            <div className="pointer-events-none lg:col-start-2 col-start-3 row-start-3 flex justify-center items-end pb-[4vw]">
                <p className="lg:text-[1vw] text-[3vw] text-[#0c0c0c]">Anche una <span className="underline">non</span> risposta è, di per sé, una risposta.</p>
            </div>

            <div className="col-start-1 row-start-3 flex justify-start items-end p-[2vw]">
                <PersistentTimer />
            </div>

        </div>
    );
}
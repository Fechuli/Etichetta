import FormContatti from "@/components/FormContatti";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Contatti() {
    return (
        <div className="grid lg:grid-cols-2 bg-[#0c0c0c] h-screen lg:pt-0 pt-[20vw] ">
            <div className="flex items-center justify-center lg:px-0 px-[6vw] bg-[#0c0c0c]">
                <div className="flex flex-col items-center justify-center lg:gap-0 gap-[8vw] ">
                    <p className="text-[#878787]">
                        Il tuo tratto verrà stampato in 3D, in plastica PLA
                        nera, lungo circa 10 cm.
                        <br /> È un portachiavi, ma soprattutto un’etichetta
                        chenon somiglia a nessun’altra.
                    </p>
                    <FormContatti />
                    <p className="text-[#878787]">
                        Una volta ricevuto il form ti ricontatteremo per farti
                        sapere quando passare!
                        <br /> Nel frattempo fatti un giro tra i nostri
                        progetti.
                    </p>
                    <div className="flex lg:justify-start justify-between lg:items-center gap-[5vw] lg:gap-[3vw] lg:px-[1vw] pt-[2vw]">
                        <Link
                            href="https://backdoor-studio.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group duration-300 hover:bg-white text-white hover:text-[#0c0c0c] rounded-full border border-white inline-flex items-center justify-center px-[6vw] lg:px-[3vw] py-[2vw] lg:py-[0.5vw] gap-[2vw] lg:gap-[1vw] cursor-pointer w-fit"
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
                            className="text-[3.5vw] lg:translate-y-0 translate-y-[1.5vw] lg:text-[1vw] text-[#878787] hover:text-white transition-colors duration-300 underline"
                        >
                            Instagram
                        </Link>
                    </div>
                </div>
            </div>
            <div className="flex items-center justify-center lg:py-0 py-[20vw] bg-[#0c0c0c]">
                <Image
                    src={"/images/contatti_etichetta.svg"}
                    alt="Contatti Etichetta"
                    width={500}
                    height={1800}
                    className="lg:w-[70%] w-full"
                />
            </div>
        </div>
    );
}

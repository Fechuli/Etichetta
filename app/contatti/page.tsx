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
                    <div className="flex flex-col sm:flex-row items-center lg:gap-[2vw] gap-[5vw] w-full">
                        <Link
                            href="https://www.backdoor-studio.com"
                            target="_blank"
                            className="text-center w-full sm:w-auto lg:w-[15vw] border-white mt-[5vw] px-6 py-3 border transition-colors bg-white hover:bg-[#0c0c0c] text-[#0c0c0c] hover:text-white rounded-full"
                        >
                            Il nostro sito
                        </Link>
                        <Link
                            href="https://www.instagram.com/backdoorstudiodesign/"
                            target="_blank"
                            className="text-center w-full sm:w-auto lg:w-[15vw] border-white mt-[5vw] px-6 py-3 border transition-colors bg-white hover:bg-[#0c0c0c] text-[#0c0c0c] hover:text-white rounded-full"
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

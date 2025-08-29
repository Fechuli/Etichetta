"use client";
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp } from "lucide-react";
import React from "react";

export default function ButtonHero({
    text,
    arrowDirection,
    function: onClick,
    className = "absolute"
}: {
    text: string;
    arrowDirection: "up" | "down" | "left" | "right";
    function?: () => void;
    className?: string;
}) {
    return (
        <div className={`left-1/2 -translate-x-1/2 z-10 ${className}`}>
            <button
                onClick={() => {
                    if (onClick) {
                        onClick();
                    }
                }}
                className="group duration-300 hover:bg-[#0c0c0c] hover:text-white rounded-full border border-[#0c0c0c] flex items-center justify-center px-[6vw] lg:px-[3vw] py-[2vw] lg:py-[0.5vw] gap-[2vw] lg:gap-[1vw] cursor-pointer"
            >
                <p className="text-[3.5vw] lg:text-[1vw]">{text}</p>
                {arrowDirection === "down" && (
                    <ArrowDown className="w-[4vw] h-[4vw] lg:w-[1.2vw] lg:h-[1.2vw] transition-transform duration-300 group-hover:translate-y-1" />
                )}
                {arrowDirection === "up" && (
                    <ArrowUp className="w-[4vw] h-[4vw] lg:w-[1.2vw] lg:h-[1.2vw] transition-transform duration-300 group-hover:-translate-y-1" />
                )}
                {arrowDirection === "left" && (
                    <ArrowLeft className="w-[4vw] h-[4vw] lg:w-[1.2vw] lg:h-[1.2vw] transition-transform duration-300 group-hover:-translate-x-1" />
                )}
                {arrowDirection === "right" && (
                    <ArrowRight className="w-[4vw] h-[4vw] lg:w-[1.2vw] lg:h-[1.2vw] transition-transform duration-300 group-hover:translate-x-1" />
                )}
            </button>
        </div>
    );
}
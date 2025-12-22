"use client";

import React from "react";

interface WordFrameProps {
    children: React.ReactNode;
    className?: string;
}

export default function WordFrame({ children, className = "" }: WordFrameProps) {
    return (
        <div
            className={`relative inline-flex items-center justify-center px-[4vw] lg:px-[3vw] py-[3vw] lg:py-[2vw] border-2 border-white rounded-xl ${className}`}
        >
            {/* Triangolo in alto a sinistra - forma originale */}
            <svg
                className="absolute top-[6px] left-[6px] w-[25px] h-[25px] lg:w-[35px] lg:h-[35px]"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M4 0H28.333C31.8498 0 33.6549 4.2122 31.2295 6.7588L19.292 19.292L6.7588 31.2295C4.2122 33.6549 0 31.8498 0 28.333V4C0 1.79086 1.79086 0 4 0Z"
                    fill="white"
                />
            </svg>
            <div className="relative z-10">
                {children}
            </div>
        </div>
    );
}

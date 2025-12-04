"use client";

import { Instagram } from "lucide-react";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import Logo from "./Logo";

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        const checkBackground = () => {
            const logoElement = document.querySelector("[data-logo]");
            if (!logoElement) return;

            const rect = logoElement.getBoundingClientRect();
            const x = rect.left + rect.width / 2;
            const y = rect.top + rect.height / 2;

            const elementsAtPoint = document.elementsFromPoint(x, y);

            for (const el of elementsAtPoint) {
                if (el === logoElement || el.contains(logoElement)) continue;

                const bg = window.getComputedStyle(el).backgroundColor;
                if (bg && bg !== "rgba(0, 0, 0, 0)" && bg !== "transparent") {
                    const rgb = bg.match(/\d+/g);
                    if (rgb) {
                        const brightness = (parseInt(rgb[0]) + parseInt(rgb[1]) + parseInt(rgb[2])) / 3;
                        setIsDark(brightness < 128);
                    }
                    break;
                }
            }
        };

        checkBackground();
        const interval = setInterval(checkBackground, 100);

        return () => clearInterval(interval);
    }, []);

    return (
        <>
            <div className="flex justify-between items-center inter py-[3vw] px-[5vw] lg:py-[1vw] lg:px-[2vw] fixed w-full z-50">
                <Link
                    href="/chi-siamo"
                    className="hidden lg:block text-[1vw] text-[#878787] hover:underline"
                >
                    Chi siamo
                </Link>

                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="lg:hidden relative w-[8vw] h-[8vw] flex flex-col justify-center items-center gap-[1.5vw]"
                    aria-label="Menu"
                >
                    <span
                        className={`block w-[6vw] h-[0.5vw] bg-[#878787] transition-all duration-300 ${
                            isMenuOpen ? "rotate-45 translate-y-[2vw]" : ""
                        }`}
                    />
                    <span
                        className={`block w-[6vw] h-[0.5vw] bg-[#878787] transition-all duration-300 ${
                            isMenuOpen ? "opacity-0" : ""
                        }`}
                    />
                    <span
                        className={`block w-[6vw] h-[0.5vw] bg-[#878787] transition-all duration-300 ${
                            isMenuOpen ? "-rotate-45 -translate-y-[2vw]" : ""
                        }`}
                    />
                </button>

                <Link href="/" data-logo>
                    <Logo className={`w-[20vw] h-auto lg:w-[100px] transition-colors duration-500 ${isDark ? "text-white" : "text-black"}`} />
                </Link>

                <Link
                    href="/manifesto"
                    className="hidden lg:block text-[1vw] text-[#878787] hover:underline"
                >
                    Manifesto
                </Link>

                <div className="lg:hidden w-[8vw]" />
            </div>

            <div
                className={`lg:hidden fixed inset-0 bg-white z-40 transition-transform duration-500 ${
                    isMenuOpen ? "translate-x-0" : "-translate-x-full"
                }`}
            >
                <div className="flex flex-col items-center justify-center h-full gap-[10vw]">
                    <Link
                        href="/chi-siamo"
                        onClick={() => setIsMenuOpen(false)}
                        className="text-[8vw] text-[#878787] -tracking-[0.2vw]"
                    >
                        Chi siamo
                    </Link>
                    <Link
                        href="/manifesto"
                        onClick={() => setIsMenuOpen(false)}
                        className="text-[8vw] text-[#878787] -tracking-[0.2vw]"
                    >
                        Manifesto
                    </Link>
                    <Link
                        href="/"
                        onClick={() => setIsMenuOpen(false)}
                        className="text-[8vw] text-[#878787] -tracking-[0.2vw]"
                    >
                        Home
                    </Link>
                    <Link href={"https://www.instagram.com/backdoor.studio/"} className="pt-[2vw]">
                        <Instagram className="text-[#878787] size-[8vw]"/>
                    </Link>
                </div>
            </div>
        </>
    );
}

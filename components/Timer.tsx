"use client";

import React, { useState, useEffect } from 'react';

const STORAGE_KEY = 'persistentStartTime';

const PersistentTimer = () => {
    const [elapsedTime, setElapsedTime] = useState<number>(0);

    useEffect(() => {
        let startTime = localStorage.getItem(STORAGE_KEY);

        if (!startTime) {
            startTime = Date.now().toString();
            localStorage.setItem(STORAGE_KEY, startTime);
        }

        const calculateElapsedTime = () => {
            const now = Date.now();
            const secondsPassed = Math.floor((now - parseInt(startTime!, 10)) / 1000);
            setElapsedTime(secondsPassed);
        };

        calculateElapsedTime();

        const intervalId = setInterval(calculateElapsedTime, 1000);

        return () => clearInterval(intervalId);
    }, []); 

    const formatTime = (totalSeconds: number): string => {
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    return (
        <div className='timer-container flex items-center justify-center flex-col'>
            <p className='lg:text-[3vw] text-[7vw] font-semibold text-[#878787] -tracking-[0.1vw]'>{formatTime(elapsedTime)}</p>
            <p className='lg:text-[0.7vw] text-[2vw] text-[#878787] whitespace-nowrap'>La tempistica è un fattore chiave</p>
        </div>
    );
};

export default PersistentTimer;
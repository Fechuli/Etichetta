"use client";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function FormContatti() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        date: null as Date | null,
    });

    const [status, setStatus] = useState<
        "idle" | "loading" | "success" | "error"
    >("idle");

    const inputClasses =
        "border border-[#878787] rounded-full placeholder:text-[#878787] py-[0.5vw] w-full bg-[#0c0c0c] text-white px-[2vw]";

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("loading");

        try {
            const res = await fetch("/api/send", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...formData,
                    date: formData.date
                        ? formData.date.toISOString().split("T")[0]
                        : "",
                }),
            });

            if (res.ok) {
                setStatus("success");
                setFormData({ name: "", email: "", date: null });
            } else {
                setStatus("error");
            }
        } catch (error) {
            console.error(error);
            setStatus("error");
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="flex flex-col items-center pb-[5vw] pt-[2vw] w-full "
        >
            <div className="gap-[2vw] flex flex-col w-full">
                <input
                    type="text"
                    name="name"
                    placeholder="Come ti chiami"
                    value={formData.name}
                    onChange={handleChange}
                    className={inputClasses}
                    required
                />
                <input
                    type="email"
                    name="email"
                    placeholder="La tua mail"
                    value={formData.email}
                    onChange={handleChange}
                    className={`${inputClasses}`}
                    required
                />

                <DatePicker
                    selected={formData.date}
                    onChange={(date) => setFormData({ ...formData, date })}
                    dateFormat="dd/MM/yyyy"
                    placeholderText="Quando vorresti passare?"
                    className={`${inputClasses}`}
                />
            </div>

            <button
                type="submit"
                disabled={status === "loading"}
                className="cursor-pointer text-center w-full sm:w-auto lg:w-[15vw] border-white mt-[5vw] px-6 py-3 border transition-colors bg-white hover:bg-[#0c0c0c] text-[#0c0c0c] hover:text-white rounded-full"
            >
                {status === "loading" ? "Invio..." : "Invia Form"}
            </button>

            {status === "success" && (
                <p className="text-green-400 mt-4">
                    Messaggio inviato con successo
                </p>
            )}
            {status === "error" && (
                <p className="text-red-400 mt-4">Errore durante l’invio</p>
            )}
        </form>
    );
}

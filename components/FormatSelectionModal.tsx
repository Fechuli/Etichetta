"use client";

import React from "react";
import { X } from "lucide-react";

export type ExportFormat = "a4" | "instagram-story" | "instagram-post" | "post-square";

interface FormatSelectionModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSelectFormat: (format: ExportFormat) => void;
    word: string;
}

const formats = [
    {
        id: "a4" as ExportFormat,
        name: "A4",
        description: "Formato standard per stampa",
        dimensions: "210 × 297 mm",
    },
    {
        id: "instagram-story" as ExportFormat,
        name: "Instagram Story",
        description: "Per le tue storie Instagram",
        dimensions: "1080 × 1920 px",
    },
    {
        id: "instagram-post" as ExportFormat,
        name: "Instagram Post",
        description: "Post quadrato Instagram",
        dimensions: "1080 × 1080 px",
    },
    {
        id: "post-square" as ExportFormat,
        name: "Post Generale",
        description: "Formato quadrato universale",
        dimensions: "1200 × 1200 px",
    },
];

export default function FormatSelectionModal({
    isOpen,
    onClose,
    onSelectFormat,
    word
}: FormatSelectionModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg max-w-md w-full max-h-[80vh] overflow-y-auto">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                    <div>
                        <h2 className="text-xl font-semibold text-[#0c0c0c] inter">
                            Scegli il formato
                        </h2>
                        <p className="text-sm text-[#878787] mt-1">
                            Per la tua etichetta: <span className="font-medium">{word}</span>
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-[#878787] hover:text-[#0c0c0c] transition-colors"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Format Options */}
                <div className="p-6 space-y-3">
                    {formats.map((format) => (
                        <button
                            key={format.id}
                            onClick={() => {
                                onSelectFormat(format.id);
                                onClose();
                            }}
                            className="w-full text-left p-4 rounded-lg border border-[#878787] hover:border-[#0c0c0c] hover:bg-gray-50 transition-all inter group"
                        >
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="font-medium text-[#0c0c0c] group-hover:text-[#0c0c0c]">
                                        {format.name}
                                    </h3>
                                    <p className="text-sm text-[#878787] mt-1">
                                        {format.description}
                                    </p>
                                </div>
                                <div className="text-xs text-[#878787] font-mono">
                                    {format.dimensions}
                                </div>
                            </div>
                        </button>
                    ))}
                </div>

                {/* Footer */}
                <div className="px-6 pb-6">
                    <p className="text-xs text-[#878787] text-center inter">
                        Il tuo attestato verrà generato nel formato selezionato
                    </p>
                </div>
            </div>
        </div>
    );
}
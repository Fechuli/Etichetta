import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Chi Siamo",
    description:
        "Backdoor Studio. Facciamo branding, web design e molte altre cose. Ogni tanto ci prendiamo del tempo per disturbare il mercato.",
    openGraph: {
        title: "Chi Siamo | Etichetta",
        description:
            "Backdoor Studio. Facciamo branding, web design e molte altre cose. Ogni tanto ci prendiamo del tempo per disturbare il mercato.",
    },
};

export default function ChiSiamoLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}

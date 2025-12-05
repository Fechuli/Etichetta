import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Manifesto",
    description:
        "Le parole ci precedono. Questo progetto è un esperimento di libertà temporanea. Ti offriamo una parola inventata, senza storia, senza giudizi, senza aspettative.",
    openGraph: {
        title: "Manifesto | Etichetta",
        description:
            "Le parole ci precedono. Questo progetto è un esperimento di libertà temporanea. Ti offriamo una parola inventata.",
    },
};

export default function ManifestoLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}

interface Question {
    id: number;
    question: string;
    answers: string[];
}

export const questions: Question[] = [
    {
        id: 1,
        question:
            "Quando devi iniziare qualcosa di importante, come ti prepari?",
        answers: [
            "Pianifico tutto con precisione chirurgica.",
            "Metto una playlist e ci butto dentro l’ansia.",
            "Inizio. Poi capisco se era importante.",
        ],
    },
    {
        id: 2,
        question: "Ti capita spesso di cambiare idea all’ultimo?",
        answers: [
            "No, mai.",
            "Sempre, e con un certo stile.",
            "Sì, ma solo su decisioni tipo: “Esisto davvero?”",
        ],
    },
    {
        id: 3,
        question: "Come reagisci quando non capisci qualcosa?",
        answers: [
            "Lo dico subito, voglio capire.",
            "Fingo di sapere tutto, poi googlo.",
            "Lo ignoro finché smette di esistere.",
        ],
    },
    {
        id: 4,
        question: "Hai mai sentito di non essere dove dovresti?",
        answers: [
            "Sì, almeno una volta a settimana.",
            "Solo nei sogni (o nelle call).",
            "Sempre. Infatti ora sto traslocando dentro me stesso.",
        ],
    },
    {
        id: 5,
        question: "Quando pensi al futuro, ti viene in mente…",
        answers: [
            "Un file Excel ordinato.",
            "Un campo aperto con mille possibilità.",
            "Un criceto in tuta da astronauta.",
        ],
    },
    {
        id: 6,
        question: "Hai mai dato un nome a un oggetto in casa tua?",
        answers: [
            "Sì, e lo chiamo quando mi sento solo.",
            "Solo a quello che vibra.",
            "No, ma lui ha dato un nome a me.",
        ],
    },
    {
        id: 7,
        question: "Ti è mai sembrato che una stampante ti stesse giudicando?",
        answers: [
            "Sì, quando non le ho cambiato il toner.",
            "No, sono io che giudico lei.",
            "Solo quando finge di essere offline.",
        ],
    },
    {
        id: 8,
        question: "Qual è la tua teoria più strana sull’universo?",
        answers: [
            "Siamo tutti sogni riciclati di qualcun altro.",
            "Le scale mobili decidono se salire o scendere.",
            "Ogni volta che sbadiglio, si resetta un piccione.",
        ],
    },
    {
        id: 9,
        question: "Hai 5 minuti per uscire da casa. Cosa prendi?",
        answers: [
            "Cellulare, chiavi, dignità.",
            "Una banana e il certificato di nascita.",
            "La scrivania. Tanto poi mi serve.",
        ],
    },
    {
        id: 10,
        question:
            "Un giorno, una giraffa ti consegna un biglietto con scritto il tuo vero nome. Cosa fai?",
        answers: [
            "Lo leggo e lo accetto.",
            "Lo mangio, non si sa mai.",
            "Lo brucio. Ma lo sento lo stesso, dentro.",
        ],
    },
];

import ChangeWordSection from "@/components/ChangeWordSection";
import Hero from "@/components/Hero";
import LastSection from "@/components/LastSection";
import ParallaxSection from "@/components/ParallaxSection";
import Percorso from "@/components/Percorso";
import SecondSection from "@/components/SecondSection";

export default function Home() {
    return (
        <div className="overflow-hidden">
            <Hero />
            <div className="h-[5vw]" />
            <SecondSection />
            <div className="h-[25vw]" />
            <div className="sm:inline hidden">
                <Percorso />
            </div>
            <ParallaxSection />
            <ChangeWordSection />
            <LastSection />
        </div>
    );
}

import HeroSection from "@/components/HeroSection";
import TutorSection from "@/components/TutorSection";

export default function Home() {
  return (
    <main className="container mx-auto py-12">
      <div className="max-w-4xl mx-auto p-2">
        <HeroSection />
        <div className="mt-4">
          <TutorSection />
        </div>
      </div>
    </main>
  );
}

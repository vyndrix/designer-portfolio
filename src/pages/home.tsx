import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { SkillsSection } from "@/components/skills-section";

export function Home() {
  return (
    <main className="flex flex-col">
      <Header />
      <SkillsSection />
      <Footer />
    </main>
  );
}

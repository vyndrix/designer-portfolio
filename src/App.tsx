import { Footer } from "./components/footer";
import { Header } from "./components/header";
import { SkillsSection } from "./components/skills-section";

function App() {
  return (
    <main className="flex flex-col">
      <Header />
      <SkillsSection />
      <Footer />
    </main>
  );
}

export default App;

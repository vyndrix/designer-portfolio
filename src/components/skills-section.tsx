import { ALargeSmall, Antenna, Anvil, Axe } from "lucide-react";
import { Skill } from "./skill";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

export function SkillsSection() {
  return (
    <section className="flex justify-center p-8">
      <Tabs className="flex basis-3xl gap-8">
        <TabsList className="self-center">
          <TabsTrigger value="fintech" className="gap-1.5 py-1.5 px-2.5">
            <ALargeSmall />
            Fintech
          </TabsTrigger>
          <TabsTrigger value="travel" className="gap-1.5 py-1.5 px-2.5">
            <Antenna />
            Travel & Experience
          </TabsTrigger>
          <TabsTrigger value="accessibility" className="gap-1.5 py-1.5 px-2.5">
            <Anvil />
            Accessibility
          </TabsTrigger>
          <TabsTrigger value="design-system" className="gap-1.5 py-1.5 px-2.5">
            <Axe />
            Design System
          </TabsTrigger>
        </TabsList>
        <span className="text-primary/45 text-center">
          O que temos que ter sempre em mente é que a valorização de fatores
          subjetivos estimula a padronização do levantamento das variáveis
          envolvidas.
        </span>
        <TabsContent value="fintech">
          <div className="grid grid-cols-2 gap-6">
            <Skill />
            <Skill />
            <Skill />
            <Skill />
          </div>
        </TabsContent>
        <TabsContent value="travel">
          <div className="grid grid-cols-2 gap-6">
            <Skill />
            <Skill />
            <Skill />
            <Skill />
          </div>
        </TabsContent>
        <TabsContent value="accessibility">
          <div className="grid grid-cols-2 gap-6">
            <Skill />
            <Skill />
            <Skill />
            <Skill />
          </div>
        </TabsContent>
        <TabsContent value="design-system">
          <div className="grid grid-cols-2 gap-6">
            <Skill />
            <Skill />
            <Skill />
            <Skill />
          </div>
        </TabsContent>
      </Tabs>
    </section>
  );
}

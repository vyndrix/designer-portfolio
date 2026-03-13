import { useProjectsQuery } from "@/remote/queries/projects";
import { useSkillsQuery } from "@/remote/queries/skills";
import { Anvil, Axe, BicepsFlexed, Briefcase } from "lucide-react";
import { useState } from "react";
import { Skill } from "./skill";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./ui/pagination";
import { Spinner } from "./ui/spinner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

export function SkillsSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="flex justify-center p-8">
      <Tabs className="flex flex-col basis-3xl gap-8">
        <TabsList variant="default" className="self-center">
          <TabsTrigger value="skills" className="gap-1.5 py-1.5 px-2.5">
            <BicepsFlexed />
            Skills
          </TabsTrigger>
          <TabsTrigger value="projects" className="gap-1.5 py-1.5 px-2.5">
            <Briefcase />
            Projects
          </TabsTrigger>
          <TabsTrigger value="accessibility" className="gap-1.5 py-1.5 px-2.5">
            <Anvil />
            Accessibility
          </TabsTrigger>
          <TabsTrigger value="design-system" className="gap-1.5 py-1.5 px-2.5">
            <Axe />
            Design System
          </TabsTrigger>
          {/* <TabsTrigger value="fintech" className="gap-1.5 py-1.5 px-2.5">
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
          </TabsTrigger> */}
        </TabsList>
        <span className="text-center">
          O que temos que ter sempre em mente é que a valorização de fatores
          subjetivos estimula a padronização do levantamento das variáveis
          envolvidas.
        </span>
        <TabsContent value="skills">
          <Skills />
        </TabsContent>
        <TabsContent value="projects">
          <Projects />
        </TabsContent>
        {/* <TabsContent value="fintech">
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
        </TabsContent> */}
        <TabsContent value="accessibility">
          <div className="grid grid-cols-2 gap-6">
            <Skill
              name="Generic Name"
              description="Don't mind me, I am your generic description that going to be changed later"
            />
            <Skill
              name="Generic Name"
              description="Don't mind me, I am your generic description that going to be changed later"
            />
            <Skill
              name="Generic Name"
              description="Don't mind me, I am your generic description that going to be changed later"
            />
            <Skill
              name="Generic Name"
              description="Don't mind me, I am your generic description that going to be changed later"
            />
          </div>
        </TabsContent>
        <TabsContent value="design-system">
          <div className="grid grid-cols-2 gap-6">
            <Skill
              name="Generic Name"
              description="Don't mind me, I am your generic description that going to be changed later"
            />
            <Skill
              name="Generic Name"
              description="Don't mind me, I am your generic description that going to be changed later"
            />
            <Skill
              name="Generic Name"
              description="Don't mind me, I am your generic description that going to be changed later"
            />
            <Skill
              name="Generic Name"
              description="Don't mind me, I am your generic description that going to be changed later"
            />
          </div>
        </TabsContent>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() =>
                  setActiveIndex((current) => Math.max(current - 1, 0))
                }
              />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink isActive={activeIndex === 0}>1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink isActive={activeIndex === 1}>2</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink isActive={activeIndex === 2}>3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext
                onClick={() =>
                  setActiveIndex((current) => Math.min(current + 1, 2))
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </Tabs>
    </section>
  );
}

const Skills = () => {
  const { data: skills, isFetching, isFetched, error } = useSkillsQuery();

  return (
    <div className="grid grid-cols-2 gap-6">
      {isFetching ? (
        <span className="col-span-2 flex flex-col items-center justify-center p-8 gap-2">
          <Spinner className="size-8" />
          Loading
        </span>
      ) : isFetched && !!skills?.length ? (
        skills?.map((skill) => (
          <Skill
            key={skill.id}
            name={skill.name}
            description={skill.description}
          />
        ))
      ) : (
        <span className="col-span-2 flex flex-col items-center justify-center p-8 gap-2">
          No skills found.
        </span>
      )}
    </div>
  );
};

const Projects = () => {
  const { data: projects, isFetching, isFetched } = useProjectsQuery();

  return (
    <div className="grid grid-cols-2 gap-6">
      {isFetching ? (
        <span className="col-span-2 flex flex-col items-center justify-center p-8 gap-2">
          <Spinner className="size-8" />
          Loading
        </span>
      ) : isFetched && !!projects?.length ? (
        projects?.map((project) => (
          <Skill
            key={project.id}
            name={project.name}
            description={project.description}
          />
        ))
      ) : (
        <span className="col-span-2 flex flex-col items-center justify-center p-8 gap-2">
          No Projects found.
        </span>
      )}
    </div>
  );
};

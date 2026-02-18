import { EntityTable } from "@/components/entity-table";
import { Table } from "@/components/ui";
import { Button } from "@/components/ui/button";
import { useSkillsQuery, type Skill } from "@/remote/queries/skills";
import type { ColumnDef } from "@tanstack/react-table";
import { Plus, RefreshCcw } from "lucide-react";
import {
  EntityFormModalProvider,
  useEntityFormModal,
} from "../entity-form-modal-context";
import { SkillFormModal } from "./skill-form.modal";

const columns: ColumnDef<Skill>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => <Table.Label>{row.original.name}</Table.Label>,
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => <Table.Label>{row.original.description}</Table.Label>,
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => <Table.Label>{row.original.created_at}</Table.Label>,
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const { open } = useEntityFormModal();

      return (
        <Table.Menu
          items={[
            {
              label: "Edit",
              onClick: () => open(`${row.original.id}`),
            },
            {
              label: "Delete",
              variant: "destructive",
              onClick: () => {
                //TODO-IMPLEMENT: Implement delete functionality
              },
            },
          ]}
        />
      );
    },
  },
];

export function DashboardSkills() {
  const { open } = useEntityFormModal();
  const { data: skills, refetch } = useSkillsQuery();

  return (
    <section className="flex flex-1 flex-col gap-6">
      <EntityFormModalProvider>
        <header className="flex">
          <h2 className="flex flex-1 text-2xl font-medium">Skills</h2>
          <Button
            variant="outline"
            size="icon-sm"
            className="mr-2"
            onClick={() => open(null)}
          >
            <Plus className="cursor-pointer text-muted-foreground" />
          </Button>
          <Button variant="outline" size="icon-sm" onClick={() => refetch()}>
            <RefreshCcw className="cursor-pointer text-muted-foreground" />
          </Button>
        </header>
        <EntityTable data={skills || []} columns={columns} />
        <SkillFormModal />
      </EntityFormModalProvider>
    </section>
  );
}

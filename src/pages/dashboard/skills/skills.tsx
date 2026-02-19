import { Table } from "@/components/ui";
import { useSkillsQuery, type Skill } from "@/remote/queries/skills";
import type { ColumnDef } from "@tanstack/react-table";
import { useEntityFormModal } from "../entity-form-modal-context";
import { Section } from "../section";
import { SkillFormModal } from "./skill-form-modal";

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
    <Section
      title="Skills"
      columns={columns}
      data={skills}
      modal={<SkillFormModal />}
      onEdit={() => open(null)}
      onRefresh={() => refetch()}
    />
  );
}

import { Table } from "@/components/ui";
import { useProjectsQuery, type Project } from "@/remote/queries/projects";
import type { ColumnDef } from "@tanstack/react-table";
import { useEntityFormModal } from "../entity-form-modal-context";
import { Section } from "../section";
import { ProjectFormModal } from "./project-form-modal";

const columns: ColumnDef<Project>[] = [
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

export function DashboardProjects() {
  const { open } = useEntityFormModal();
  const { data: projects, refetch } = useProjectsQuery();

  return (
    <Section
      title="Projects"
      columns={columns}
      data={projects}
      modal={<ProjectFormModal />}
      onEdit={() => open(null)}
      onRefresh={() => refetch()}
    />
  );
}

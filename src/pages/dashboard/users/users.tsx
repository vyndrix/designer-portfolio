import { EntityTable } from "@/components/entity-table";
import { Table } from "@/components/ui";
import { Button } from "@/components/ui/button";
import { useUsersQuery, type User } from "@/remote/queries/users";
import { type ColumnDef } from "@tanstack/react-table";
import { Plus, RefreshCcw } from "lucide-react";
import { useEntityFormModal } from "../entity-form-modal-context";
import { UserFormModal } from "./user-form-modal";

const columns: ColumnDef<User>[] = [
  {
    accessorKey: "First Name",
    header: "First Name",
    cell: ({ row }) => <Table.Label>{row.original.first_name}</Table.Label>,
  },
  {
    accessorKey: "Last Name",
    header: "Last Name",
    cell: ({ row }) => <Table.Label>{row.original.last_name}</Table.Label>,
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => <Table.Label>{row.original.email}</Table.Label>,
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
              onClick: () => {
                open(row.original.id);
              },
            },
            {
              label: "Reset Password",
              onClick: () => {
                //TODO-IMPLEMENT: Implement reset password functionality
              },
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

export function DashboardUsers() {
  const { open } = useEntityFormModal();
  const { data: users, refetch } = useUsersQuery();

  return (
    <section className="flex flex-1 flex-col gap-6">
      <header className="flex">
        <h2 className="flex flex-1 text-2xl font-medium">Users</h2>
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
      <EntityTable data={users || []} columns={columns} />
      <UserFormModal />
    </section>
  );
}

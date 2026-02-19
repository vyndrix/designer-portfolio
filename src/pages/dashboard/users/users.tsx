import { Table } from "@/components/ui";
import { useUsersQuery, type User } from "@/remote/queries/users";
import { type ColumnDef } from "@tanstack/react-table";
import { useEntityFormModal } from "../entity-form-modal-context";
import { Section } from "../section";
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
    <Section
      title="Users"
      columns={columns}
      data={users}
      modal={<UserFormModal />}
      onEdit={() => open(null)}
      onRefresh={() => refetch()}
    />
  );
}

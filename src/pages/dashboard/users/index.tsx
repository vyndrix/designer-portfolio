import { Table } from "@/components/ui";
import {
  useDeleteUser,
  useResetPassword,
  useUsersQuery,
  type User,
} from "@/remote/queries/users";
import { type ColumnDef } from "@tanstack/react-table";
import { useEntityFormModal } from "../entity-form-modal-context";
import { Section } from "../section";
import UserFormModal from "./form-modal";

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
      const { mutate: deleteUser } = useDeleteUser();
      const { mutate: resetPassword } = useResetPassword();

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
                if (
                  confirm(
                    `Are you sure you want to send a password reset email to ${row.original.email}?`
                  )
                ) {
                  resetPassword(row.original.email);
                }
              },
            },
            {
              label: "Delete",
              variant: "destructive",
              onClick: () => {
                if (confirm("Are you sure you want to delete this user?")) {
                  deleteUser(row.original.id);
                }
              },
            },
          ]}
        />
      );
    },
  },
];

export function UsersPage() {
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

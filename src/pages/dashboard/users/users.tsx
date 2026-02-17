import { EntityTable } from "@/components/entity-table";
import { Button } from "@/components/ui/button";
import { Cell } from "@/components/ui/Cell";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useUsersQuery, type User } from "@/remote/queries/users";
import { type ColumnDef } from "@tanstack/react-table";
import { EllipsisVertical, Plus, RefreshCcw } from "lucide-react";
import { UserFormModal } from "./user-form-modal";
import {
  UserFormModalProvider,
  useUserFormModal,
} from "./user-form-modal-context";

const columns: ColumnDef<User>[] = [
  {
    accessorKey: "First Name",
    header: "First Name",
    cell: ({ row }) => <Cell>{row.original.first_name}</Cell>,
  },
  {
    accessorKey: "Last Name",
    header: "Last Name",
    cell: ({ row }) => <Cell>{row.original.last_name}</Cell>,
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => <Cell>{row.original.email}</Cell>,
  },
  {
    id: "actions",
    cell: ({ row }) => <ActionCell original={row.original} />,
  },
];

//TODO-REFACTOR: Move this into a single simpler component
const ActionCell = ({ original }: { original: User }) => {
  const { openModal } = useUserFormModal();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="float-right">
        <Button
          variant="ghost"
          className="data-[state=open]:bg-muted text-muted-foreground flex size-8"
          size="icon"
        >
          <EllipsisVertical />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-32">
        <DropdownMenuItem onClick={() => openModal(original.id)}>
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem>Reset Password</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export function DashboardUsers() {
  const { openModal } = useUserFormModal();
  const { data: users, refetch } = useUsersQuery();

  return (
    <section className="flex flex-1 flex-col gap-6">
      <UserFormModalProvider>
        <header className="flex">
          <h2 className="flex flex-1 text-2xl font-medium">Users</h2>
          <Button
            variant="outline"
            size="icon-sm"
            className="mr-2"
            onClick={() => openModal(null)}
          >
            <Plus className="cursor-pointer text-muted-foreground" />
          </Button>
          <Button variant="outline" size="icon-sm" onClick={() => refetch()}>
            <RefreshCcw className="cursor-pointer text-muted-foreground" />
          </Button>
        </header>
        <EntityTable data={users || []} columns={columns} />
        <UserFormModal />
      </UserFormModalProvider>
    </section>
  );
}

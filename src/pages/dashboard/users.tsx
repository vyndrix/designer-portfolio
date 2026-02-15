import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  useMutateUser,
  UserSchema,
  useUsersQuery,
  type User,
} from "@/remote/queries/users";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
  type ColumnDef,
} from "@tanstack/react-table";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  EllipsisVertical,
  Plus,
} from "lucide-react";
import { createContext, useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const columns: ColumnDef<User>[] = [
  {
    accessorKey: "First Name",
    header: "First Name",
    cell: ({ row }) => {
      return (
        <Label className="font-normal text-primary/80">
          {row.original.first_name ? row.original.first_name : "-"}
        </Label>
      );
    },
  },
  {
    accessorKey: "Last Name",
    header: "Last Name",
    cell: ({ row }) => {
      return (
        <Label className="font-normal text-primary/80">
          {row.original.last_name ? row.original.last_name : "-"}
        </Label>
      );
    },
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => {
      return (
        <Label className="font-normal text-primary/80">
          {row.original.email ? row.original.email : "-"}
        </Label>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <ActionCell original={row.original} />,
  },
];

const ActionCell = ({ original }: { original: User }) => {
  const { openModal } = useUserModal();

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
        <DropdownMenuItem onClick={() => openModal(original)}>
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
  const { data: users } = useUsersQuery();
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const table = useReactTable({
    data: users || [],
    columns,
    state: {
      pagination,
    },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
  });

  return (
    <section className="flex flex-1 flex-col gap-6">
      <header className="flex items-center justify-between">
        <h2 className="flex text-2xl font-medium">Users</h2>
        <Button variant="outline" size="icon-sm" onClick={() => null}>
          <Plus className="cursor-pointer text-muted-foreground" />
        </Button>
      </header>
      <article
        className={`
          w-[calc(100vw-4rem)]
          md:w-[calc(100vw-var(--sidebar-width)-4rem)]
          overflow-hidden
          rounded-lg
          border
          `}
      >
        <UserModalProvider>
          <Table>
            <TableHeader className="bg-muted sticky top-0 z-10">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id} colSpan={header.colSpan}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext(),
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody className="**:data-[slot=table-cell]:first:w-8">
              {table.getRowModel().rows?.length ? (
                <>
                  {table.getRowModel().rows.map((row) => (
                    <TableRow key={row.id} className="relative z-0">
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext(),
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </>
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </UserModalProvider>
      </article>
      <div className="flex items-center justify-end px-4">
        <div className="flex w-full items-center gap-8 lg:w-fit">
          <div className="ml-auto flex items-center gap-2 lg:ml-0">
            {/* <div className="flex w-fit items-center justify-center text-sm font-medium">
              Page {table.getState().pagination.pageIndex + 1} of{" "}
              {table.getPageCount()}
            </div> */}
            <Button
              variant="outline"
              className="hidden h-8 w-8 p-0 lg:flex"
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
            >
              <span className="sr-only">Go to first page</span>
              <ChevronsLeft />
            </Button>
            <Button
              variant="outline"
              className="size-8"
              size="icon"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <span className="sr-only">Go to previous page</span>
              <ChevronLeft />
            </Button>
            <Button
              variant="outline"
              className="size-8"
              size="icon"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <span className="sr-only">Go to next page</span>
              <ChevronRight />
            </Button>
            <Button
              variant="outline"
              className="hidden size-8 lg:flex"
              size="icon"
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
            >
              <span className="sr-only">Go to last page</span>
              <ChevronsRight />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

const UserModalContext = createContext<{
  openModal: (user: User) => void;
}>({ openModal: () => null });

function UserModalProvider({ children }: { children: React.ReactNode }) {
  const [userId, setUserId] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const { data: user } = useUsersQuery((data) =>
    data.find((u) => u.id === userId),
  );
  const { mutate, isPending } = useMutateUser();

  const { register, handleSubmit, reset } = useForm<User>({
    resolver: zodResolver(UserSchema),
  });

  const openModal = (user: User) => {
    setUserId(user.id);
    setOpen(true);
  };

  const onSubmit = handleSubmit((data: User) => mutate(data));

  useEffect(() => reset(user), [user]);

  return (
    <UserModalContext.Provider value={{ openModal }}>
      {children}
      <Dialog modal={true} open={open} onOpenChange={setOpen}>
        <DialogContent>
          <form onSubmit={onSubmit}>
            <DialogHeader>
              <DialogTitle>Edit User</DialogTitle>
              <DialogDescription>
                Make changes to your user here. Click save when you're done.
              </DialogDescription>
            </DialogHeader>
            <FieldGroup>
              <Field>
                <Label>First Name</Label>
                <Input
                  // value={user?.first_name ?? ""}
                  {...register("first_name")}
                />
              </Field>
              <Field>
                <Label>Last Name</Label>
                <Input
                  // value={user?.last_name ?? ""}
                  {...register("last_name")}
                />
              </Field>
              <Field>
                <Label>Email</Label>
                <Input
                  // value={user?.email ?? ""}
                  disabled
                  {...register("email")}
                />
              </Field>
            </FieldGroup>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit" disabled={isPending}>
                {isPending && <Spinner />}
                {"Save"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </UserModalContext.Provider>
  );
}

const useUserModal = () => useContext(UserModalContext);

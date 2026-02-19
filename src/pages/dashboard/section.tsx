import { EntityTable } from "@/components/entity-table";
import { Button } from "@/components/ui/button";
import type { ColumnDef } from "@tanstack/react-table";
import { Plus, RefreshCcw } from "lucide-react";

type Props<T> = {
  title: string;
  columns: ColumnDef<T>[];
  data?: T[];
  modal: React.ReactNode;
  onEdit: () => void;
  onRefresh: () => void;
};

export function Section<T>({
  title,
  columns,
  data = [],
  modal,
  onEdit,
  onRefresh,
}: Props<T>) {
  return (
    <section className="flex flex-1 flex-col gap-6">
      <header className="flex">
        <h2 className="flex flex-1 text-2xl font-medium">{title}</h2>
        <Button
          variant="outline"
          size="icon-sm"
          className="mr-2"
          onClick={onEdit}
        >
          <Plus className="cursor-pointer text-muted-foreground" />
        </Button>
        <Button variant="outline" size="icon-sm" onClick={onRefresh}>
          <RefreshCcw className="cursor-pointer text-muted-foreground" />
        </Button>
      </header>
      <EntityTable data={data} columns={columns} />
      {modal}
    </section>
  );
}

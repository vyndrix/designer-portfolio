import { FieldInput } from "@/components/field-input";
import { Button } from "@/components/ui/button";
import { DatePickerInput } from "@/components/ui/date-picker";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FieldGroup } from "@/components/ui/field";
import { Form } from "@/components/ui/form";
import { Spinner } from "@/components/ui/spinner";
import {
  DEFAULT_PROJECT,
  ProjectSchema,
  useMutateProject,
  useProjectsQuery,
  type Project,
} from "@/remote/queries/projects";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useEntityFormModal } from "../entity-form-modal-context";

export function ProjectFormModal() {
  const { entityId, isOpen, close } = useEntityFormModal();

  const { data: project } = useProjectsQuery((data: Project[]) =>
    data.find((s) => s.id === Number(entityId)),
  );
  const { mutate, isPending } = useMutateProject();

  const methods = useForm<Project>({
    resolver: zodResolver(ProjectSchema),
  });

  const onSubmit = methods.handleSubmit((data: Project) => mutate(data));

  useEffect(() => {
    console;

    const parsedProject: Project = project || DEFAULT_PROJECT;
    methods.reset({
      ...parsedProject,
      created_at: new Date(
        project?.created_at || new Date().getTime(),
      ).toLocaleDateString("en-US", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }),
    });
  }, [project]);

  return (
    <Dialog modal={true} open={isOpen} onOpenChange={close}>
      <DialogContent>
        <Form methods={methods} onSubmit={onSubmit}>
          <DialogHeader>
            <DialogTitle>Edit Project</DialogTitle>
            <DialogDescription>
              Make changes to your project here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <FieldGroup>
            <DatePickerInput
              control={methods.control}
              label="Date"
              name="created_at"
            />
            <FieldInput
              control={methods.control}
              label="Name"
              required
              name="name"
            />
            <FieldInput
              control={methods.control}
              label="Description"
              name="description"
            />
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
        </Form>
      </DialogContent>
    </Dialog>
  );
}

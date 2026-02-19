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
  DEFAULT_SKILL,
  SkillSchema,
  useMutateSkill,
  useSkillsQuery,
  type Skill,
} from "@/remote/queries/skills";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useEntityFormModal } from "../entity-form-modal-context";

export default function SkillFormModal() {
  const { entityId, isOpen, close } = useEntityFormModal();

  const { data: skill } = useSkillsQuery((data: Skill[]) =>
    data.find((s) => s.id === Number(entityId)),
  );
  const { mutate, isPending } = useMutateSkill();

  const methods = useForm<Skill>({
    resolver: zodResolver(SkillSchema),
  });

  const onSubmit = methods.handleSubmit((data: Skill) => mutate(data));

  useEffect(() => {
    const parsedSkill: Skill = skill || DEFAULT_SKILL;
    methods.reset({
      ...parsedSkill,
      created_at: new Date(skill?.created_at || "").toLocaleDateString(
        "en-US",
        {
          day: "2-digit",
          month: "long",
          year: "numeric",
        },
      ),
    });
  }, [skill]);

  return (
    <Dialog modal={true} open={isOpen} onOpenChange={close}>
      <DialogContent>
        <Form methods={methods} onSubmit={onSubmit}>
          <DialogHeader>
            <DialogTitle>Edit Skill</DialogTitle>
            <DialogDescription>
              Make changes to your skill here. Click save when you're done.
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

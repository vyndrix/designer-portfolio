import { FieldInput } from "@/components/field-input";
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
import { FieldGroup } from "@/components/ui/field";
import { Form } from "@/components/ui/form";
import { Spinner } from "@/components/ui/spinner";
import {
  DEFAULT_USER,
  useMutateUser,
  UserSchema,
  useUsersQuery,
  type User,
} from "@/remote/queries/users";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useEntityFormModal } from "../entity-form-modal-context";

export default function UserFormModal() {
  const { entityId, isOpen, close } = useEntityFormModal();

  const { data: user } = useUsersQuery((data: User[]) =>
    data.find((u) => u.id === entityId),
  );
  const { mutate, isPending } = useMutateUser();

  const methods = useForm<User>({
    resolver: zodResolver(UserSchema),
  });

  const onSubmit = methods.handleSubmit((data: User) => mutate(data));

  useEffect(() => {
    const parsedUser: User = user || DEFAULT_USER;
    methods.reset(parsedUser);
  }, [user]);

  return (
    <Dialog modal={true} open={isOpen} onOpenChange={close}>
      <DialogContent>
        <Form methods={methods} onSubmit={onSubmit}>
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
            <DialogDescription>
              Make changes to your user here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <FieldGroup>
            <FieldInput
              control={methods.control}
              label="Email"
              disabled={!!user}
              required={!user}
              name="email"
            />
            {!user && (
              <FieldInput
                control={methods.control}
                label="Password"
                name="password"
                type="password"
                required
              />
            )}
            <FieldInput
              control={methods.control}
              label="First Name"
              name="first_name"
            />
            <FieldInput
              control={methods.control}
              label="Last Name"
              name="last_name"
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

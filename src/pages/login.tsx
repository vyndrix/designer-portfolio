import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import z from "zod";

const schema = z.object({
  user: z.string().nonempty("User is required"),
  password: z.string().nonempty("Password is required"),
});

type Form = z.infer<typeof schema>;

export function Login() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Form>({
    resolver: zodResolver(schema),
  });

  const submit = useCallback(
    handleSubmit((data) => {
      if (data.user === "admin" && data.password === "admin") {
        toast.success("Login successful");
        return navigate("/dashboard", { replace: true });
      }

      toast.error("Invalid credentials");
    }),
    [navigate, handleSubmit],
  );

  return (
    <main className="flex justify-center items-center min-h-screen">
      <Card className="flex basis-sm p-2">
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your user below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={submit}>
            {/* <CardContent className="flex flex-col gap-6 pb-5"> */}
            <FieldGroup>
              <Field>
                <FieldLabel>User</FieldLabel>
                <Input
                  {...register("user")}
                  aria-invalid={!!errors.user?.message}
                  required
                />
              </Field>
              <Field>
                <FieldLabel>Password</FieldLabel>
                <Input
                  type="password"
                  {...register("password")}
                  aria-invalid={!!errors.password?.message}
                  required
                />
              </Field>
              <Separator />
              <Field>
                <Button type="submit">Login</Button>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}

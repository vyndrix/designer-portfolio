import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";

const schema = z.object({
  user: z.string(),
  password: z.string().min(6),
});

export function Login() {
  const { register, handleSubmit } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  });

  return (
    <main className="flex justify-center items-center min-h-screen">
      <Card className="flex basis-sm">
        <form onSubmit={handleSubmit((data) => alert(JSON.stringify(data)))}>
          <CardHeader>
            <h1 className="text-2xl font-medium pt-4 px-4">Dashboard Access</h1>
          </CardHeader>
          <CardContent className="flex flex-col gap-6 pb-5">
            <Field>
              <FieldLabel>User</FieldLabel>
              <Input {...register("user")} />
            </Field>
            <Field>
              <FieldLabel>Password</FieldLabel>
              <Input type="password" {...register("password")} />
            </Field>
          </CardContent>
          <Separator />
          <CardFooter className="flex p-5">
            <Button type="submit" className="flex-1">
              Login
            </Button>
          </CardFooter>
        </form>
      </Card>
    </main>
  );
}

import { Label } from "./label";

export function Cell({
  children,
  ...props
}: React.ComponentProps<typeof Label>) {
  return (
    <Label className="font-normal text-primary/80" {...props}>
      {children ?? "-"}
    </Label>
  );
}

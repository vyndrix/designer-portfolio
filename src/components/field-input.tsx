import { useId } from "react";
import {
  useFormContext,
  useFormState,
  type FieldPath as FP,
  type FieldValues as FV,
  type UseControllerProps,
} from "react-hook-form";
import { Field, FieldLabel } from "./ui/field";
import { Input } from "./ui/input";

type Props<TF extends FV = FV, TN extends FP<TF> = FP<TF>> = {
  label: string;
} & React.ComponentProps<typeof Input> &
  UseControllerProps<TF, TN>;

export function FieldInput<TF extends FV = FV, TN extends FP<TF> = FP<TF>>({
  label,
  name,
  ...props
}: Props<TF, TN>) {
  const { register } = useFormContext<TF>();
  const { errors } = useFormState<TF>();
  const id = useId();

  return (
    <Field id={id} data-invalid={!!errors[name]}>
      <FieldLabel htmlFor={id} data-invalid={!!errors[name]}>
        {label}
      </FieldLabel>
      <Input
        id={id}
        aria-invalid={!!errors[name]}
        {...register(name)}
        {...props}
      />
    </Field>
  );
}

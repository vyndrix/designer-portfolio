import {
  FormProvider,
  type FieldValues as FV,
  type UseFormReturn,
} from "react-hook-form";

type Props<
  TF extends FV = FV,
  TC = any,
  TV = TF,
> = React.ComponentProps<"form"> & { methods: UseFormReturn<TF, TC, TV> };

export const Form = <TF extends FV = FV, TC = any, TV = TF>({
  children,
  methods,
  ...props
}: Props<TF, TC, TV>) => {
  return (
    <FormProvider {...methods}>
      <form {...props}>{children}</form>
    </FormProvider>
  );
};

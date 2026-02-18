"use client";

import { CalendarIcon } from "lucide-react";
import * as React from "react";
import {
  useFormContext,
  useFormState,
  type FieldPath as FP,
  type FieldValues as FV,
  type UseControllerProps,
} from "react-hook-form";
import { Calendar } from "./calendar";
import { Field, FieldLabel } from "./field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "./input-group";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

//TODO-REFACTOR: Move this into a file with all inputs

function formatDate(date: Date | undefined) {
  if (!date) {
    return "";
  }

  return date.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

function isValidDate(date: Date | undefined) {
  if (!date) {
    return false;
  }
  return !isNaN(date.getTime());
}

type Props<TF extends FV = FV, TN extends FP<TF> = FP<TF>> = {
  label: string;
  date?: Date;
} & React.ComponentProps<typeof InputGroupInput> &
  UseControllerProps<TF, TN>;

export function DatePickerInput<
  TF extends FV = FV,
  TN extends FP<TF> = FP<TF>,
>({ label, date: initialDate = new Date(), name, ...props }: Props<TF, TN>) {
  const { register } = useFormContext<TF>();
  const { errors } = useFormState<TF>();
  const id = React.useId();
  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState<Date | undefined>(initialDate);
  const [month, setMonth] = React.useState<Date | undefined>(initialDate);
  const [value, setValue] = React.useState(formatDate(initialDate));

  return (
    <Field id={id} data-invalid={!!errors[name]} className="mx-auto w-48">
      <FieldLabel htmlFor={id} data-invalid={!!errors[name]}>
        {label}
      </FieldLabel>
      <InputGroup>
        <InputGroupInput
          id={id}
          value={value}
          placeholder="June 01, 2025"
          aria-invalid={!!errors[name]}
          {...register(name)}
          onChange={(e) => {
            const date = new Date(e.target.value);
            setValue(e.target.value);
            if (isValidDate(date)) {
              setDate(date);
              setMonth(date);
            }
          }}
          onKeyDown={(e) => {
            if (e.key === "ArrowDown") {
              e.preventDefault();
              setOpen(true);
            }
          }}
          {...props}
        />
        <InputGroupAddon align="inline-end">
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <InputGroupButton
                id={id}
                variant="ghost"
                size="icon-xs"
                aria-label="Select date"
              >
                <CalendarIcon />
                <span className="sr-only">Select date</span>
              </InputGroupButton>
            </PopoverTrigger>
            <PopoverContent
              className="w-auto overflow-hidden p-0"
              align="end"
              alignOffset={-8}
              sideOffset={10}
            >
              <Calendar
                mode="single"
                selected={date}
                month={month}
                onMonthChange={setMonth}
                onSelect={(date) => {
                  setDate(date);
                  setValue(formatDate(date));
                  setOpen(false);
                }}
              />
            </PopoverContent>
          </Popover>
        </InputGroupAddon>
      </InputGroup>
    </Field>
  );
}

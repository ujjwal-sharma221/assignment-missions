"use client";

import { useFormStatus } from "react-dom";
import { forwardRef } from "react";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";

type FormInputProps = {
  errors?: Record<string, string[] | undefined>;
  defaultValue?: string;
  className?: string;
  label?: string;
  id: string;
  type?: string;
  required?: boolean;
  disabled?: boolean;
  placeholder?: string;
  onBlur?: () => void;
};

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  (
    {
      id,
      label,
      type,
      placeholder,
      required,
      disabled,
      errors,
      className,
      defaultValue = "",
      onBlur,
    },
    ref,
  ) => {
    const { pending } = useFormStatus();

    return (
      <div className="space-y-2">
        <div className="space-y-1">
          {label ? (
            <Label
              htmlFor={id}
              className="text-xs font-semibold text-neutral-700"
            >
              {label}
            </Label>
          ) : null}
          <Input
            id={id}
            ref={ref}
            name={id}
            type={type}
            onBlur={onBlur}
            required={required}
            placeholder={placeholder}
            defaultValue={defaultValue}
            disabled={pending || disabled}
            aria-describedby={`${id}-error`}
            className={cn("text-sm px-2 py-1 h-7", className)}
          />
        </div>
        {errors?.title && <p className="text-rose-600">{errors.title[0]}</p>}
      </div>
    );
  },
);

FormInput.displayName = "FormInput";

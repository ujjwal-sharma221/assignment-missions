"use client";

import { useFormStatus } from "react-dom";

import { Input } from "@/components/ui/input";

type FormInputProps = {
  errors?: {
    title?: string[];
  };
};

export const FormInput = ({ errors }: FormInputProps) => {
  const { pending } = useFormStatus();
  return (
    <div>
      <Input
        id="title"
        name="title"
        required
        placeholder="enter a board title"
        className="border-black border-2 p-1"
        disabled={pending}
      />
      {errors?.title && <p className="text-rose-600">{errors.title[0]}</p>}
    </div>
  );
};

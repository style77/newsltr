import React from "react";
import type {
  FieldErrors,
  FieldValues,
  UseFormRegisterReturn,
} from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

interface InputProps {
  register: UseFormRegisterReturn;
  id: string;
  label: string;
  type: string;
  errors: FieldErrors;
}

const CustomInput = <T extends FieldValues>({
  register,
  id,
  label,
  type,
  errors,
}: InputProps) => {
  return (
    <div>
      <label className="text-ltext" htmlFor={id}>
        {label}
      </label>
      <div className="mb-5 mt-2">
        <input
          {...register}
          id={id}
          className={`text-black border w-96 bg-grey p-2 rounded-md ${
            errors[id]?.message ? "border-danger" : ""
          }`}
          type={type}
        />
        <ErrorMessage
          errors={errors}
          name={id}
          render={({ message }) =>
            message &&
            message.split(",").map((m) => (
              <p className="text-danger" key={m}>
                {m}
              </p>
            ))
          }
        />
      </div>
    </div>
  );
};

export default CustomInput;

import React from "react";
import { AlertTriangle } from "lucide-react";
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
    <div className="min-h-[100px]">
      <label className="text-ltext" htmlFor={id}>
        {label}
      </label>
      <div className="mb-5 mt-1">
        <input
          {...register}
          id={id}
          className={`text-ltext border w-96 p-2 rounded-md focus:outline-primary mb-1 ${
            errors[id]?.message
              ? "border-danger bg-red-100"
              : "bg-slate-50 border-slate-300"
          }`}
          type={type}
        />
        <ErrorMessage
          errors={errors}
          name={id}
          render={({ message }) =>
            message &&
            message.split(",").map((m) => (
              <div className="flex gap-1 text-danger items-center" key={m}>
                <AlertTriangle size={16} />
                <p className="text-sm">{m}</p>
              </div>
            ))
          }
        />
      </div>
    </div>
  );
};

export default CustomInput;

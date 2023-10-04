import { RegisterFormSchemaType } from "@/lib/types";
import React from "react";
import type {
  UseFormRegister,
  FieldValues,
  UseFormRegisterReturn,
} from "react-hook-form";

interface InputProps {
  register: UseFormRegisterReturn;
  label: string;
}
const CustomInput = ({ register, label }: InputProps) => {
  return (
    <div>
      <label htmlFor={label}>First Name</label>
      <div>
        <input
          {...register}
          id={label}
          className="text-black"
          type="text"
          // name={label}
        />
      </div>
    </div>
  );
};

export default CustomInput;

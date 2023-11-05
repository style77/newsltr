import React, { useState } from "react";
import { AlertTriangle, Eye, EyeOff } from "lucide-react";
import type {
  FieldErrors,
  FieldValues,
  UseFormRegisterReturn,
  UseFormGetValues,
} from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface InputProps<T extends FieldValues> {
  register: UseFormRegisterReturn;
  id: string;
  label: string;
  type: string;
  errors: FieldErrors;
  getValues?: UseFormGetValues<T>;
}

const CustomInput = <T extends FieldValues>({
  register,
  id,
  label,
  type,
  errors,
  getValues,
}: InputProps<T>) => {
  const pathname = usePathname();
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-[100px]">
      <label className="text-text text-sm" htmlFor={id}>
        <div className="flex justify-between">
          <div>{label}</div>
          {id === "password" && pathname === "/login" && (
            <Link className="text-secondary" href="reset_password">
              Forgot your password?
            </Link>
          )}
        </div>
      </label>
      <div className="mb-5 mt-1">
        <div
          className={`flex items-center w-96 border rounded-md focus-within:outline-primary focus-within:outline ${
            errors[id]?.message
              ? "border-error border-2 bg-red-100"
              : "bg-slate-50 border-slate-300"
          }`}
        >
          <input
            {...register}
            id={id}
            className="grow bg-transparent outline-0 py-2 px-4"
            type={type === "password" && !showPassword ? "password" : "text"}
          />
          {type === "password" && (
            <button
              type="button"
              className="pr-4 text-slate-300"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <EyeOff /> : <Eye />}
            </button>
          )}
        </div>
        <ErrorMessage
          errors={errors}
          name={id}
          render={({ message }) =>
            message &&
            message.split(".,").map((m, i) => (
              <div
                className=" mt-1.5 text-error justify-between items-center text-sm"
                key={m}
              >
                <div className="inline-flex items-start gap-1 w-80">
                  <div className="pt-[1px]">
                    <AlertTriangle size={13} />
                  </div>
                  <span className="leading-[16px]">
                    <span>
                      {m}
                      {i < message.split(".,").length - 1 && "."}
                    </span>
                  </span>
                </div>
              </div>
            ))
          }
        />
      </div>
    </div>
  );
};

export default CustomInput;

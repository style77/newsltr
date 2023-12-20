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
      <label className="text-sm text-text" htmlFor={id}>
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
          className={`flex w-96 items-center rounded-md border focus-within:outline focus-within:outline-primary ${
            errors[id]?.message
              ? "border-2 border-error bg-red-100"
              : "border-slate-300 bg-slate-50"
          }`}
        >
          <input
            {...register}
            id={id}
            className="grow bg-transparent px-4 py-2 outline-0"
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
                className=" mt-1.5 items-center justify-between text-sm text-error"
                key={m}
              >
                <div className="inline-flex w-80 items-start gap-1">
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

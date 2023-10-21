import React, { memo, useState } from "react";
import { AlertTriangle, Eye, EyeOff } from "lucide-react";
import type {
  FieldErrors,
  FieldValues,
  UseFormRegisterReturn,
  UseFormGetValues,
} from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { useToast } from "./use-toast";
import { useResendActivationMutation } from "@/redux/features/authApiSlice";
import Spinner from "./spinner";
import { useResendActivationEmail } from "@/hooks/useResenActivationEmail";

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
  // const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const v = errors.email?.message;
  // const [resendActivation, { isLoading }] = useResendActivationMutation();
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // const resendActivationEmail = async () => {
  //   if (getValues) {
  //     const { email } = getValues();
  //     console.log("values", getValues());
  //     try {
  //       await resendActivation({ email });
  //       toast({
  //         title: "Activation email successfully sent! Please check your email.",
  //       });
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  // };
  return (
    <div className="min-h-[100px]">
      <label className="text-text" htmlFor={id}>
        {label}
      </label>
      <div className="mb-5 mt-1">
        <div
          className={`flex items-center w-96 border rounded-md focus:outline-primary ${
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
              className="pr-4 text-text"
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
                className="flex mt-1 text-error justify-between items-center text-sm"
                key={m}
              >
                <div className="flex gap-1 w-80">
                  <AlertTriangle className="w-8" size={16} />
                  <span>
                    {m}
                    {i < message.split(".,").length - 1 && "."}
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

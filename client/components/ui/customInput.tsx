import React from "react";
import { AlertTriangle } from "lucide-react";
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
  const { toast } = useToast();

  const v = errors.email?.message;
  const [resendActivation, { isLoading }] = useResendActivationMutation();

  const resendActivationEmail = async () => {
    if (getValues) {
      const { email } = getValues();
      console.log("values", getValues());
      try {
        await resendActivation({ email });
        toast({
          title: "Activation email successfully sent! Please check your email.",
        });
      } catch (error) {
        console.log(error);
      }
    }
  };
  console.log(register);
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
            message.split(".,").map((m, i) => (
              <div
                className="flex text-danger justify-between items-center text-sm"
                key={m}
              >
                <div className="flex gap-1">
                  <AlertTriangle size={16} />
                  <p>
                    {m}
                    {i < message.split(".,").length - 1 && "."}
                  </p>
                </div>
              </div>
            ))
          }
        />
        <div>
          {
            <div>
              {v?.toString().includes("not active") && id === "email" && (
                <button
                  type="button"
                  onClick={resendActivationEmail}
                  className="text-sm text-secondary underline font-semibold"
                >
                  {isLoading ? <Spinner /> : "Resend activation email"}
                </button>
              )}
            </div>
          }
        </div>
      </div>
    </div>
  );
};

export default CustomInput;

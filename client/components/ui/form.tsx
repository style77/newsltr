import React from "react";
import type {
  FieldErrors,
  FieldValues,
  UseFormHandleSubmit,
  UseFormRegister,
  SubmitHandler,
  UseFormGetValues,
} from "react-hook-form";
import CustomInput from "./customInput";
import { Button } from "./button";
import Spinner from "./spinner";

interface Config {
  id: string;
  label: string;
  type: string;
}

interface FormProps<T extends FieldValues> {
  config: Config[];
  register: UseFormRegister<any>;
  getValues?: UseFormGetValues<T>;
  onSubmit: SubmitHandler<T>;
  handleSubmit: UseFormHandleSubmit<T>;
  errors: FieldErrors<T>;
  btnText: string;
  isLoading: boolean;
}

const Form = <T extends FieldValues>({
  config,
  register,
  errors,
  onSubmit,
  handleSubmit,
  btnText,
  isLoading,
  getValues,
}: FormProps<T>) => {
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {config.map((input) => (
        <CustomInput
          key={input.id}
          register={{ ...register(input.id) }}
          id={input.id}
          label={input.label}
          type={input.type}
          errors={errors}
          getValues={getValues}
        />
      ))}
      <div>
        <Button
          size="lg"
          className="bg-primary text-ltext w-full text-base"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? <Spinner /> : btnText}
        </Button>
      </div>
    </form>
  );
};

export default Form;

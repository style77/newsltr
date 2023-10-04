"use client";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRegisterMutation } from "@/redux/features/authApiSlice";
import { useToast } from "@/components/ui/use-toast";
import Spinner from "@/components/ui/spinner";

import { RegisterFormSchemaType, formSchema, RegisterError } from "@/lib/types";
import CustomInput from "@/components/ui/customInput";

const Page = () => {
  const { toast } = useToast();
  const [register, { isLoading }] = useRegisterMutation();

  const {
    register: registerInput,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setError,
  } = useForm<RegisterFormSchemaType>({
    resolver: zodResolver(formSchema),
  });

  console.log(errors);

  const [errorblur, setErrorblur] = useState(false);

  const onSubmit = async (data: RegisterFormSchemaType) => {
    console.log("i am created", data);
    console.log("i am created", errors);

    const { first_name, last_name, email, password, re_password } = data;
    try {
      await register({
        first_name,
        last_name,
        email,
        password,
        re_password,
      }).unwrap();

      toast({
        title: "Your account was succesfully created!",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to sign up!",
      });
      const result = (error as RegisterError).data;
      console.log("EROOR", result);
      if (result) {
        setError("password", {
          type: "server",
          message: result.password?.toString(),
        });
      }
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CustomInput
          register={{ ...registerInput("first_name") }}
          label="first_name"
        />

        <div>
          <label htmlFor="last_name">Last Name</label>
          <div>
            <input
              {...registerInput("last_name")}
              type="text"
              name="last_name"
              id="last_name"
            />
          </div>
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <div>
            <input
              {...registerInput("email")}
              type="email"
              name="email"
              id="email"
            />
          </div>
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <div>
            <input
              {...registerInput("password")}
              className={`${errorblur ? "border-red-300 border" : ""}`}
              type="password"
              name="password"
              id="password"
            />
            {errors.password && (
              <ul>
                {errors.password.message?.split(",").map((error) => (
                  <li className="text-red-500" key={error}>
                    {error}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        <div>
          <label htmlFor="re_password">Confirm Password</label>
          <div>
            <input
              {...registerInput("re_password")}
              type="password"
              name="re_password"
              id="re_password"
            />
            {errors.re_password && (
              <ul>
                {errors.re_password.message?.split(",").map((error) => (
                  <li className="text-red-500" key={error}>
                    {error}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <button type="submit" disabled={isSubmitting}>
          {isLoading ? <Spinner /> : "Sign up"}
        </button>
      </form>
    </div>
  );
};

export default Page;

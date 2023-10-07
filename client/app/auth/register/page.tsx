"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRegisterMutation } from "@/redux/features/authApiSlice";
import { useToast } from "@/components/ui/use-toast";
import Spinner from "@/components/ui/spinner";

import { RegisterFormSchemaType, formSchema, RegisterError } from "@/lib/types";
import CustomInput from "@/components/ui/customInput";
import RegisterForm from "@/components/RegisterForm";

const Page = () => {
  // const { toast } = useToast();
  // const [register, { isLoading }] = useRegisterMutation();
  //
  // const {
  //   register: registerInput,
  //   handleSubmit,
  //   formState: { errors, isSubmitting },
  //   reset,
  //   setError,
  // } = useForm<RegisterFormSchemaType>({
  //   resolver: zodResolver(formSchema),
  //   mode: "onBlur",
  // });
  //
  // console.log(errors);
  //
  // const onSubmit = async (data: RegisterFormSchemaType) => {
  //   const { first_name, last_name, email, password, re_password } = data;
  //   try {
  //     await register({
  //       first_name,
  //       last_name,
  //       email,
  //       password,
  //       re_password,
  //     }).unwrap();
  //
  //     toast({
  //       title: "Your account was succesfully created!",
  //     });
  //   } catch (error) {
  //     toast({
  //       variant: "destructive",
  //       title: "Failed to sign up!",
  //     });
  //     const result = (error as RegisterError).data;
  //     console.log("EROOR", result);
  //     if (result) {
  //       for (const k in data) {
  //         const key = k as keyof typeof data;
  //         setError(key, {
  //           type: "server",
  //           message: result[key]?.toString(),
  //         });
  //       }
  //     }
  //   }
  // };
  return (
    <div className="flex justify-between">
      <div className=" flex justify-center items-center">
        <RegisterForm />
      </div>
    </div>
  );
};

export default Page;

// <form onSubmit={handleSubmit(onSubmit)}>
//         <CustomInput
//           register={{ ...registerInput("first_name") }}
//           id="first_name"
//           label="First Name"
//           type="text"
//           errors={errors}
//         />
//         <CustomInput
//           register={{ ...registerInput("last_name") }}
//           id="last_name"
//           label="Last Name"
//           type="text"
//           errors={errors}
//         />
//         <CustomInput
//           register={{ ...registerInput("email") }}
//           id="email"
//           label="Email"
//           type="email"
//           errors={errors}
//         />
//         <CustomInput
//           register={{ ...registerInput("password") }}
//           id="password"
//           label="Password"
//           type="password"
//           errors={errors}
//         />
//         <CustomInput
//           register={{ ...registerInput("re_password") }}
//           id="re_password"
//           label="Confirm Password"
//           type="password"
//           errors={errors}
//         />
//         <button type="submit" disabled={isSubmitting}>
//           {isLoading ? <Spinner /> : "Sign up"}
//         </button>
//       </form>

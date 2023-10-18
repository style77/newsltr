import { useLoginMutation } from "@/redux/features/authApiSlice";
import { useToast } from "@/components/ui/use-toast";
import { loginFormSchema, LoginFormSchemaType, LoginError } from "@/lib/types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { setAuth } from "@/redux/features/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

export const useLogin = () => {
  const route = useRouter();
  const dispatch = useAppDispatch();
  const [login, { isLoading, error, isSuccess }] = useLoginMutation();
  const { toast } = useToast();
  const {
    register: registerInput,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setError,
    getValues,
  } = useForm<LoginFormSchemaType>({
    resolver: zodResolver(loginFormSchema),
    mode: "onBlur",
  });
  // console.log("MYERROR", error);
  const onSubmit = async (data: LoginFormSchemaType) => {
    const { email, password } = data;
    try {
      const res = await login({
        email,
        password,
      }).unwrap();
      dispatch(setAuth());
      // console.log(res);
      toast({
        title: "You are succesfully logged in!",
      });
      // route.push("/");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to login in!",
      });
      // const result = (error as LoginError).data;
      // console.log("EROOR", error);
      // if (result) {
      //   setError("email", {
      //     type: "server",
      //     message: result.detail,
      //   });
      // }
    }
  };

  return {
    onSubmit,
    handleSubmit,
    isLoading,
    isSubmitting,
    registerInput,
    errors,
    getValues,
    error,
  };
};

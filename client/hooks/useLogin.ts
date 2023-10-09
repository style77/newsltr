import { useLoginMutation } from "@/redux/features/authApiSlice";
import { useToast } from "@/components/ui/use-toast";
import { loginFormSchema, LoginFormSchemaType, LoginError } from "@/lib/types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export const useLogin = () => {
  const [login, { isLoading }] = useLoginMutation();
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
  const onSubmit = async (data: LoginFormSchemaType) => {
    const { email, password } = data;
    try {
      await login({
        email,
        password,
      }).unwrap();

      toast({
        title: "You are succesfully logged in!",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to login in!",
      });
      const result = (error as LoginError).data;
      console.log("EROOR", error);
      if (result) {
        setError("email", {
          type: "server",
          message: result.detail,
        });
      }
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
  };
};

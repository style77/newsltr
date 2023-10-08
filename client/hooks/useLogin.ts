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
      console.log("EROOR", result);
      if (result) {
        setError("email", {
          type: "server",
          message:
            result.detail +
            ". if you have already created an account with these credentials but ndidn't activate it",
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
  };
};

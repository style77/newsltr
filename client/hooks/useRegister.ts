import { useRegisterMutation } from "@/redux/features/authApiSlice";
import { useToast } from "@/components/ui/use-toast";
import { formSchema, RegisterFormSchemaType, RegisterError } from "@/lib/types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export const useRegister = () => {
  const [register, { isLoading }] = useRegisterMutation();
  const { toast } = useToast();
  const {
    register: registerInput,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setError,
  } = useForm<RegisterFormSchemaType>({
    resolver: zodResolver(formSchema),
    mode: "onBlur",
  });
  const onSubmit = async (data: RegisterFormSchemaType) => {
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
        for (const k in data) {
          const key = k as keyof typeof data;
          setError(key, {
            type: "server",
            message: result[key]?.toString(),
          });
        }
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

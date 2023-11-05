import { useResetPasswordMutation } from "@/redux/features/authApiSlice";
import { useToast } from "@/components/ui/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ResetPasswordSchemaType, resetPasswordSchema } from "@/lib/types";

export const useResetPassword = () => {
  const { toast } = useToast();
  const {
    register: registerInput,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    getValues,
  } = useForm<ResetPasswordSchemaType>({
    resolver: zodResolver(resetPasswordSchema),
    mode: "onBlur",
  });
  const [resetPassword, { isLoading, error }] = useResetPasswordMutation();

  const onSubmit = async (data: ResetPasswordSchemaType) => {
    const { email } = data;
    try {
      await resetPassword({ email }).unwrap();
      toast({
        title:
          "Reset password link was succesfully sent. Please check your email.",
      });
    } catch (error) {
      console.log(error);
      toast({
        title: "Failed to send reset link, please try again.",
      });
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

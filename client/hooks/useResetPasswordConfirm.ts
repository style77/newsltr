import { useResetPasswordConfirmMutation } from "@/redux/features/authApiSlice";
import { useToast } from "@/components/ui/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ResetPasswordConfirmSchemaType,
  resetPasswordConfirmSchema,
  ParamsType,
} from "@/lib/types";

export const useResetPasswordConfirm = (params: ParamsType) => {
  const { toast } = useToast();
  const { uid, token } = params;
  console.log("params", params);
  const {
    register: registerInput,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    getValues,
  } = useForm<ResetPasswordConfirmSchemaType>({
    resolver: zodResolver(resetPasswordConfirmSchema),
    mode: "onBlur",
  });
  const [resetPasswordConfirm, { isLoading, error }] =
    useResetPasswordConfirmMutation();

  const onSubmit = async (data: ResetPasswordConfirmSchemaType) => {
    const { new_password, re_new_password } = data;
    console.log(data);
    try {
      await resetPasswordConfirm({
        uid,
        token,
        new_password,
        re_new_password,
      }).unwrap();
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

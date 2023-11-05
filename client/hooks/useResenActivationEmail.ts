import { useToast } from "@/components/ui/use-toast";
import { useResendActivationMutation } from "@/redux/features/authApiSlice";
import { UseFormGetValues, FieldValues } from "react-hook-form";

export const useResendActivationEmail = <T extends FieldValues>(
  getValues: UseFormGetValues<T>,
) => {
  const { toast } = useToast();
  // const errorMessage = errors?.email?.message;
  // console.log("hooks erros", errors);
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
  return { resendActivationEmail, isLoading };
};

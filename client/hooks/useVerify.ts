import { useEffect } from "react";
import { useVerifyMutation } from "@/redux/features/authApiSlice";
import { isLoadingFinished, setAuth } from "@/redux/features/authSlice";
import { useAppDispatch } from "@/redux/hooks";
import { useRouter } from "next/navigation";

export const useVerify = () => {
  const router = useRouter();
  const [verify, { isLoading }] = useVerifyMutation();
  const dispatch = useAppDispatch();
  useEffect(() => {
    try {
      const verifyAuth = async () => {
        await verify({}).unwrap();
        dispatch(setAuth());
        // router.push("/dashboard");
      };
      verifyAuth();
    } finally {
      dispatch(isLoadingFinished());
    }
  }, []);
  return isLoading;
};

import { useEffect } from "react";
import { useVerifyMutation } from "@/redux/features/authApiSlice";
import { isLoadingFinished, setAuth } from "@/redux/features/authSlice";
import { useAppDispatch } from "@/redux/hooks";

export const useVerify = () => {
  const [verify, { isLoading }] = useVerifyMutation();
  const dispatch = useAppDispatch();
  useEffect(() => {
    try {
      const verifyAuth = async () => {
        await verify({}).unwrap();
        dispatch(setAuth());
      };
      verifyAuth();
    } finally {
      dispatch(isLoadingFinished());
    }
  }, []);
  return isLoading;
};

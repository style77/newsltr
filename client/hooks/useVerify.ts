import { useEffect } from "react";
import { useVerifyMutation } from "@/redux/features/authApiSlice";
import { isLoadingFinished, setAuth } from "@/redux/features/authSlice";
import { useAppDispatch } from "@/redux/hooks";

export const useVerify = () => {
  const [verify] = useVerifyMutation();
  const dispatch = useAppDispatch();
  // const token = "token";
  useEffect(() => {
    try {
      const verifyAuth = async () => {
        await verify(undefined).unwrap();
        dispatch(setAuth());
      };
      verifyAuth();
    } finally {
      dispatch(isLoadingFinished());
    }
  }, []);
};

import { useLogoutMutation } from "@/redux/features/authApiSlice";
import { useAppDispatch } from "@/redux/hooks";
import { useRouter } from "next/navigation";
import { logout as setLogout } from "@/redux/features/authSlice";

export const useLogout = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [logout] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await logout({}).unwrap();
      dispatch(setLogout());
    } catch (e) {
      console.log(e);
    } finally {
      router.push("/");
    }
  };

  return handleLogout;
};

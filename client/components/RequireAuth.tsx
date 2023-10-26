"use client";
import { useAppSelector } from "@/redux/hooks";
import { useRouter, redirect } from "next/navigation";
import Spinner from "./ui/spinner";
import { useToast } from "./ui/use-toast";
import { useVerify } from "@/hooks/useVerify";

interface RequireAuthProps {
  children: React.ReactNode;
}

const RequireAuth = ({ children }: RequireAuthProps) => {
  const router = useRouter();
  const { toast } = useToast();
  const { isUserAuthenticated, isLoading } = useAppSelector(
    (state) => state.auth,
  );

  const verifyLoader = useVerify();

  console.log(isUserAuthenticated);
  console.log(isLoading);

  if (isLoading) {
    return (
      <div className="flex justify-center my-8">
        <Spinner />
      </div>
    );
  }

  if (!verifyLoader && !isUserAuthenticated) {
    // toast({
    //   title: "Must be logged in to view this page!",
    // });
    redirect("/login");
  }

  return <>{children}</>;
};

export default RequireAuth;

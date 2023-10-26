import { useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAppDispatch } from "@/redux/hooks";
import { setAuth } from "@/redux/features/authSlice";
import { useToast } from "@/components/ui/use-toast";

export default function useSocialAuth(authenticate: any, provider: string) {
  const { toast } = useToast();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();

  const effectRan = useRef(false);

  useEffect(() => {
    const state = searchParams.get("state");
    const code = searchParams.get("code");

    if (state && code && !effectRan.current) {
      authenticate({ provider, state, code })
        .unwrap()
        .then(() => {
          dispatch(setAuth());
          toast({ title: "Logged in" });
          router.push("/dashboard");
        })
        .catch(() => {
          toast({ title: "Failed to log in" });
          router.push("/login");
        });
    }

    return () => {
      effectRan.current = true;
    };
  }, [authenticate, provider]);
}

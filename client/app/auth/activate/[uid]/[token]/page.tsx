"use client";
import { useToast } from "@/components/ui/use-toast";
import { useActivationMutation } from "@/redux/features/authApiSlice";
import { register } from "module";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

interface ParamsProps {
  params: {
    uid: string;
    token: string;
  };
}

const Page = ({ params }: ParamsProps) => {
  const { toast } = useToast();
  const router = useRouter();
  const [activate] = useActivationMutation();
  console.log(params);

  useEffect(() => {
    const { uid, token } = params;
    const activation = async () => {
      try {
        await activate({ uid, token }).unwrap();
        toast({ title: "Account activated!" });
      } catch (error) {
        console.log(error);
        toast({
          variant: "destructive",
          title: `Failed to activate account, email validation expired`,
        });
      } finally {
        router.push("/auth/login");
      }
    };

    activation();
  }, []);

  return <div>account activation</div>;
};

export default Page;

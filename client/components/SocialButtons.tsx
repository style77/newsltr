"use client";

import { ImGoogle } from "react-icons/im";
import SocialButton from "@/components/SocialButton";
import { continueWithGoogle } from "@/utils";

export default function SocialButtons() {
  return (
    <div className="flex justify-between items-center gap-2 mt-5">
      <SocialButton provider="google" onClick={continueWithGoogle}>
        <ImGoogle className="mr-3" /> Google Signin
      </SocialButton>
    </div>
  );
}

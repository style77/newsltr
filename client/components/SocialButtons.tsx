"use client";

import { ImGoogle } from "react-icons/im";
import SocialButton from "@/components/SocialButton";
import { continueWithGoogle } from "@/utils";

export default function SocialButtons() {
  return (
    <div className="flex items-center justify-between gap-2">
      <SocialButton provider="google" onClick={continueWithGoogle}>
        <ImGoogle className="mr-3" /> Sign in with Google
      </SocialButton>
    </div>
  );
}

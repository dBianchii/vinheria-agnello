"use client";

import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { Button } from "~/components/ui/button";

export function LoginWithGoogleButton() {
  return (
    <Button
      variant={"outline"}
      className="w-full"
      onClick={async () => {
        await signIn("google", {
          callbackUrl: "/",
        });
      }}
    >
      <FcGoogle className="mr-2 size-4" />
      Login via Google
    </Button>
  );
}

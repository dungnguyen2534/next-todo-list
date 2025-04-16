import { signIn, signOut } from "@/app/auth";
import { Button } from "./ui/button";
import React from "react";

interface AuthButtonProps {
  content?: React.ReactNode;
  className?: string;
  variant?: "default" | "outline" | "ghost" | "link" | "destructive";
}

export function SignInButton({ variant, className, content }: AuthButtonProps) {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("google");
      }}
    >
      <Button
        title="Sign in"
        variant={variant}
        className={className}
        type="submit"
      >
        {content ? content : "Sign in with Google"}
      </Button>
    </form>
  );
}

export function SignOutButton({
  variant,
  className,
  content,
}: AuthButtonProps) {
  return (
    <form
      action={async () => {
        "use server";
        await signOut();
      }}
    >
      <Button
        title="Sign out"
        variant={variant}
        className={className}
        type="submit"
      >
        {content ? content : "Sign out"}
      </Button>
    </form>
  );
}

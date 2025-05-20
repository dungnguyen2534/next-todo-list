import { signIn, signOut } from "@/app/auth";
import { Button } from "./ui/button";
import React from "react";

export function SignInButton({
  variant,
  className,
  children,
  ...props
}: React.ComponentProps<typeof Button>) {
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
        {...props}
      >
        {children ? children : "Sign in with Google"}
      </Button>
    </form>
  );
}

export function SignOutButton({
  variant,
  className,
  children,
  ...props
}: React.ComponentProps<typeof Button>) {
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
        {...props}
      >
        {children ? children : "Sign out"}
      </Button>
    </form>
  );
}

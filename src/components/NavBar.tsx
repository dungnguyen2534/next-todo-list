import { auth } from "@/app/auth";
import { SignInButton, SignOutButton } from "./AuthButton";

import UserInfo from "./UserInfo";
import { LogOut } from "lucide-react";
import { ThemeToggler } from "./ThemeToggler";

export default async function NavBar() {
  const session = await auth();

  return (
    <nav className="flex justify-between">
      <div>
        <h1 className="text-3xl font-semibold">Your todos</h1>
        {session?.user ? (
          <UserInfo user={session.user} size={24} className="mt-2" />
        ) : (
          <div className="text-muted-foreground flex items-center text-sm font-semibold">
            <SignInButton variant="link" className="p-1" /> to save your todos
            on cloud.
          </div>
        )}
      </div>
      <div className="flex gap-2">
        <ThemeToggler className="h-9 w-9 border-0 shadow-sm" />

        {session?.user && (
          <SignOutButton
            content={<LogOut />}
            variant="outline"
            className="h-9 w-9 border-0 shadow-sm"
          />
        )}
      </div>
    </nav>
  );
}

import { auth } from "@/app/auth";
import { SignInButton, SignOutButton } from "./AuthButton";

import UserInfo from "./UserInfo";
import { LogOut, PlusIcon } from "lucide-react";
import { ThemeToggler } from "./ThemeToggler";
import { Button } from "./ui/button";
import Link from "next/link";

export default async function NavBar() {
  const session = await auth();
  const loggedInUser = session?.user;

  return (
    <nav className="mb-1 flex justify-between">
      <div>
        {loggedInUser ? (
          <UserInfo user={loggedInUser} size={32} className="" />
        ) : (
          <div className="text-muted-foreground -mb-1 flex items-center text-sm font-semibold">
            <SignInButton variant="link" className="mr-1 p-0" />{" "}
            <span className="hidden sm:inline">
              to save your todos on cloud.
            </span>
          </div>
        )}
        <h1 className="text-[2.4rem] font-bold text-gray-800">Your todos</h1>
      </div>
      <div className="w-20">
        <div className="flex gap-2">
          <ThemeToggler
            className={`h-9 w-9 border-0 shadow-sm ${!loggedInUser ? "ml-auto" : ""}`}
          />

          {loggedInUser && (
            <SignOutButton
              variant="outline"
              className="h-9 w-9 border-0 shadow-sm"
            >
              <LogOut />
            </SignOutButton>
          )}
        </div>
        <Button className="mt-2 w-full" asChild title="Add new todo">
          <Link href="/new">
            <PlusIcon /> New
          </Link>
        </Button>
      </div>
    </nav>
  );
}

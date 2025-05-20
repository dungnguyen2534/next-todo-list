"use client";

import UserInfo from "./UserInfo";
import { LogOut, PlusIcon } from "lucide-react";
import { ThemeToggler } from "./ThemeToggler";
import { Button } from "./ui/button";
import Link from "next/link";
import { User } from "@prisma/client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { useState } from "react";
import { signOut } from "next-auth/react";
import LoadingButton from "./LoadingButton";

interface NavBarProps {
  user: User;
}

export default function NavBar({ user }: NavBarProps) {
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);

  return (
    <nav className="mb-1 flex justify-between">
      <div>
        <UserInfo user={user} size={32} className="" />
        <h1 className="text-[2.4rem] font-bold text-gray-800 dark:text-gray-200">
          Your todos
        </h1>
      </div>
      <div className="w-20">
        <div className="flex gap-2">
          <ThemeToggler className="h-9 w-9 border-0 shadow-sm" />

          <Dialog open={isOpenDialog} onOpenChange={setIsOpenDialog}>
            <DialogTrigger asChild>
              <Button className="h-9 w-9 border-0 shadow-sm" variant="outline">
                <LogOut />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogTitle className="text-xl">Sign out</DialogTitle>
              <DialogDescription className="-mt-3">
                Are you sure to sign out?
              </DialogDescription>
              <div className="grid grid-cols-2 gap-2">
                <Button
                  onClick={() => setIsOpenDialog(false)}
                  variant="outline"
                >
                  Cancel
                </Button>
                <LoadingButton
                  loading={isSigningOut}
                  className="w-full"
                  variant="default"
                  onClick={() => {
                    setIsSigningOut(true);
                    signOut();
                  }}
                >
                  Sign out
                </LoadingButton>
              </div>
            </DialogContent>
          </Dialog>
        </div>
        <Button className="mt-2 w-full" asChild title="Add new todo">
          <Link href="/new">
            <PlusIcon size={15} className="mt-[0.1rem]" />
            <span className="-ml-[0.15rem]">New</span>
          </Link>
        </Button>
      </div>
    </nav>
  );
}

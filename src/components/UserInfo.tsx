import { User } from "next-auth";
import Image from "next/image";
import React from "react";

interface UserInfoProps {
  user: User;
  size?: number;
  className?: string;
}

export default function UserInfo({ user, size, className }: UserInfoProps) {
  return (
    <div
      className={`text-muted-foreground flex items-center gap-2 text-sm font-semibold ${className}`}
    >
      <Image
        src={user.image || ""}
        alt="user avatar"
        width={size || 36}
        height={size || 36}
        className="rounded-[8px]"
      />
      <p>{user.name}</p>
    </div>
  );
}

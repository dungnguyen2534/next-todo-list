"use server";

import { auth } from "@/app/auth";
import { prisma } from "./prisma";
import { TodoStatus } from "@prisma/client";

export async function createTodo(input: { title: string; status: TodoStatus }) {
  if (!input.title.trim()) throw new Error("Title cannot be empty");

  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");

  await prisma.todo.create({
    data: {
      title: input.title,
      status: input.status,
      userId: session.user.id!,
    },
  });
}

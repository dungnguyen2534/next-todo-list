"use server";

import { auth } from "@/app/auth";
import { prisma } from "./prisma";
import { Category, Priority, TodoStatus } from "@prisma/client";

export async function createTodo(input: {
  title: string;
  category: Category;
  status: TodoStatus;
  priority: Priority;
}) {
  if (!input.title.trim()) throw new Error("Title cannot be empty");

  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");

  try {
    const newTodo = await prisma.todo.create({
      data: {
        ...input,
        userId: session.user.id!,
      },
    });

    return newTodo;
  } catch (error) {
    console.log("Error in createTodo action:" + error);
    throw new Error("Database error");
  }
}

export async function getTodos() {
  const session = await auth();
  if (!session?.user) return;

  const todos = await prisma.todo.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
  });

  return todos;
}

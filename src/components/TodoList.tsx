"use client";

import Todo from "./Todo";
import { useTodoContext } from "@/app/todo-context";
import { useEffect } from "react";
import { User } from "next-auth";
import { toast } from "sonner";

interface TodoListProps {
  user: User;
  className?: string;
}

export default function TodoList({ user, className }: TodoListProps) {
  const { contextTodos, setContextTodos, isLoaded, setIsLoaded } =
    useTodoContext();

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchData = async () => {
      if (isLoaded) return;

      try {
        const res = await fetch(`/api/users/${user.id}/todos`, { signal });
        if (!res.ok) {
          setContextTodos([]);
          setIsLoaded(true);
          toast.error("Something went wrong. Try refreshing the page.");
          return;
        }
        const data = await res.json();
        setContextTodos(data);
        setIsLoaded(true);
      } catch (err) {
        if (!(err instanceof DOMException && err.name === "AbortError")) {
          toast.error("Something went wrong. Try refreshing the page.");
        }
      }
    };

    fetchData();
    return () => controller.abort();
  }, [user.id, setContextTodos, setIsLoaded, isLoaded]);

  return (
    <div className={`space-y-2 ${className}`}>
      {contextTodos.map((todo) => (
        <Todo key={todo.id} todo={todo} />
      ))}

      {!isLoaded && <Skeleton count={user.todoCount ?? 1} />}
    </div>
  );
}

function Skeleton({ count = 1 }: { count?: number }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="relative flex h-[4.95rem] animate-pulse flex-col justify-between rounded-md border-1 bg-gray-100 px-2 py-1 dark:bg-[#1a1a1a]"
        ></div>
      ))}
    </>
  );
}

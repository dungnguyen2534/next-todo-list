"use client";

import { useEffect, useState, useTransition } from "react";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { createTodo } from "@/app/new/actions";
import { $Enums } from "@prisma/client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import LoadingButton from "./LoadingButton";
import { useTodoContext } from "@/app/todo-context";
import { TodoInput } from "@/types/type";
import { useSession } from "next-auth/react";

interface AddTodoFormProps {
  className?: string;
}

export default function AddTodoForm({ className }: AddTodoFormProps) {
  const { data } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!data?.user) {
      router.replace("/login");
    }
  }, [data, router]);

  const { setContextTodos } = useTodoContext();
  const [isPending, startTransition] = useTransition();
  const [todoInput, setTodoInput] = useState<TodoInput>({
    title: "",
    category: $Enums.Category.WORK,
    status: $Enums.TodoStatus.PENDING,
    priority: $Enums.Priority.MEDIUM,
  });

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (todoInput.title.trim() === "") return;

    startTransition(async () => {
      try {
        const newTodo = await createTodo(todoInput);
        setContextTodos((prev) => [newTodo, ...prev]);
        router.replace("/");
        toast.success("Todo created");
      } catch {
        toast.error("Something went wrong. Please try again.");
      }
    });
  };

  return (
    <form className={`flex flex-col ${className}`} onSubmit={onSubmit}>
      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <p className="mb-1 ml-1 font-semibold">Title</p>
          <Input
            type="text"
            placeholder="..."
            value={todoInput.title}
            onChange={(e) => {
              setTodoInput((prev) => ({
                ...prev,
                title: e.target.value,
              }));
            }}
            suppressHydrationWarning
          />
        </div>

        <div>
          <p className="mb-1 ml-1 font-semibold">Status</p>
          <Select
            defaultValue="PENDING"
            onValueChange={(value: $Enums.TodoStatus) => {
              setTodoInput((prev) => ({ ...prev, status: value }));
            }}
          >
            <SelectTrigger className="w-full cursor-pointer">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="PENDING">Pending</SelectItem>
                <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
                <SelectItem value="COMPLETED">Completed</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div>
          <p className="mb-1 ml-1 font-semibold">Category</p>
          <Select
            defaultValue="WORK"
            onValueChange={(value: $Enums.Category) => {
              setTodoInput((prev) => ({ ...prev, category: value }));
            }}
          >
            <SelectTrigger className="w-full cursor-pointer">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="WORK">Work</SelectItem>
                <SelectItem value="PERSONAL">Personal</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div>
          <p className="mb-1 ml-1 font-semibold">Priority</p>
          <Select
            defaultValue="MEDIUM"
            onValueChange={(value: $Enums.Priority) => {
              setTodoInput((prev) => ({ ...prev, priority: value }));
            }}
          >
            <SelectTrigger className="w-full cursor-pointer">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="HIGH">High</SelectItem>
                <SelectItem value="MEDIUM">Medium</SelectItem>
                <SelectItem value="LOW">Low</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      <LoadingButton
        loading={isPending}
        type="submit"
        className="mt-5 sm:mt-3 sm:ml-auto sm:w-20"
        title="Add this todo to your list"
      >
        Save
      </LoadingButton>
    </form>
  );
}

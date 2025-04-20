"use client";

import { useState, useTransition } from "react";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { createTodo } from "@/lib/actions";
import { $Enums } from "@prisma/client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import LoadingButton from "./LoadingButton";

interface AddTodoFormProps {
  className?: string;
}

type TodoInput = {
  title: string;
  category: $Enums.Category;
  status: $Enums.TodoStatus;
  priority: $Enums.Priority;
};

export default function AddTodoForm({ className }: AddTodoFormProps) {
  const [todoInput, setTodoInput] = useState<TodoInput>({
    title: "",
    category: $Enums.Category.WORK,
    status: $Enums.TodoStatus.PENDING,
    priority: $Enums.Priority.MEDIUM,
  });

  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (todoInput.title.trim() === "") return;

    startTransition(async () => {
      try {
        await createTodo(todoInput);
        router.replace("/");
        toast("Todo created");
      } catch {
        toast.error("Failed to create todo");
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
        Add
      </LoadingButton>
    </form>
  );
}

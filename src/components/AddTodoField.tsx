"use client";

import { useState } from "react";
import { Button } from "./ui/button";
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

// import { useSession } from "next-auth/react";

interface AddTodoFieldProps {
  className?: string;
}

type TodoInput = {
  title: string;
  status: $Enums.TodoStatus;
};

export default function AddTodoField({ className }: AddTodoFieldProps) {
  //   const { data: session } = useSession();
  const [todoInput, setTodoInput] = useState<TodoInput>({
    title: "",
    status: $Enums.TodoStatus.PENDING,
  });

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createTodo(todoInput);
  };

  return (
    <form
      className={`flex flex-col gap-2 sm:flex-row ${className}`}
      onSubmit={onSubmit}
    >
      <Input
        type="text"
        placeholder="Add a new todo..."
        value={todoInput.title}
        onChange={(e) => {
          setTodoInput((prev) => ({
            ...prev,
            title: e.target.value,
          }));
        }}
        suppressHydrationWarning
      />
      <div className="flex gap-2">
        <Select
          defaultValue="PENDING"
          onValueChange={(value: $Enums.TodoStatus) => {
            setTodoInput((prev) => ({ ...prev, status: value }));
          }}
        >
          <SelectTrigger className="w-3/5 cursor-pointer sm:w-32">
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
        <Button type="submit" className="flex-grow text-white sm:w-20">
          Add
        </Button>
      </div>
    </form>
  );
}

"use client";

import { Todo as TodoType } from "@prisma/client";
import { useState } from "react";
import Todo from "./Todo";

interface TodoListProps {
  todosArray: TodoType[] | undefined;
  className?: string;
}

export default function TodoList({ todosArray, className }: TodoListProps) {
  const [todos] = useState<TodoType[]>(todosArray || []);

  return (
    <div className={`space-y-2 ${className}`}>
      {todos.map((todo) => (
        <Todo key={todo.id} todo={todo} />
      ))}
    </div>
  );
}

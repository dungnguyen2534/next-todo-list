"use client";

import { Todo } from "@prisma/client";
import { createContext, useContext, useState } from "react";

interface TodoContextType {
  contextTodos: Todo[];
  setContextTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  isLoaded: boolean;
  setIsLoaded: React.Dispatch<React.SetStateAction<boolean>>;
}

const TodoContext = createContext<TodoContextType | null>(null);

export function TodoContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [contextTodos, setContextTodos] = useState<Todo[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <TodoContext.Provider
      value={{ contextTodos, setContextTodos, isLoaded, setIsLoaded }}
    >
      {children}
    </TodoContext.Provider>
  );
}

export function useTodoContext() {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error("useTodoContext must be used within a TodoContextProvider");
  }
  return context;
}

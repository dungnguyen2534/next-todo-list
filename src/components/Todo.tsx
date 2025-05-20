"use client";

import { $Enums, Todo as TodoType } from "@prisma/client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useTodoContext } from "@/app/todo-context";
import { useState } from "react";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Input } from "./ui/input";
import { TodoInput } from "@/types/type";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Button } from "./ui/button";
import { TodoLabels } from "./TodoLabels";
import { Ellipsis } from "lucide-react";
import { toast } from "sonner";

interface TodoProps {
  todo: TodoType;
}

export default function Todo({ todo }: TodoProps) {
  const { contextTodos, setContextTodos } = useTodoContext();
  const [isUpdating, setIsUpdating] = useState(false);
  const [isOpenDialog, setIsOpenDialog] = useState(false);

  const [editTodoInput, setEditTodoInput] = useState<TodoInput>({
    title: todo.title,
    category: todo.category,
    status: todo.status,
    priority: todo.priority,
  });

  async function handleEdit(updatedFields: Partial<TodoType>) {
    if (isUpdating) return; // Prevent spamming
    setIsUpdating(true);
    const prevTodos = contextTodos;
    const prevTargetTodoInfo = editTodoInput;

    setContextTodos((prev) => {
      return prev.map((t) =>
        t.id === todo.id ? { ...t, ...updatedFields } : t,
      );
    });

    setEditTodoInput((prev) => ({ ...prev, ...updatedFields }));
    setIsOpenDialog(false);

    const res = await fetch(`/api/todos/${todo.id}`, {
      method: "PATCH",
      body: JSON.stringify({
        ...todo,
        ...updatedFields,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    setIsUpdating(false);
    if (!res.ok) {
      setContextTodos(prevTodos);
      setEditTodoInput(prevTargetTodoInfo);
      return;
    }
  }

  async function handleDelete() {
    const prevTodos = contextTodos;
    setContextTodos((todos) => todos.filter((t) => t.id !== todo.id));

    const res = await fetch(`/api/todos/${todo.id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      setContextTodos(prevTodos);
      toast.error("Failed to delete todo.");
    }
  }

  const onFormEditSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (editTodoInput.title.trim() === "") return;
    handleEdit(editTodoInput);
  };

  return (
    <div className="hover:border-primary relative flex flex-col justify-between rounded-md border-1 px-2 py-1">
      <div>
        <Dialog open={isOpenDialog} onOpenChange={setIsOpenDialog}>
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger className="text-muted-foreground hover:bg-accent absolute top-1 right-3 cursor-pointer rounded-full p-1 transition-colors duration-100">
              <Ellipsis />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <div className="[&>*]:cursor-pointer">
                {/* Status */}
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>Status</DropdownMenuSubTrigger>
                  <DropdownMenuPortal>
                    <DropdownMenuSubContent>
                      <DropdownMenuRadioGroup
                        value={todo.status}
                        className="[&>*]:cursor-pointer"
                      >
                        <DropdownMenuRadioItem
                          value="PENDING"
                          onClick={() => handleEdit({ status: "PENDING" })}
                        >
                          Pending
                        </DropdownMenuRadioItem>
                        <DropdownMenuRadioItem
                          value="IN_PROGRESS"
                          onClick={() => handleEdit({ status: "IN_PROGRESS" })}
                        >
                          In Progress
                        </DropdownMenuRadioItem>
                        <DropdownMenuRadioItem
                          value="COMPLETED"
                          onClick={() => handleEdit({ status: "COMPLETED" })}
                        >
                          Completed
                        </DropdownMenuRadioItem>
                      </DropdownMenuRadioGroup>
                    </DropdownMenuSubContent>
                  </DropdownMenuPortal>
                </DropdownMenuSub>
                {/* Priority */}
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>Priority</DropdownMenuSubTrigger>
                  <DropdownMenuPortal>
                    <DropdownMenuSubContent>
                      <DropdownMenuRadioGroup
                        value={todo.priority}
                        className="[&>*]:cursor-pointer"
                      >
                        <DropdownMenuRadioItem
                          value="HIGH"
                          onClick={() => handleEdit({ priority: "HIGH" })}
                        >
                          High
                        </DropdownMenuRadioItem>
                        <DropdownMenuRadioItem
                          value="MEDIUM"
                          onClick={() => handleEdit({ priority: "MEDIUM" })}
                        >
                          Medium
                        </DropdownMenuRadioItem>
                        <DropdownMenuRadioItem
                          value="LOW"
                          onClick={() => handleEdit({ priority: "LOW" })}
                        >
                          Low
                        </DropdownMenuRadioItem>
                      </DropdownMenuRadioGroup>
                    </DropdownMenuSubContent>
                  </DropdownMenuPortal>
                </DropdownMenuSub>
                {/* Category */}
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>Category</DropdownMenuSubTrigger>
                  <DropdownMenuPortal>
                    <DropdownMenuSubContent>
                      <DropdownMenuRadioGroup
                        value={todo.category}
                        className="[&>*]:cursor-pointer"
                      >
                        <DropdownMenuRadioItem
                          value="WORK"
                          onClick={() => handleEdit({ category: "WORK" })}
                        >
                          Work
                        </DropdownMenuRadioItem>
                        <DropdownMenuRadioItem
                          value="PERSONAL"
                          onClick={() => handleEdit({ category: "PERSONAL" })}
                        >
                          Personal
                        </DropdownMenuRadioItem>
                      </DropdownMenuRadioGroup>
                    </DropdownMenuSubContent>
                  </DropdownMenuPortal>
                </DropdownMenuSub>
              </div>
              <DropdownMenuSeparator />
              <div className="[&>*]:cursor-pointer">
                <DialogTrigger asChild>
                  <DropdownMenuItem>Edit</DropdownMenuItem>
                </DialogTrigger>
                <DropdownMenuItem onClick={handleDelete}>
                  Delete
                </DropdownMenuItem>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Edit dialog */}
          <DialogContent className="!w-full">
            <DialogTitle hidden className="text-xl">
              Edit todo
            </DialogTitle>
            <form className="flex flex-col" onSubmit={onFormEditSubmit}>
              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <p className="mb-1 ml-1 font-semibold">Title</p>
                  <Input
                    type="text"
                    placeholder="..."
                    value={editTodoInput.title}
                    onChange={(e) => {
                      setEditTodoInput((prev) => ({
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
                    defaultValue={editTodoInput.status}
                    onValueChange={(value: $Enums.TodoStatus) => {
                      setEditTodoInput((prev) => ({ ...prev, status: value }));
                    }}
                  >
                    <SelectTrigger className="w-full cursor-pointer">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup className="[&>*]:hover:bg-accent [&>*]:cursor-pointer">
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
                    defaultValue={editTodoInput.category}
                    onValueChange={(value: $Enums.Category) => {
                      setEditTodoInput((prev) => ({
                        ...prev,
                        category: value,
                      }));
                    }}
                  >
                    <SelectTrigger className="w-full cursor-pointer">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup className="[&>*]:hover:bg-accent [&>*]:cursor-pointer">
                        <SelectItem value="WORK">Work</SelectItem>
                        <SelectItem value="PERSONAL">Personal</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <p className="mb-1 ml-1 font-semibold">Priority</p>
                  <Select
                    defaultValue={editTodoInput.priority}
                    onValueChange={(value: $Enums.Priority) => {
                      setEditTodoInput((prev) => ({
                        ...prev,
                        priority: value,
                      }));
                    }}
                  >
                    <SelectTrigger className="w-full cursor-pointer">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup className="[&>*]:hover:bg-accent [&>*]:cursor-pointer">
                        <SelectItem value="HIGH">High</SelectItem>
                        <SelectItem value="MEDIUM">Medium</SelectItem>
                        <SelectItem value="LOW">Low</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Button
                type="submit"
                className="mt-5 sm:mt-3 sm:ml-auto sm:w-20"
                title="Add this todo to your list"
              >
                Submit
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      <p className="w-[97%] truncate pt-2 pl-3 text-gray-800 dark:text-gray-200">
        {todo.title}
      </p>
      <TodoLabels todo={todo} />
    </div>
  );
}

import { Todo as TodoType } from "@prisma/client";
import {
  Dot,
  MoveDown,
  MoveHorizontal,
  MoveUp,
  BriefcaseBusiness,
  CircleUserRound,
} from "lucide-react";

const statusLabels: Record<TodoType["status"], React.ReactNode> = {
  PENDING: (
    <div>
      <Dot className="mt-[0.1rem]" size={36} color="#ff8800" strokeWidth={3} />{" "}
      Pending
    </div>
  ),
  IN_PROGRESS: (
    <div>
      <Dot className="mt-[0.1rem]" size={36} color="#0062ff" strokeWidth={3} />{" "}
      In progress
    </div>
  ),
  COMPLETED: (
    <div>
      <Dot className="mt-[0.1rem]" size={36} color="#00ff11" strokeWidth={3} />{" "}
      Completed
    </div>
  ),
};

const priorityLabels: Record<TodoType["priority"], React.ReactNode> = {
  LOW: (
    <div>
      <MoveDown size={12} strokeWidth={3} /> Low
    </div>
  ),
  MEDIUM: (
    <div>
      <MoveHorizontal size={12} strokeWidth={3} /> Medium
    </div>
  ),
  HIGH: (
    <div>
      <MoveUp size={12} strokeWidth={3} /> High
    </div>
  ),
};

const categoryLabels: Record<TodoType["category"], React.ReactNode> = {
  WORK: (
    <div>
      <BriefcaseBusiness size={15} className="mt-[0.1rem]" /> Work
    </div>
  ),
  PERSONAL: (
    <div>
      <CircleUserRound size={16} className="mt-[0.1rem]" /> Personal
    </div>
  ),
};

export function TodoLabels({ todo }: { todo: TodoType }) {
  return (
    <div className="text-muted-foreground grid grid-cols-3 items-center gap-3 text-xs sm:w-3/4 sm:text-sm">
      <div className="[&>*]:flex [&>*]:items-center">
        {statusLabels[todo.status]}
      </div>
      <div className="ml-2 sm:ml-0 [&>*]:flex [&>*]:items-center [&>*]:gap-2">
        {priorityLabels[todo.priority]}
      </div>
      <div className="[&>*]:flex [&>*]:items-center [&>*]:gap-1">
        {categoryLabels[todo.category]}
      </div>
    </div>
  );
}

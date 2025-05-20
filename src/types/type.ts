import { $Enums } from "@prisma/client";

export type TodoInput = {
  title: string;
  category: $Enums.Category;
  status: $Enums.TodoStatus;
  priority: $Enums.Priority;
};

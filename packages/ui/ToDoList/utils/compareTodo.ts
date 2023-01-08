import { Todo } from "../ToDoList.types";

export const compareTodo =
  ({ desc }: { desc?: boolean }) =>
  (a: Todo, b: Todo) => {
    const direction = desc ? -1 : 1;

    if (a.value === b.value) return 0;

    return (a.value > b.value ? 1 : -1) * direction;
  };

export interface Todo {
  id: string;
  value: string;
}

export interface TodoFormValues {
  newTodo: string;
  todos: Todo[];
}

export type DirtyState = Record<string, boolean>;

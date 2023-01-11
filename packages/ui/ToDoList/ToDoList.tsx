import React, { FC } from "react";
import { useQuery } from "react-query";
import { getStorageItem } from "./utils/getStorageItem";
import { Todo } from "./ToDoList.types";
import ToDoListContent from "./ToDoListContent";

const ToDoList: FC = () => {
  const { data: todos } = useQuery("getTodosFromLocalStorage", async () => {
    return await getStorageItem<Todo[]>({
      key: "todos",
      defaultValue: [],
    });
  });

  if (!todos) {
    return <></>;
  }

  return <ToDoListContent initialTodos={todos} />;
};

ToDoList.displayName = "ToDoList";

export default ToDoList;

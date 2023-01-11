import React, { FC, useState } from "react";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import { FormControl, List, TextField, Tooltip } from "@mui/material";
import { v4 } from "uuid";
import IconButton from "@mui/material/IconButton";
import SortByAlphaIcon from "@mui/icons-material/SortByAlpha";

import { setStorageItem } from "./utils/setStorageItem";
import { DirtyState, Todo, TodoFormValues } from "./ToDoList.types";
import { $ListItem } from "./ToDoListContent.styles";
import { compareTodo } from "./utils/compareTodo";
import EmptyTodoPlaceholder from "./EmptyTodoPlaceholder";
import TodoItem from "./TodoItem/TodoItem";

const ToDoListContent: FC<{ initialTodos: Todo[] }> = ({ initialTodos }) => {
  const [desc, setDesc] = useState<boolean | undefined>(undefined);
  const formContext = useForm<TodoFormValues>({
    defaultValues: {
      newTodo: "",
      todos: initialTodos,
    },
    shouldUnregister: false,
  });
  const [dirtyState, setDirtyState] = useState<DirtyState>({});

  const {
    setValue,
    getValues,
    register,
    handleSubmit,
    formState: { errors },
    control,
    resetField,
  } = formContext;
  const { fields, prepend, remove } = useFieldArray({
    keyName: "id",
    control,
    name: "todos",
  });

  const onSubmit = handleSubmit(async (data) => {
    prepend({ id: v4(), value: data.newTodo });
    resetField("newTodo");

    setStorageItem({
      key: "todos",
      value: getValues("todos"),
    });
  });

  const handleDeleteTodo = (index: number) => {
    remove(index);
    setStorageItem({
      key: "todos",
      value: getValues("todos").filter((todo, i) => i !== index),
    });
  };

  const handleToggleSortTodos = () => {
    setValue("todos", getValues("todos").sort(compareTodo({ desc: !desc })));
    setDesc(!desc);
  };

  const handleDirtyStateChange = ({
    fieldName,
    isDirty,
  }: {
    fieldName: string;
    isDirty: boolean;
  }) => {
    setDirtyState({ ...dirtyState, [fieldName]: isDirty });
  };

  return (
    <FormProvider {...formContext}>
      <form onSubmit={onSubmit}>
        <$ListItem
          secondaryAction={
            <Tooltip title="Sort todo alphabetically">
              <IconButton edge="end" onClick={() => handleToggleSortTodos()}>
                <SortByAlphaIcon />
              </IconButton>
            </Tooltip>
          }
        >
          <FormControl fullWidth>
            <TextField
              fullWidth
              label="Type your todo then press {ENTER}"
              {...register("newTodo", { required: true })}
              error={!!errors.newTodo}
              autoFocus
            />
          </FormControl>
        </$ListItem>
      </form>

      <List>
        {fields.map((todo, index) => {
          return (
            <TodoItem
              key={todo.id}
              index={index}
              onDeleteTodo={() => handleDeleteTodo(index)}
              dirtyState={dirtyState}
              onDirtyStateChange={handleDirtyStateChange}
            />
          );
        })}

        {fields.length === 0 && <EmptyTodoPlaceholder />}
      </List>
    </FormProvider>
  );
};

ToDoListContent.displayName = "ToDoListContent";

export default ToDoListContent;

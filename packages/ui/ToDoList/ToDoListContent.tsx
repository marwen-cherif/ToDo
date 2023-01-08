import React, { FC, useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  FormControl,
  FormHelperText,
  InputAdornment,
  List,
  TextField,
} from "@mui/material";
import { v4 } from "uuid";
import IconButton from "@mui/material/IconButton";
import SaveIcon from "@mui/icons-material/Save";
import SortByAlphaIcon from "@mui/icons-material/SortByAlpha";

import { setStorageItem } from "./utils/setStorageItem";
import { Todo } from "./ToDoList.types";
import { $ListItem } from "./ToDoListContent.styles";
import { compareTodo } from "./utils/compareTodo";
import EmptyTodoPlaceholder from "./EmptyTodoPlaceholder";

const ToDoListContent: FC<{ initialTodos: Todo[] }> = ({ initialTodos }) => {
  const [desc, setDesc] = useState<boolean | undefined>(undefined);
  const formContext = useForm<{ newTodo: string; todos: Todo[] }>({
    defaultValues: {
      newTodo: "",
      todos: initialTodos,
    },
  });
  const [dirtyState, setDirtyState] = useState<Record<string, boolean>>({});

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

  return (
    <>
      <form onSubmit={onSubmit}>
        <$ListItem
          secondaryAction={
            <IconButton edge="end" onClick={() => handleToggleSortTodos()}>
              <SortByAlphaIcon />
            </IconButton>
          }
        >
          <FormControl fullWidth>
            <TextField
              fullWidth
              label="Type your todo then press {ENTER}"
              {...register("newTodo")}
              autoFocus
              helperText={
                errors.newTodo && (
                  <FormHelperText error>
                    {errors.newTodo.message}
                  </FormHelperText>
                )
              }
            />
          </FormControl>
        </$ListItem>
      </form>

      <List>
        {fields.map((todo, index) => {
          return (
            <$ListItem
              key={todo.id}
              secondaryAction={
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => handleDeleteTodo(index)}
                >
                  <DeleteIcon />
                </IconButton>
              }
            >
              <Controller
                control={control}
                render={({ field }) => {
                  const isDirty = dirtyState[field.name];
                  return (
                    <TextField
                      fullWidth
                      InputProps={
                        isDirty
                          ? {
                              endAdornment: (
                                <InputAdornment position="end">
                                  <IconButton
                                    edge="end"
                                    onClick={() => {
                                      setStorageItem({
                                        key: "todos",
                                        value: getValues("todos"),
                                      });
                                      setDirtyState({
                                        ...dirtyState,
                                        [field.name]: false,
                                      });
                                    }}
                                  >
                                    <SaveIcon color="success" />
                                  </IconButton>
                                </InputAdornment>
                              ),
                            }
                          : undefined
                      }
                      value={field.value}
                      onChange={(e) => {
                        if (!isDirty) {
                          setDirtyState({ ...dirtyState, [field.name]: true });
                        }

                        field.onChange(e);
                      }}
                      onBlur={field.onBlur}
                    />
                  );
                }}
                name={`todos.${index}.value`}
              />
            </$ListItem>
          );
        })}

        {fields.length === 0 && <EmptyTodoPlaceholder />}
      </List>
    </>
  );
};

ToDoListContent.displayName = "ToDoListContent";

export default ToDoListContent;

import React, { FC, useEffect, useRef, useState } from "react";
import { $ListItem } from "../ToDoListContent.styles";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { Controller, useFormContext } from "react-hook-form";
import { TextField, Tooltip, Typography, Zoom } from "@mui/material";
import { setStorageItem } from "../utils/setStorageItem";
import DeleteTodoConfirmDialog from "./DeleteTodoConfirmDialog/DeleteTodoConfirmDialog";
import { DirtyState, TodoFormValues } from "../ToDoList.types";
import { $DisplayTodoItem } from "./TodoItem.styles";

interface TodoItemProps {
  index: number;
  onDeleteTodo: () => void;
  dirtyState: DirtyState;
  onDirtyStateChange: ({
    fieldName,
    isDirty,
  }: {
    fieldName: string;
    isDirty: boolean;
  }) => void;
}

const TodoItem: FC<TodoItemProps> = ({
  index,
  onDeleteTodo,
  dirtyState,
  onDirtyStateChange,
}) => {
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [isEditModeActive, setIsEditModeActive] = useState(false);
  const formContext = useFormContext<TodoFormValues>();
  const { control, getValues } = formContext;

  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditModeActive && ref.current) {
      ref.current.focus();
    }
  }, [isEditModeActive]);

  return (
    <Zoom in style={{ transitionDelay: "150ms" }}>
      <$ListItem
        secondaryAction={
          <Tooltip title="Delete">
            <IconButton
              edge="end"
              aria-label="delete"
              onClick={() => setIsConfirmDialogOpen(true)}
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        }
      >
        <Controller
          control={control}
          render={({ field }) => {
            const isDirty = dirtyState[field.name];
            return (
              <>
                {isEditModeActive && (
                  <TextField
                    fullWidth
                    value={field.value}
                    onChange={(e) => {
                      if (!isDirty) {
                        onDirtyStateChange({
                          fieldName: field.name,
                          isDirty: true,
                        });
                      }

                      field.onChange(e);
                    }}
                    onBlur={() => {
                      onDirtyStateChange({
                        fieldName: field.name,
                        isDirty: false,
                      });
                      setStorageItem({
                        key: "todos",
                        value: getValues("todos"),
                      });

                      setIsEditModeActive(false);

                      field.onBlur();
                    }}
                    inputRef={ref}
                  />
                )}
                {!isEditModeActive && (
                  <$DisplayTodoItem
                    onClick={() => {
                      setIsEditModeActive(true);

                      onDirtyStateChange({
                        fieldName: field.name,
                        isDirty: true,
                      });
                    }}
                  >
                    <Typography variant="body1" gutterBottom>
                      {field.value}
                    </Typography>
                  </$DisplayTodoItem>
                )}
              </>
            );
          }}
          name={`todos.${index}.value`}
        />

        <DeleteTodoConfirmDialog
          isOpen={isConfirmDialogOpen}
          onConfirm={() => {
            setIsConfirmDialogOpen(false);
            onDeleteTodo();
          }}
          onCancel={() => {
            setIsConfirmDialogOpen(false);
          }}
        />
      </$ListItem>
    </Zoom>
  );
};

TodoItem.displayName = "TodoItem";

export default TodoItem;

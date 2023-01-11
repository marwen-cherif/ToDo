import React, { FC } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { Button } from "../../../Button/Button";

interface DeleteTodoConfirmDialogProps {
  isOpen: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

const DeleteTodoConfirmDialog: FC<DeleteTodoConfirmDialogProps> = ({
  isOpen,
  onCancel,
  onConfirm,
}) => {
  return (
    <Dialog
      open={isOpen}
      onClose={onCancel}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{"Do you confirm ?"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          The todo will be deleted permanently, do you confirm ?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => onCancel()}>Cancel</Button>
        <Button onClick={() => onConfirm()} color="error" autoFocus>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

DeleteTodoConfirmDialog.displayName = "DeleteTodoConfirmDialog";

export default DeleteTodoConfirmDialog;

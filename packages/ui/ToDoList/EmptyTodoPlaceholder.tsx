import React, { FC } from "react";
import { ListItem } from "@mui/material";
import Typography from "@mui/material/Typography";

const EmptyTodoPlaceholder: FC = () => {
  return (
    <ListItem key="empty">
      <Typography
        variant="h6"
        component="div"
        sx={{ flexGrow: 1, textAlign: "center" }}
      >
        You have no remaining todo, Good job !
      </Typography>
    </ListItem>
  );
};

EmptyTodoPlaceholder.displayName = "EmptyTodoPlaceholder";

export default EmptyTodoPlaceholder;

import ProtectedRoute from "../components/ProtectedRoute";
import React from "react";
import ToDoList from "ui/ToDoList/ToDoList";

function Web() {
  return (
    <ProtectedRoute>
      <ToDoList />
    </ProtectedRoute>
  );
}

export default Web;

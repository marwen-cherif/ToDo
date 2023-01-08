import { Button } from "ui";
import ProtectedRoute from "../components/ProtectedRoute";

function Web() {
  return (
    <ProtectedRoute>
      <h1>Web</h1>
      <Button />
    </ProtectedRoute>
  );
}

export default Web;

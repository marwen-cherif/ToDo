import React, { FC, PropsWithChildren } from "react";
import AppBar from "./AppBar";
import { useAuth } from "../../context/AuthContext";
import { Container } from "@mui/material";

const Layout: FC<PropsWithChildren> = ({ children }) => {
  const { user } = useAuth();

  return (
    <>
      {user?.uid && <AppBar />}
      <Container maxWidth="sm">{children}</Container>
    </>
  );
};

Layout.displayName = "Layout";

export default Layout;

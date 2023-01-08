import React, { FC, PropsWithChildren } from "react";
import { Container } from "@mui/material";

import AppBar from "ui/AppBar/AppBar";
import { useAuth } from "../../context/AuthContext";

const Layout: FC<PropsWithChildren> = ({ children }) => {
  const { user, logOut } = useAuth();

  if (!user) {
    return <></>;
  }

  return (
    <>
      {user?.email && (
        <AppBar
          onLogout={async () => {
            await logOut();
          }}
        />
      )}
      {user && <Container maxWidth="sm">{children}</Container>}
    </>
  );
};

Layout.displayName = "Layout";

export default Layout;

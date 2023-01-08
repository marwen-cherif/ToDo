import React, { FC } from "react";
import { useQuery } from "react-query";
import { Avatar } from "@mui/material";

const UserAvatar: FC = () => {
  const { data: imageUrl } = useQuery("getRandomUser", async () => {
    const response = await fetch("https://randomuser.me/api/");

    const { results } = await response.json();

    return results?.at(0).picture.large;
  });

  return <Avatar alt={imageUrl} src={imageUrl} />;
};

UserAvatar.displayName = "UserAvatar";

export default UserAvatar;

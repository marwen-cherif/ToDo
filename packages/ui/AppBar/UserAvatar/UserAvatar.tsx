import React, { FC } from "react";
import { Avatar } from "@mui/material";
import { useGetRandomUserImageUrl } from "./useGetRandomUserImageUrl";

const UserAvatar: FC = () => {
  const imageUrl = useGetRandomUserImageUrl();

  return <Avatar alt={imageUrl} src={imageUrl} />;
};

UserAvatar.displayName = "UserAvatar";

export default UserAvatar;

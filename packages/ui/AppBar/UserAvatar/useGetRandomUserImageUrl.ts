import { useQuery } from "react-query";

export const useGetRandomUserImageUrl = () => {
  const { data: imageUrl } = useQuery("getRandomUser", async () => {
    const response = await fetch("https://randomuser.me/api/");

    const { results } = await response.json();

    return results?.at(0).picture.large;
  });

  return imageUrl;
};

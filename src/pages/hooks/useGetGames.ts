import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { gamesKeys } from "./queryKeys";
import { GamesApiResponse } from "../types/games";

export const apiKey = "c3a8420f4b8c4fc19ce9828a7773deee";

interface IgetGamesFn {
  pageParam: number;
  search?: string;
  platform?: string;
  genre?: string;
}

export const getGamesFn = async ({
  pageParam = 1,
  search,
  platform,
  genre,
}: IgetGamesFn) => {
  const params = new URLSearchParams();

  params.append("page", pageParam.toString());

  params.append("page_size", "16");

  if (search) {
    params.append("search", search);
  }

  if (platform) {
    params.append("platforms", platform);
  }

  if (genre) {
    params.append("genres", genre);
  }

  const response = await axios.get<GamesApiResponse>(
    `https://api.rawg.io/api/games?key=${apiKey}`,
    {
      params,
    },
  );

  return response.data;
};

interface IuseGetGames {
  page: number;
  search: string;
  platform: string;
  genre: string;
}

export const useGetGames = ({
  page,
  search,
  platform,
  genre,
}: IuseGetGames) => {
  return useInfiniteQuery({
    queryKey: gamesKeys.list({
      page,
      search,
      platform,
      genre,
    }),
    queryFn: ({ pageParam = 1 }) =>
      getGamesFn({ pageParam, search, platform, genre }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages, lastPageParam, allPagesParams) => {
      console.log({ lastPage, allPages, lastPageParam, allPagesParams });
      return lastPage.next ? lastPageParam + 1 : undefined;
    },
  });
};

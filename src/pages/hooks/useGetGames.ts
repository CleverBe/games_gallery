import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { gamesKeys } from "./queryKeys";
import { GamesApiResponse } from "../types/games";

export const apiKey = "c3a8420f4b8c4fc19ce9828a7773deee";

interface IgetGamesFn {
  page: number;
  page_size: number;
  search: string;
  platform: string;
  genre: string;
}

export const getGamesFn = async ({
  page = 1,
  page_size = 10,
  search = "",
  platform = "",
  genre = "",
}: IgetGamesFn) => {
  const params = new URLSearchParams();

  params.append("page", page.toString());

  params.append("page_size", page_size.toString());

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
  pageSize: number;
  search: string;
  platform: string;
  genre: string;
}

export const useGetGames = ({
  page,
  pageSize,
  search,
  platform,
  genre,
}: IuseGetGames) => {
  return useQuery({
    queryKey: gamesKeys.list({
      page,
      page_size: pageSize,
      search,
      platform,
      genre,
    }),
    queryFn: () =>
      getGamesFn({
        page,
        page_size: pageSize,
        search,
        platform,
        genre,
      }),
  });
};

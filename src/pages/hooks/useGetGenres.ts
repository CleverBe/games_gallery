import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { genresKeys } from "./queryKeys";
import { apiKey } from "./useGetGames";
import { GenresApiResponse } from "../types/genres";

export const getGenresFn = async () => {
  const response = await axios.get<GenresApiResponse>(
    `https://api.rawg.io/api/genres?key=${apiKey}`,
  );

  return response.data;
};

export const useGetGenres = () => {
  return useQuery({
    queryKey: genresKeys.list(),
    queryFn: () => getGenresFn(),
  });
};

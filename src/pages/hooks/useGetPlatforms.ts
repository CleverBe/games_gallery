import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { platformsKeys } from "./queryKeys";
import { PlatformsApiResponse } from "../types/platforms";
import { apiKey } from "./useGetGames";

export const getPlatformsFn = async () => {
  const response = await axios.get<PlatformsApiResponse>(
    `https://api.rawg.io/api/platforms?key=${apiKey}`,
  );

  return response.data;
};

export const useGetPlatforms = () => {
  return useQuery({
    queryKey: platformsKeys.list(),
    queryFn: () => getPlatformsFn(),
  });
};

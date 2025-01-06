import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { platformsKeys } from "./queryKeys";
import { PlatformsApiResponse } from "../types/platforms";

export const apiKey = "c3a8420f4b8c4fc19ce9828a7773deee";

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

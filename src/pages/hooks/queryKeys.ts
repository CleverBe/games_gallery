interface IGameKeysList {
  page: number;
  page_size: number;
  search: string;
  platform: string;
  genre: string;
}

export const gamesKeys = {
  all: ["games"] as const,
  list: ({ page, page_size, search, platform, genre }: IGameKeysList) =>
    [
      ...gamesKeys.all,
      "list",
      {
        page,
        page_size,
        search,
        platform,
        genre,
      },
    ] as const,
};

export const platformsKeys = {
  all: ["platforms"] as const,
  list: () => [...platformsKeys.all, "list"] as const,
};

export const genresKeys = {
  all: ["genres"] as const,
  list: () => [...genresKeys.all, "list"] as const,
};

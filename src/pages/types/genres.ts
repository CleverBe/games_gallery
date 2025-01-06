export interface GenresApiResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Result[];
}

export interface Result {
  id: number;
  name: string;
  slug: string;
  games_count: number;
  image_background: string;
  games: Game[];
}

export interface Game {
  id: number;
  slug: string;
  name: string;
  added: number;
}

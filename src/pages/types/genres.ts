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
  games: GenGame[];
}

export interface GenGame {
  id: number;
  slug: string;
  name: string;
  added: number;
}

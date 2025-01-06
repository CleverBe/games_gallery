export interface PlatformsApiResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Result[];
}

export interface Result {
  id: number;
  name: string;
  slug: string;
  platforms: Platform[];
}

export interface Platform {
  id: number;
  name: string;
  slug: string;
  games_count: number;
  image_background: string;
  image: unknown;
  year_start?: number;
  year_end: unknown;
}

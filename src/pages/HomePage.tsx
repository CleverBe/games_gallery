import { useGetGames } from "./hooks/useGetGames";
import { GameCardSkeleton } from "./components/GameCard";
import { useEffect, useState } from "react";
import { useGetPlatforms } from "./hooks/useGetPlatforms";
import { useGetGenres } from "./hooks/useGetGenres";
import { GameModal } from "./components/GameModal";
import { Game } from "./types/games";
import { LoadMoreTrigger } from "./components/LoadMoreTrigger";
import { GameFilters } from "./components/GameFilters";
import { GamesList } from "./components/GamesList";

export const HomePage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [search, setSearch] = useState("");
  const [platform, setPlatform] = useState("");
  const [genre, setGenre] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState(search);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => clearTimeout(handler);
  }, [search]);

  const {
    data: games,
    isLoading,
    isError,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useGetGames({
    page: 1,
    search: debouncedSearch,
    platform,
    genre,
  });

  const flattenedGames = games?.pages.flatMap((page) => page.results) || [];

  const { data: platforms } = useGetPlatforms();

  const mapPlatforms =
    platforms?.results.map((p) => ({
      value: p.id.toString(),
      label: p.name,
    })) || [];

  const { data: genres } = useGetGenres();

  const mapGenres =
    genres?.results.map((g) => ({
      value: g.id.toString(),
      label: g.name,
    })) || [];

  return (
    <div>
      <div className="p-4">
        <GameFilters
          platform={platform}
          setPlatform={setPlatform}
          genre={genre}
          setGenre={setGenre}
          platforms={mapPlatforms}
          genres={mapGenres}
          search={search}
          setSearch={setSearch}
          disabled={isError}
        />
        {isError ? (
          <div className="bg-red-100 p-4 text-center text-sm text-red-500">
            Something went wrong
          </div>
        ) : (
          <GamesList
            games={flattenedGames}
            isLoading={isLoading}
            setIsOpen={setIsOpen}
            setSelectedGame={setSelectedGame}
          />
        )}
      </div>

      {hasNextPage && <LoadMoreTrigger fetchNextPage={fetchNextPage} />}

      {isFetchingNextPage && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <GameCardSkeleton key={index} />
          ))}
        </div>
      )}

      {selectedGame && (
        <GameModal
          game={selectedGame}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

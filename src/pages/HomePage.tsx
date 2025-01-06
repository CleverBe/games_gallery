import { Input } from "@/components/ui/input";
import { useGetGames } from "./hooks/useGetGames";
import { GameCard, GameCardSkeleton } from "./components/GameCard";
import { useEffect, useState } from "react";
import { Combobox } from "@/components/ui/combobox";
import { useGetPlatforms } from "./hooks/useGetPlatforms";
import { useGetGenres } from "./hooks/useGetGenres";
import { GameModal } from "./components/GameModal";
import { Game } from "./types/games";

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

  const { data: games, isLoading } = useGetGames({
    page: 1,
    pageSize: 10,
    search: debouncedSearch,
    platform,
    genre,
  });

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
      <header className="flex flex-wrap items-center justify-between space-y-4 rounded-md border p-4 sm:space-y-0">
        <div className="text-3xl">GamesApp</div>
        <div className="w-full sm:w-96">
          <Input
            type="text"
            placeholder="Minecraft, Fortnite, etc"
            className="sm:w-96"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </header>
      <div className="p-4">
        <div className="mb-4 flex flex-wrap gap-4">
          <div className="flex flex-col space-y-2">
            <h2 className="px-0.5 text-xl">Platforms</h2>
            <Combobox
              value={platform}
              setValue={setPlatform}
              options={mapPlatforms}
              placeholder="Platforms"
            />
          </div>
          <div className="flex flex-col space-y-2">
            <h2 className="px-0.5 text-xl">Genres</h2>
            <Combobox
              value={genre}
              setValue={setGenre}
              options={mapGenres}
              placeholder="Genres"
            />
          </div>
        </div>
        {isLoading ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((index) => (
              <GameCardSkeleton key={index} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
            {games?.results.map((game) => (
              <GameCard
                key={game.id}
                game={game}
                onClick={() => {
                  setSelectedGame(game);
                  setIsOpen(true);
                }}
              />
            ))}
          </div>
        )}
      </div>
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

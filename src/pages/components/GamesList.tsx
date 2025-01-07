import { Game } from "../types/games";
import { GameCard, GameCardSkeleton } from "./GameCard";

interface GameCardProps {
  isLoading: boolean;
  games: Game[];
  setIsOpen: (isOpen: boolean) => void;
  setSelectedGame: (game: Game) => void;
}

export const GamesList = ({
  isLoading,
  games,
  setIsOpen,
  setSelectedGame,
}: GameCardProps) => {
  return isLoading ? (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {Array.from({ length: 8 }).map((_, index) => (
        <GameCardSkeleton key={index} />
      ))}
    </div>
  ) : games.length == 0 ? (
    <div className="flex items-center justify-center">
      <p className="text-2xl font-bold">No games found</p>
    </div>
  ) : (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {games.map((game) => (
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
  );
};

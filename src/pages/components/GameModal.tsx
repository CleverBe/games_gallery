import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Game } from "../types/games";
import { Flame, MessageCircleMore, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface GameModalProps {
  game: Game;
  isOpen: boolean;
  onClose: () => void;
}

export const GameModal = ({ game, isOpen, onClose }: GameModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-h-[calc(100vh-210px)] w-11/12 overflow-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{game.name}</DialogTitle>
          <DialogDescription>
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-0.5">
                <Star className="h-4 w-4 text-yellow-500" />
                <span className="text-sm">{game.rating}</span>
              </div>
              <div className="flex items-center space-x-0.5">
                <MessageCircleMore className="h-4 w-4" />
                <span className="text-sm">{game.ratings_count}</span>
              </div>
              <div className="flex items-center space-x-0.5">
                <Flame className="h-4 w-4 text-red-500" />
                <span className="text-sm">{game.suggestions_count}</span>
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
        <div>
          <img
            src={game.background_image}
            alt={game.name}
            className="max-h-64 w-full rounded-md object-cover object-center"
          />

          <div className="p-6">
            <h2 className="mb-4 text-xl font-bold">Game Details</h2>
            <p className="mb-4 text-lg">Release Date: {game.released}</p>
            <p className="mb-4 text-lg">Playtime: {game.playtime} hours</p>
            <p className="mb-4 text-lg">Platforms:</p>
            <div className="mb-4 flex flex-wrap gap-2 text-lg">
              {game.platforms.map((platform) => (
                <Badge key={platform.platform.id}>
                  {platform.platform.name}
                </Badge>
              ))}
            </div>
            <p className="mb-4 text-lg">Genres:</p>
            <div className="flex flex-wrap gap-2">
              {game.genres.map((genre) => (
                <Badge key={genre.id}>{genre.name}</Badge>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

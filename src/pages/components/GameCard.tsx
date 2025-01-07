import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Game } from "../types/games";
import { Flame, MessageCircleMore, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const GameCard = ({
  game,
  onClick,
}: {
  game: Game;
  onClick: () => void;
}) => {
  return (
    <Card
      className="cursor-pointer duration-300 hover:scale-105 hover:shadow-2xl"
      onClick={onClick}
    >
      <img
        src={game.background_image}
        alt={game.name}
        className="h-60 w-full rounded-t-xl object-cover object-center"
      />
      <CardHeader>
        <CardTitle>{game.name}</CardTitle>
        <CardDescription>
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-0.5">
              <Star className="h-4 w-4 text-yellow-500" />
              <span className="text-sm">{game.rating}</span>
            </div>
            <div className="flex items-center space-x-0.5">
              <MessageCircleMore className="h-4 w-4 text-white" />
              <span className="text-sm">{game.ratings_count}</span>
            </div>
            <div className="flex items-center space-x-0.5">
              <Flame className="h-4 w-4 text-red-500" />
              <span className="text-sm">{game.suggestions_count}</span>
            </div>
          </div>
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="flex flex-wrap gap-2">
          {game.genres.map((genre) => (
            <Badge key={genre.id}>{genre.name}</Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export const GameCardSkeleton = () => {
  return (
    <Card className="animate-pulse">
      <div className="h-72 w-full rounded-t-xl bg-muted" />
      <CardHeader>
        <CardTitle className="h-4 w-1/2 bg-muted" />
        <CardDescription className="h-4 w-1/2 bg-muted" />
      </CardHeader>
    </Card>
  );
};

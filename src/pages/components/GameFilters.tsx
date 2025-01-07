import { Combobox } from "@/components/ui/combobox";
import { Input } from "@/components/ui/input";

interface GameFiltersProps {
  search: string;
  setSearch: (value: string) => void;
  platform: string;
  setPlatform: (value: string) => void;
  genre: string;
  setGenre: (value: string) => void;
  platforms: { value: string; label: string }[];
  genres: { value: string; label: string }[];
  disabled: boolean;
}

export const GameFilters = ({
  platform,
  setPlatform,
  genre,
  setGenre,
  search,
  setSearch,
  platforms,
  genres,
  disabled,
}: GameFiltersProps) => {
  return (
    <div className="mb-4 flex flex-wrap gap-4">
      <div className="flex flex-col space-y-2">
        <h2 className="px-0.5 text-xl">Platforms</h2>
        <Combobox
          value={platform}
          setValue={setPlatform}
          options={platforms}
          placeholder="Platforms"
          disabled={disabled}
        />
      </div>
      <div className="flex flex-col space-y-2">
        <h2 className="px-0.5 text-xl">Genres</h2>
        <Combobox
          value={genre}
          setValue={setGenre}
          options={genres}
          placeholder="Genres"
          disabled={disabled}
        />
      </div>
      <div className="flex-1 self-end">
        <Input
          type="text"
          placeholder="Sonic, Mario, etc..."
          className="min-w-52 sm:w-96"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          disabled={disabled}
        />
      </div>
    </div>
  );
};

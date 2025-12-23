import { useState } from "react";
import { Search, MapPin, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface SearchBarProps {
  onSearch?: (query: string, location: string, radius: string) => void;
  className?: string;
}

export function SearchBar({ onSearch, className }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("");
  const [radius, setRadius] = useState("10");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(query, location, radius);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        "flex flex-col gap-2 rounded-xl border bg-card p-3 shadow-card md:flex-row md:items-center md:gap-3 md:p-2",
        className
      )}
    >
      {/* Keyword Input */}
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="text"
          placeholder="What are you looking for?"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="border-0 bg-secondary pl-10 focus-visible:ring-1"
        />
      </div>

      {/* Location Input */}
      <div className="relative flex-1 md:max-w-[200px]">
        <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Your location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="border-0 bg-secondary pl-10 focus-visible:ring-1"
        />
      </div>

      {/* Radius Selector */}
      <Select value={radius} onValueChange={setRadius}>
        <SelectTrigger className="w-full border-0 bg-secondary md:w-[120px]">
          <SelectValue placeholder="Radius" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="5">5 km</SelectItem>
          <SelectItem value="10">10 km</SelectItem>
          <SelectItem value="25">25 km</SelectItem>
          <SelectItem value="50">50 km</SelectItem>
          <SelectItem value="100">100 km</SelectItem>
        </SelectContent>
      </Select>

      {/* Search Button */}
      <Button type="submit" className="w-full md:w-auto">
        Search
      </Button>
    </form>
  );
}

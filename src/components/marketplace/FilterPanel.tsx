import { useState } from "react";
import { SlidersHorizontal, X, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

export interface Filters {
  priceMin: string;
  priceMax: string;
  condition: string;
  postedTime: string;
  distance: string;
  sellerType: string;
}

interface FilterPanelProps {
  filters: Filters;
  onFiltersChange: (filters: Filters) => void;
  className?: string;
}

export function FilterPanel({
  filters,
  onFiltersChange,
  className,
}: FilterPanelProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleChange = (key: keyof Filters, value: string) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const clearFilters = () => {
    onFiltersChange({
      priceMin: "",
      priceMax: "",
      condition: "",
      postedTime: "",
      distance: "",
      sellerType: "",
    });
  };

  const hasActiveFilters = Object.values(filters).some((v) => v !== "");

  const FilterContent = () => (
    <div className="space-y-5">
      {/* Price Range */}
      <div className="space-y-2">
        <Label className="text-sm font-medium">Price Range</Label>
        <div className="flex items-center gap-2">
          <Input
            type="number"
            placeholder="Min"
            value={filters.priceMin}
            onChange={(e) => handleChange("priceMin", e.target.value)}
            className="flex-1"
          />
          <span className="text-muted-foreground">–</span>
          <Input
            type="number"
            placeholder="Max"
            value={filters.priceMax}
            onChange={(e) => handleChange("priceMax", e.target.value)}
            className="flex-1"
          />
        </div>
      </div>

      {/* Condition */}
      <div className="space-y-2">
        <Label className="text-sm font-medium">Condition</Label>
        <Select
          value={filters.condition}
          onValueChange={(v) => handleChange("condition", v)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Any condition" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="new">New</SelectItem>
            <SelectItem value="like-new">Like New</SelectItem>
            <SelectItem value="good">Good</SelectItem>
            <SelectItem value="fair">Fair</SelectItem>
            <SelectItem value="for-parts">For Parts</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Posted Time */}
      <div className="space-y-2">
        <Label className="text-sm font-medium">Posted Within</Label>
        <Select
          value={filters.postedTime}
          onValueChange={(v) => handleChange("postedTime", v)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Any time" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1h">Last hour</SelectItem>
            <SelectItem value="24h">Last 24 hours</SelectItem>
            <SelectItem value="7d">Last 7 days</SelectItem>
            <SelectItem value="30d">Last 30 days</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Distance */}
      <div className="space-y-2">
        <Label className="text-sm font-medium">Distance</Label>
        <Select
          value={filters.distance}
          onValueChange={(v) => handleChange("distance", v)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Any distance" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="5">Within 5 km</SelectItem>
            <SelectItem value="10">Within 10 km</SelectItem>
            <SelectItem value="25">Within 25 km</SelectItem>
            <SelectItem value="50">Within 50 km</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Seller Type */}
      <div className="space-y-2">
        <Label className="text-sm font-medium">Seller Type</Label>
        <Select
          value={filters.sellerType}
          onValueChange={(v) => handleChange("sellerType", v)}
        >
          <SelectTrigger>
            <SelectValue placeholder="All sellers" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="individual">Individual</SelectItem>
            <SelectItem value="business">Business</SelectItem>
            <SelectItem value="verified">Verified Only</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );

  // Mobile: Sheet
  const MobileFilter = () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <SlidersHorizontal className="h-4 w-4" />
          Filters
          {hasActiveFilters && (
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
              !
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent side="bottom" className="h-[85vh] rounded-t-2xl">
        <SheetHeader>
          <SheetTitle>Filters</SheetTitle>
        </SheetHeader>
        <div className="mt-4 overflow-y-auto pb-20">
          <FilterContent />
        </div>
        <SheetFooter className="absolute bottom-0 left-0 right-0 border-t bg-background p-4 safe-bottom">
          <div className="flex w-full gap-2">
            <Button variant="outline" onClick={clearFilters} className="flex-1">
              Clear All
            </Button>
            <SheetClose asChild>
              <Button className="flex-1">Apply Filters</Button>
            </SheetClose>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );

  // Desktop: Collapsible Panel
  const DesktopFilter = () => (
    <div
      className={cn(
        "hidden rounded-lg border bg-card p-4 md:block",
        className
      )}
    >
      <div className="flex items-center justify-between">
        <h3 className="font-medium">Filters</h3>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="h-auto p-0 text-xs text-muted-foreground hover:text-foreground"
          >
            Clear all
          </Button>
        )}
      </div>
      <div className="mt-4">
        <FilterContent />
      </div>
    </div>
  );

  return (
    <>
      <div className="md:hidden">
        <MobileFilter />
      </div>
      <DesktopFilter />
    </>
  );
}

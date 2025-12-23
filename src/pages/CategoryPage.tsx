import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ChevronLeft, LayoutGrid, List } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { SearchBar } from "@/components/marketplace/SearchBar";
import { FilterPanel, Filters } from "@/components/marketplace/FilterPanel";
import { ListingCard } from "@/components/marketplace/ListingCard";
import { EmptyState } from "@/components/marketplace/EmptyState";
import { Button } from "@/components/ui/button";
import { mockListings, mockCategories } from "@/data/mockData";
import { cn } from "@/lib/utils";

export default function CategoryPage() {
  const { slug } = useParams();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [filters, setFilters] = useState<Filters>({
    priceMin: "",
    priceMax: "",
    condition: "",
    postedTime: "",
    distance: "",
    sellerType: "",
  });

  const category = mockCategories.find((c) => c.slug === slug);
  const categoryName = category?.name || "All Listings";

  // In a real app, this would filter based on actual data
  const listings = mockListings;
  const promotedCount = listings.filter((l) => l.isPromoted).length;

  return (
    <Layout>
      {/* Header */}
      <div className="border-b bg-background">
        <div className="container py-4">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm">
            <Link
              to="/"
              className="text-muted-foreground hover:text-foreground"
            >
              Home
            </Link>
            <ChevronLeft className="h-4 w-4 rotate-180 text-muted-foreground" />
            <span className="text-foreground">{categoryName}</span>
          </div>

          {/* Title & Count */}
          <div className="mt-3 flex items-end justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">
                {categoryName}
              </h1>
              <p className="mt-0.5 text-sm text-muted-foreground">
                {listings.length.toLocaleString()} ads found
              </p>
            </div>

            {/* View Toggle - Desktop */}
            <div className="hidden items-center gap-1 md:flex">
              <Button
                variant={viewMode === "grid" ? "secondary" : "ghost"}
                size="icon"
                onClick={() => setViewMode("grid")}
              >
                <LayoutGrid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "secondary" : "ghost"}
                size="icon"
                onClick={() => setViewMode("list")}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Search in Category */}
          <div className="mt-4">
            <SearchBar className="border-0 bg-muted p-0 shadow-none" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container py-4 md:py-6">
        <div className="flex gap-6">
          {/* Filters - Desktop Sidebar */}
          <aside className="hidden w-64 flex-shrink-0 md:block">
            <FilterPanel filters={filters} onFiltersChange={setFilters} />
          </aside>

          {/* Listings */}
          <div className="flex-1">
            {/* Mobile Filter Button */}
            <div className="mb-4 flex items-center justify-between md:hidden">
              <FilterPanel filters={filters} onFiltersChange={setFilters} />
              <div className="flex items-center gap-1">
                <Button
                  variant={viewMode === "grid" ? "secondary" : "ghost"}
                  size="icon"
                  onClick={() => setViewMode("grid")}
                >
                  <LayoutGrid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "secondary" : "ghost"}
                  size="icon"
                  onClick={() => setViewMode("list")}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {listings.length === 0 ? (
              <EmptyState
                title="No listings found"
                description="Try adjusting your filters or search in a different area."
                action={{
                  label: "Clear Filters",
                  onClick: () =>
                    setFilters({
                      priceMin: "",
                      priceMax: "",
                      condition: "",
                      postedTime: "",
                      distance: "",
                      sellerType: "",
                    }),
                }}
              />
            ) : (
              <div
                className={cn(
                  "grid gap-3",
                  viewMode === "grid"
                    ? "grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
                    : "grid-cols-1"
                )}
              >
                {listings.map((listing) => (
                  <ListingCard
                    key={listing.id}
                    listing={listing}
                    className={viewMode === "list" ? "flex-row" : ""}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}

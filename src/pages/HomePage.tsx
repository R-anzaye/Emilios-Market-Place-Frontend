import {
  Car,
  Smartphone,
  Shirt,
  Home,
  Briefcase,
  Wrench,
  Building,
  Dog,
  LucideIcon,
} from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { SearchBar } from "@/components/marketplace/SearchBar";
import { CategoryCard } from "@/components/marketplace/CategoryCard";
import { ListingCard } from "@/components/marketplace/ListingCard";
import { mockListings, mockCategories } from "@/data/mockData";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Plus, ChevronRight } from "lucide-react";

const categoryIcons: Record<string, LucideIcon> = {
  Car,
  Smartphone,
  Shirt,
  Home,
  Briefcase,
  Wrench,
  Building,
  Dog,
};

export default function HomePage() {
  const handleSearch = (query: string, location: string, radius: string) => {
    console.log("Search:", { query, location, radius });
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="border-b bg-gradient-to-b from-accent/50 to-background">
        <div className="container py-8 md:py-12">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-2xl font-bold tracking-tight text-foreground md:text-4xl">
              Buy & Sell Locally
            </h1>
            <p className="mt-2 text-muted-foreground">
              Find great deals near you. Meet safely, trade with confidence.
            </p>
          </div>

          {/* Search Bar */}
          <div className="mx-auto mt-6 max-w-3xl">
            <SearchBar onSearch={handleSearch} />
          </div>

          {/* Post Ad CTA - Mobile */}
          <div className="mt-4 text-center md:hidden">
            <Link to="/post-ad">
              <Button variant="outline" size="sm" className="gap-1.5">
                <Plus className="h-4 w-4" />
                Post Your Ad
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-6 md:py-10">
        <div className="container">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-foreground md:text-xl">
              Categories
            </h2>
            <Link
              to="/category/all"
              className="flex items-center gap-1 text-sm text-primary hover:underline"
            >
              See all
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-4 grid grid-cols-4 gap-2 md:grid-cols-8 md:gap-4">
            {mockCategories.map((category) => {
              const IconComponent = categoryIcons[category.icon] || Smartphone;
              return (
                <CategoryCard
                  key={category.slug}
                  name={category.name}
                  icon={IconComponent}
                  slug={category.slug}
                  count={category.count}
                />
              );
            })}
          </div>
        </div>
      </section>

      {/* Fresh Near You */}
      <section className="pb-8 md:pb-12">
        <div className="container">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-foreground md:text-xl">
              Fresh Near You
            </h2>
            <Link
              to="/category/all"
              className="flex items-center gap-1 text-sm text-primary hover:underline"
            >
              View all
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-5">
            {mockListings.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}

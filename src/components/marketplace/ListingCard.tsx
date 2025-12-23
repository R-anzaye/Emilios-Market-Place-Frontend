import { Heart, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { TrustBadge } from "./TrustBadge";

export interface Listing {
  id: string;
  title: string;
  price: number;
  currency: string;
  image: string;
  distance: string;
  postedTime: string;
  sellerAccountAge: string;
  sellerResponseTime?: "fast" | "medium" | "slow";
  sellerVerified?: boolean;
  isPromoted?: boolean;
  isSaved?: boolean;
}

interface ListingCardProps {
  listing: Listing;
  onSave?: (id: string) => void;
  className?: string;
}

export function ListingCard({ listing, onSave, className }: ListingCardProps) {
  return (
    <Link
      to={`/listing/${listing.id}`}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-lg border bg-card transition-shadow hover:shadow-card-hover",
        className
      )}
    >
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-muted">
        <img
          src={listing.image}
          alt={listing.title}
          className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-105"
          loading="lazy"
        />
        
        {/* Promoted Badge */}
        {listing.isPromoted && (
          <span className="absolute left-2 top-2 rounded bg-promoted-muted px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide text-promoted-foreground">
            Promoted
          </span>
        )}
        
        {/* Save Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onSave?.(listing.id);
          }}
          className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-background/80 backdrop-blur-sm transition-colors hover:bg-background"
          aria-label={listing.isSaved ? "Remove from saved" : "Save listing"}
        >
          <Heart
            className={cn(
              "h-4 w-4 transition-colors",
              listing.isSaved
                ? "fill-destructive text-destructive"
                : "text-muted-foreground"
            )}
          />
        </button>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-3">
        {/* Price */}
        <p className="text-lg font-semibold text-foreground">
          {listing.currency}{listing.price.toLocaleString()}
        </p>
        
        {/* Title */}
        <h3 className="mt-0.5 line-clamp-2 text-sm text-foreground/80">
          {listing.title}
        </h3>
        
        {/* Meta */}
        <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-0.5">
            <MapPin className="h-3 w-3" />
            {listing.distance}
          </span>
          <span>•</span>
          <span>{listing.postedTime}</span>
        </div>
        
        {/* Trust Badge */}
        <div className="mt-2">
          <TrustBadge
            accountAge={listing.sellerAccountAge}
            responseTime={listing.sellerResponseTime}
            verified={listing.sellerVerified}
            compact
          />
        </div>
      </div>
    </Link>
  );
}

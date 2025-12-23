import { Link } from "react-router-dom";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface CategoryCardProps {
  name: string;
  icon: LucideIcon;
  slug: string;
  count?: number;
  className?: string;
}

export function CategoryCard({
  name,
  icon: Icon,
  slug,
  count,
  className,
}: CategoryCardProps) {
  return (
    <Link
      to={`/category/${slug}`}
      className={cn(
        "flex flex-col items-center gap-2 rounded-lg border bg-card p-4 transition-colors hover:border-primary/30 hover:bg-accent",
        className
      )}
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent">
        <Icon className="h-6 w-6 text-primary" />
      </div>
      <span className="text-center text-sm font-medium text-foreground">
        {name}
      </span>
      {count !== undefined && (
        <span className="text-xs text-muted-foreground">
          {count.toLocaleString()} ads
        </span>
      )}
    </Link>
  );
}

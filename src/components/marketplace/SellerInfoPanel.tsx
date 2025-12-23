import { User, Flag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TrustBadge } from "./TrustBadge";
import { cn } from "@/lib/utils";

interface SellerInfoPanelProps {
  name: string;
  avatar?: string;
  accountAge: string;
  responseTime: "fast" | "medium" | "slow";
  verified?: boolean;
  onReport?: () => void;
  className?: string;
}

export function SellerInfoPanel({
  name,
  avatar,
  accountAge,
  responseTime,
  verified,
  onReport,
  className,
}: SellerInfoPanelProps) {
  return (
    <div
      className={cn(
        "rounded-lg border bg-card p-4",
        className
      )}
    >
      <div className="flex items-start gap-3">
        {/* Avatar */}
        <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center overflow-hidden rounded-full bg-muted">
          {avatar ? (
            <img
              src={avatar}
              alt={name}
              className="h-full w-full object-cover"
            />
          ) : (
            <User className="h-6 w-6 text-muted-foreground" />
          )}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-foreground truncate">{name}</h3>
          <TrustBadge
            accountAge={accountAge}
            responseTime={responseTime}
            verified={verified}
            className="mt-1"
          />
        </div>
      </div>

      {/* Report Button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={onReport}
        className="mt-3 w-full justify-start gap-2 text-muted-foreground hover:text-destructive"
      >
        <Flag className="h-4 w-4" />
        Report Seller
      </Button>
    </div>
  );
}

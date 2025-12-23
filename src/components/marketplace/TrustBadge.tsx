import { CheckCircle, Clock, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

interface TrustBadgeProps {
  accountAge: string;
  responseTime?: "fast" | "medium" | "slow";
  verified?: boolean;
  className?: string;
  compact?: boolean;
}

export function TrustBadge({
  accountAge,
  responseTime,
  verified,
  className,
  compact = false,
}: TrustBadgeProps) {
  if (compact) {
    return (
      <div className={cn("flex items-center gap-1.5 text-xs", className)}>
        {verified && (
          <span className="flex items-center gap-0.5 text-trust">
            <CheckCircle className="h-3 w-3" />
          </span>
        )}
        {responseTime === "fast" && (
          <span className="flex items-center gap-0.5 text-trust">
            <Zap className="h-3 w-3" />
          </span>
        )}
        <span className="text-muted-foreground">{accountAge}</span>
      </div>
    );
  }

  return (
    <div className={cn("flex flex-wrap items-center gap-2", className)}>
      {verified && (
        <span className="inline-flex items-center gap-1 rounded-full bg-trust-muted px-2 py-0.5 text-xs font-medium text-trust">
          <CheckCircle className="h-3 w-3" />
          Verified
        </span>
      )}
      {responseTime === "fast" && (
        <span className="inline-flex items-center gap-1 rounded-full bg-trust-muted px-2 py-0.5 text-xs font-medium text-trust">
          <Zap className="h-3 w-3" />
          Fast Responder
        </span>
      )}
      <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
        <Clock className="h-3 w-3" />
        Member for {accountAge}
      </span>
    </div>
  );
}

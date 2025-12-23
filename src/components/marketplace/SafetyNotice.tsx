import { ShieldAlert } from "lucide-react";
import { cn } from "@/lib/utils";

interface SafetyNoticeProps {
  message?: string;
  className?: string;
}

export function SafetyNotice({
  message = "Never pay before meeting. Meet in public places. Inspect items carefully.",
  className,
}: SafetyNoticeProps) {
  return (
    <div
      className={cn(
        "flex items-start gap-3 rounded-lg border border-warning/30 bg-promoted-muted p-3",
        className
      )}
    >
      <ShieldAlert className="h-5 w-5 flex-shrink-0 text-warning" />
      <p className="text-sm text-promoted-foreground">{message}</p>
    </div>
  );
}

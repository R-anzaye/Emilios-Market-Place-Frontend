import { Link, useLocation } from "react-router-dom";
import { Home, Search, Plus, MessageCircle, User } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { to: "/", icon: Home, label: "Home" },
  { to: "/category/all", icon: Search, label: "Browse" },
  { to: "/post-ad", icon: Plus, label: "Sell", highlight: true },
  { to: "/chat", icon: MessageCircle, label: "Chat" },
  { to: "/dashboard", icon: User, label: "Account" },
];

export function MobileNav() {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 md:hidden safe-bottom">
      <div className="flex items-center justify-around py-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.to;
          const Icon = item.icon;

          if (item.highlight) {
            return (
              <Link
                key={item.to}
                to={item.to}
                className="flex flex-col items-center gap-0.5"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary">
                  <Icon className="h-5 w-5 text-primary-foreground" />
                </div>
              </Link>
            );
          }

          return (
            <Link
              key={item.to}
              to={item.to}
              className={cn(
                "flex flex-col items-center gap-0.5 px-3 py-1",
                isActive ? "text-primary" : "text-muted-foreground"
              )}
            >
              <Icon className="h-5 w-5" />
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

import { Link } from "react-router-dom";
import { Menu, Plus, MessageCircle, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="container flex h-14 items-center justify-between md:h-16">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <span className="text-lg font-bold text-primary-foreground">M</span>
          </div>
          <span className="text-lg font-semibold text-foreground hidden sm:inline">
            Marketplace
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-6 md:flex">
          <Link
            to="/category/all"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Browse
          </Link>
          <Link
            to="/dashboard"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Dashboard
          </Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {/* Messages */}
          <Link to="/chat">
            <Button variant="ghost" size="icon" className="relative">
              <MessageCircle className="h-5 w-5" />
              <span className="sr-only">Messages</span>
            </Button>
          </Link>

          {/* Post Ad Button */}
          <Link to="/post-ad" className="hidden sm:block">
            <Button size="sm" className="gap-1.5">
              <Plus className="h-4 w-4" />
              Post Ad
            </Button>
          </Link>

          {/* User Menu / Login */}
          <Link to="/dashboard" className="hidden md:block">
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
              <span className="sr-only">Account</span>
            </Button>
          </Link>

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px]">
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              <nav className="mt-6 flex flex-col gap-4">
                <Link
                  to="/category/all"
                  className="text-lg font-medium text-foreground"
                >
                  Browse All
                </Link>
                <Link
                  to="/dashboard"
                  className="text-lg font-medium text-foreground"
                >
                  Dashboard
                </Link>
                <Link
                  to="/chat"
                  className="text-lg font-medium text-foreground"
                >
                  Messages
                </Link>
                <Link
                  to="/login"
                  className="text-lg font-medium text-foreground"
                >
                  Login
                </Link>
                <Link to="/post-ad">
                  <Button className="mt-4 w-full gap-2">
                    <Plus className="h-4 w-4" />
                    Post Ad
                  </Button>
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

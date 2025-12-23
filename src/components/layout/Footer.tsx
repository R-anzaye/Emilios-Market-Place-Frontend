import { Link } from "react-router-dom";
import { ShieldCheck } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="container py-8">
        {/* Safety First */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <ShieldCheck className="h-4 w-4 text-trust" />
          <span>Your safety is our priority</span>
        </div>

        {/* Links */}
        <nav className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm">
          <Link
            to="/safety"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Safety Tips
          </Link>
          <Link
            to="/terms"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Terms of Service
          </Link>
          <Link
            to="/privacy"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Privacy Policy
          </Link>
          <Link
            to="/contact"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Contact Us
          </Link>
        </nav>

        {/* Copyright */}
        <p className="mt-6 text-xs text-muted-foreground">
          © {new Date().getFullYear()} Marketplace. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

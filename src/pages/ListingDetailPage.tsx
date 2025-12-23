import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  ChevronLeft,
  Heart,
  Share2,
  MessageCircle,
  MapPin,
  Clock,
  Flag,
} from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { ImageCarousel } from "@/components/marketplace/ImageCarousel";
import { SellerInfoPanel } from "@/components/marketplace/SellerInfoPanel";
import { SafetyNotice } from "@/components/marketplace/SafetyNotice";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { mockListingDetails, mockListings } from "@/data/mockData";
import { toast } from "@/hooks/use-toast";

export default function ListingDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isSaved, setIsSaved] = useState(false);

  // Get listing details or fallback to basic listing
  const detailedListing = id ? mockListingDetails[id] : null;
  const basicListing = mockListings.find((l) => l.id === id);

  // Create a combined listing object
  const listing = detailedListing || (basicListing ? {
    ...basicListing,
    images: [basicListing.image],
    description: "No description available for this listing. Please contact the seller for more details.",
    condition: "Not specified",
    location: "Lagos, Nigeria",
    specs: [],
    sellerName: "Seller",
  } : null);

  if (!listing) {
    return (
      <Layout>
        <div className="container py-12 text-center">
          <h1 className="text-xl font-semibold">Listing not found</h1>
          <p className="mt-2 text-muted-foreground">
            This listing may have been removed or expired.
          </p>
          <Button onClick={() => navigate("/")} className="mt-4">
            Back to Home
          </Button>
        </div>
      </Layout>
    );
  }

  const handleSave = () => {
    setIsSaved(!isSaved);
    toast({
      title: isSaved ? "Removed from saved" : "Saved!",
      description: isSaved
        ? "This ad has been removed from your saved list."
        : "This ad has been saved to your list.",
    });
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: listing.title,
          text: `Check out this listing: ${listing.title}`,
          url: window.location.href,
        });
      } catch (err) {
        console.log("Share cancelled");
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link copied!",
        description: "The listing link has been copied to your clipboard.",
      });
    }
  };

  const handleChat = () => {
    navigate("/chat");
  };

  const handleReport = () => {
    toast({
      title: "Report submitted",
      description: "We'll review this seller and take appropriate action.",
    });
  };

  return (
    <Layout showFooter={false}>
      {/* Mobile Header */}
      <div className="sticky top-14 z-40 flex items-center justify-between border-b bg-background px-4 py-2 md:hidden">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate(-1)}
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={handleShare}>
            <Share2 className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" onClick={handleSave}>
            <Heart
              className={`h-5 w-5 ${
                isSaved ? "fill-destructive text-destructive" : ""
              }`}
            />
          </Button>
        </div>
      </div>

      <div className="container pb-24 md:py-6">
        <div className="grid gap-6 md:grid-cols-5 lg:grid-cols-3">
          {/* Left Column - Images */}
          <div className="md:col-span-3 lg:col-span-2">
            {/* Desktop Back Button */}
            <Link
              to="/category/all"
              className="mb-4 hidden items-center gap-1 text-sm text-muted-foreground hover:text-foreground md:flex"
            >
              <ChevronLeft className="h-4 w-4" />
              Back to listings
            </Link>

            {/* Image Carousel */}
            <ImageCarousel
              images={listing.images}
              alt={listing.title}
              className="rounded-lg overflow-hidden"
            />

            {/* Promoted Badge */}
            {listing.isPromoted && (
              <Badge
                variant="secondary"
                className="mt-3 bg-promoted-muted text-promoted-foreground"
              >
                Promoted Listing
              </Badge>
            )}

            {/* Title & Price */}
            <div className="mt-4">
              <h1 className="text-xl font-bold text-foreground md:text-2xl">
                {listing.title}
              </h1>
              <p className="mt-2 text-2xl font-bold text-primary md:text-3xl">
                {listing.currency}
                {listing.price.toLocaleString()}
              </p>
            </div>

            {/* Meta Info */}
            <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                {listing.location || listing.distance}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {listing.postedTime}
              </span>
              {listing.condition && (
                <Badge variant="outline">{listing.condition}</Badge>
              )}
            </div>

            {/* Description */}
            <div className="mt-6">
              <h2 className="font-semibold text-foreground">Description</h2>
              <p className="mt-2 whitespace-pre-line text-sm text-muted-foreground">
                {listing.description}
              </p>
            </div>

            {/* Specs */}
            {listing.specs && listing.specs.length > 0 && (
              <div className="mt-6">
                <h2 className="font-semibold text-foreground">Specifications</h2>
                <dl className="mt-2 grid grid-cols-2 gap-2">
                  {listing.specs.map((spec, index) => (
                    <div key={index} className="rounded-lg bg-muted p-3">
                      <dt className="text-xs text-muted-foreground">
                        {spec.label}
                      </dt>
                      <dd className="mt-0.5 text-sm font-medium text-foreground">
                        {spec.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}
          </div>

          {/* Right Column - Seller & Actions */}
          <div className="space-y-4 md:col-span-2 lg:col-span-1">
            {/* Desktop Action Buttons */}
            <div className="hidden md:block">
              <div className="flex gap-2">
                <Button variant="outline" size="icon" onClick={handleShare}>
                  <Share2 className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" onClick={handleSave}>
                  <Heart
                    className={`h-4 w-4 ${
                      isSaved ? "fill-destructive text-destructive" : ""
                    }`}
                  />
                </Button>
              </div>
            </div>

            {/* Seller Info */}
            <SellerInfoPanel
              name={listing.sellerName || "Seller"}
              avatar={listing.sellerAvatar}
              accountAge={listing.sellerAccountAge}
              responseTime={listing.sellerResponseTime || "medium"}
              verified={listing.sellerVerified}
              onReport={handleReport}
            />

            {/* Safety Notice */}
            <SafetyNotice />

            {/* Desktop CTA */}
            <div className="hidden space-y-2 md:block">
              <Button onClick={handleChat} className="w-full gap-2">
                <MessageCircle className="h-4 w-4" />
                Chat with Seller
              </Button>
              <Button
                variant="outline"
                onClick={handleSave}
                className="w-full gap-2"
              >
                <Heart
                  className={`h-4 w-4 ${
                    isSaved ? "fill-destructive text-destructive" : ""
                  }`}
                />
                {isSaved ? "Saved" : "Save Ad"}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Bottom CTA */}
      <div className="fixed bottom-16 left-0 right-0 z-40 border-t bg-background p-4 md:hidden safe-bottom">
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={handleSave}
            className="flex-shrink-0"
          >
            <Heart
              className={`h-5 w-5 ${
                isSaved ? "fill-destructive text-destructive" : ""
              }`}
            />
          </Button>
          <Button onClick={handleChat} className="flex-1 gap-2">
            <MessageCircle className="h-4 w-4" />
            Chat with Seller
          </Button>
        </div>
      </div>
    </Layout>
  );
}

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ChevronLeft,
  ChevronRight,
  Check,
  Camera,
  X,
  MapPin,
} from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { mockCategories } from "@/data/mockData";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";

interface AdData {
  category: string;
  title: string;
  price: string;
  condition: string;
  location: string;
  description: string;
  images: string[];
}

const steps = [
  { id: 1, title: "Category" },
  { id: 2, title: "Details" },
  { id: 3, title: "Images" },
  { id: 4, title: "Review" },
];

export default function PostAdPage() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [adData, setAdData] = useState<AdData>({
    category: "",
    title: "",
    price: "",
    condition: "",
    location: "",
    description: "",
    images: [],
  });

  const updateData = (field: keyof AdData, value: string | string[]) => {
    setAdData((prev) => ({ ...prev, [field]: value }));
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return adData.category !== "";
      case 2:
        return (
          adData.title !== "" &&
          adData.price !== "" &&
          adData.condition !== "" &&
          adData.location !== ""
        );
      case 3:
        return adData.images.length >= 2;
      case 4:
        return true;
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep((prev) => prev + 1);
    } else {
      // Submit
      toast({
        title: "Ad published!",
        description: "Your ad is now live and visible to buyers.",
      });
      navigate("/dashboard");
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    } else {
      navigate(-1);
    }
  };

  const addPlaceholderImage = () => {
    if (adData.images.length < 6) {
      const placeholders = [
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400",
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400",
        "https://images.unsplash.com/photo-1560343090-f0409e92791a?w=400",
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400",
        "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=400",
        "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=400",
      ];
      const newImage = placeholders[adData.images.length];
      updateData("images", [...adData.images, newImage]);
    }
  };

  const removeImage = (index: number) => {
    updateData(
      "images",
      adData.images.filter((_, i) => i !== index)
    );
  };

  const getCategoryName = (slug: string) => {
    return mockCategories.find((c) => c.slug === slug)?.name || slug;
  };

  return (
    <Layout showFooter={false}>
      <div className="container max-w-2xl py-4 md:py-8">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={handleBack}>
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-xl font-bold text-foreground">Post an Ad</h1>
            <p className="text-sm text-muted-foreground">
              Step {currentStep} of {steps.length}: {steps[currentStep - 1].title}
            </p>
          </div>
        </div>

        {/* Progress */}
        <div className="mt-6 flex items-center gap-2">
          {steps.map((step, index) => (
            <div key={step.id} className="flex flex-1 items-center">
              <div
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium transition-colors",
                  step.id < currentStep
                    ? "bg-trust text-trust-foreground"
                    : step.id === currentStep
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                )}
              >
                {step.id < currentStep ? (
                  <Check className="h-4 w-4" />
                ) : (
                  step.id
                )}
              </div>
              {index < steps.length - 1 && (
                <div
                  className={cn(
                    "ml-2 h-0.5 flex-1",
                    step.id < currentStep ? "bg-trust" : "bg-muted"
                  )}
                />
              )}
            </div>
          ))}
        </div>

        {/* Step Content */}
        <div className="mt-8">
          {/* Step 1: Category Selection */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">Select a category</h2>
              <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
                {mockCategories.map((category) => (
                  <button
                    key={category.slug}
                    onClick={() => updateData("category", category.slug)}
                    className={cn(
                      "flex flex-col items-center gap-2 rounded-lg border p-4 transition-colors",
                      adData.category === category.slug
                        ? "border-primary bg-accent"
                        : "hover:border-muted-foreground/30"
                    )}
                  >
                    <span className="text-sm font-medium">{category.name}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Ad Details */}
          {currentStep === 2 && (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">Ad details</h2>

              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  placeholder="e.g., iPhone 14 Pro Max - 256GB, Like New"
                  value={adData.title}
                  onChange={(e) => updateData("title", e.target.value)}
                  maxLength={80}
                />
                <p className="text-xs text-muted-foreground">
                  {adData.title.length}/80 characters
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="price">Price (₦)</Label>
                <Input
                  id="price"
                  type="number"
                  placeholder="0"
                  value={adData.price}
                  onChange={(e) => updateData("price", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="condition">Condition</Label>
                <Select
                  value={adData.condition}
                  onValueChange={(v) => updateData("condition", v)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select condition" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="new">New (sealed)</SelectItem>
                    <SelectItem value="like-new">Like New</SelectItem>
                    <SelectItem value="good">Good</SelectItem>
                    <SelectItem value="fair">Fair</SelectItem>
                    <SelectItem value="for-parts">For Parts</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="location"
                    placeholder="e.g., Victoria Island, Lagos"
                    value={adData.location}
                    onChange={(e) => updateData("location", e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description (optional)</Label>
                <Textarea
                  id="description"
                  placeholder="Describe your item in detail..."
                  value={adData.description}
                  onChange={(e) => updateData("description", e.target.value)}
                  rows={4}
                />
              </div>
            </div>
          )}

          {/* Step 3: Images */}
          {currentStep === 3 && (
            <div className="space-y-4">
              <div>
                <h2 className="text-lg font-semibold">Add photos</h2>
                <p className="text-sm text-muted-foreground">
                  Add 2-6 photos. The first photo will be the cover.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-3">
                {/* Uploaded Images */}
                {adData.images.map((image, index) => (
                  <div
                    key={index}
                    className="relative aspect-square overflow-hidden rounded-lg bg-muted"
                  >
                    <img
                      src={image}
                      alt={`Upload ${index + 1}`}
                      className="h-full w-full object-cover"
                    />
                    <button
                      onClick={() => removeImage(index)}
                      className="absolute right-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-destructive text-destructive-foreground"
                    >
                      <X className="h-4 w-4" />
                    </button>
                    {index === 0 && (
                      <span className="absolute bottom-1 left-1 rounded bg-background/80 px-1.5 py-0.5 text-[10px] font-medium">
                        Cover
                      </span>
                    )}
                  </div>
                ))}

                {/* Add Image Button */}
                {adData.images.length < 6 && (
                  <button
                    onClick={addPlaceholderImage}
                    className="flex aspect-square flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-muted-foreground/30 transition-colors hover:border-primary hover:bg-accent"
                  >
                    <Camera className="h-6 w-6 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">
                      Add Photo
                    </span>
                  </button>
                )}
              </div>

              <p className="text-sm text-muted-foreground">
                {adData.images.length}/6 photos •{" "}
                {adData.images.length < 2
                  ? `Add ${2 - adData.images.length} more`
                  : "Ready to continue"}
              </p>
            </div>
          )}

          {/* Step 4: Review */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <h2 className="text-lg font-semibold">Review your ad</h2>

              {/* Preview Card */}
              <div className="overflow-hidden rounded-lg border">
                {/* Image */}
                <div className="aspect-video bg-muted">
                  {adData.images[0] && (
                    <img
                      src={adData.images[0]}
                      alt=""
                      className="h-full w-full object-cover"
                    />
                  )}
                </div>

                {/* Details */}
                <div className="p-4">
                  <p className="text-xl font-bold text-primary">
                    ₦{Number(adData.price).toLocaleString()}
                  </p>
                  <h3 className="mt-1 font-medium text-foreground">
                    {adData.title}
                  </h3>
                  <div className="mt-2 flex flex-wrap gap-2 text-sm text-muted-foreground">
                    <span>{getCategoryName(adData.category)}</span>
                    <span>•</span>
                    <span className="capitalize">{adData.condition}</span>
                    <span>•</span>
                    <span>{adData.location}</span>
                  </div>
                  {adData.description && (
                    <p className="mt-3 text-sm text-muted-foreground">
                      {adData.description}
                    </p>
                  )}
                </div>
              </div>

              <p className="text-sm text-muted-foreground">
                By publishing, you agree to our Terms of Service. Your ad will
                be visible to buyers in your area.
              </p>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="mt-8 flex gap-3">
          {currentStep > 1 && (
            <Button variant="outline" onClick={handleBack} className="flex-1">
              Back
            </Button>
          )}
          <Button
            onClick={handleNext}
            disabled={!canProceed()}
            className={cn("flex-1", currentStep === 1 && "w-full")}
          >
            {currentStep === 4 ? "Publish Ad" : "Continue"}
            {currentStep < 4 && <ChevronRight className="ml-1 h-4 w-4" />}
          </Button>
        </div>
      </div>
    </Layout>
  );
}

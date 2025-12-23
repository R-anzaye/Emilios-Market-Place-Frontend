import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Package,
  MessageCircle,
  Heart,
  Settings,
  Plus,
  Eye,
  MoreVertical,
  Edit,
  Trash2,
  CheckCircle,
} from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EmptyState } from "@/components/marketplace/EmptyState";
import { ListingCard } from "@/components/marketplace/ListingCard";
import { mockUserListings, mockListings, mockConversations } from "@/data/mockData";
import { cn } from "@/lib/utils";

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("listings");

  // Convert mockListings to saved ads format (simulate saved)
  const savedAds = mockListings.slice(0, 3).map((l) => ({ ...l, isSaved: true }));

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-trust-muted text-trust";
      case "pending":
        return "bg-promoted-muted text-promoted-foreground";
      case "sold":
        return "bg-muted text-muted-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <Layout>
      <div className="container py-4 md:py-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
            <p className="text-sm text-muted-foreground">
              Manage your listings and activity
            </p>
          </div>
          <Link to="/post-ad" className="hidden md:block">
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Post New Ad
            </Button>
          </Link>
        </div>

        {/* Stats - Quick Overview */}
        <div className="mt-6 grid grid-cols-3 gap-4">
          <div className="rounded-lg border bg-card p-4">
            <p className="text-2xl font-bold text-foreground">
              {mockUserListings.filter((l) => l.status === "active").length}
            </p>
            <p className="text-sm text-muted-foreground">Active Ads</p>
          </div>
          <div className="rounded-lg border bg-card p-4">
            <p className="text-2xl font-bold text-foreground">
              {mockUserListings.reduce((sum, l) => sum + l.views, 0)}
            </p>
            <p className="text-sm text-muted-foreground">Total Views</p>
          </div>
          <div className="rounded-lg border bg-card p-4">
            <p className="text-2xl font-bold text-foreground">
              {mockConversations.length}
            </p>
            <p className="text-sm text-muted-foreground">Messages</p>
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-6">
          <TabsList className="w-full justify-start border-b bg-transparent p-0">
            <TabsTrigger
              value="listings"
              className="gap-2 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
            >
              <Package className="h-4 w-4" />
              <span className="hidden sm:inline">My Listings</span>
              <span className="sm:hidden">Ads</span>
            </TabsTrigger>
            <TabsTrigger
              value="messages"
              className="gap-2 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
            >
              <MessageCircle className="h-4 w-4" />
              Messages
              {mockConversations.filter((c) => c.unreadCount > 0).length > 0 && (
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                  {mockConversations.filter((c) => c.unreadCount > 0).length}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger
              value="saved"
              className="gap-2 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
            >
              <Heart className="h-4 w-4" />
              Saved
            </TabsTrigger>
            <TabsTrigger
              value="settings"
              className="gap-2 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
            >
              <Settings className="h-4 w-4" />
              <span className="hidden sm:inline">Settings</span>
            </TabsTrigger>
          </TabsList>

          {/* My Listings */}
          <TabsContent value="listings" className="mt-6">
            {mockUserListings.length === 0 ? (
              <EmptyState
                icon={Package}
                title="No listings yet"
                description="Start selling by posting your first ad."
                action={{
                  label: "Post Ad",
                  onClick: () => (window.location.href = "/post-ad"),
                }}
              />
            ) : (
              <div className="space-y-3">
                {mockUserListings.map((listing) => (
                  <div
                    key={listing.id}
                    className="flex items-center gap-4 rounded-lg border bg-card p-4"
                  >
                    {/* Image */}
                    <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg bg-muted">
                      <img
                        src={listing.image}
                        alt=""
                        className="h-full w-full object-cover"
                      />
                    </div>

                    {/* Info */}
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="truncate font-medium text-foreground">
                          {listing.title}
                        </h3>
                        <Badge className={cn("flex-shrink-0", getStatusColor(listing.status))}>
                          {listing.status}
                        </Badge>
                      </div>
                      <p className="mt-0.5 text-lg font-semibold text-primary">
                        {listing.currency}
                        {listing.price.toLocaleString()}
                      </p>
                      <div className="mt-1 flex items-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Eye className="h-3 w-3" />
                          {listing.views} views
                        </span>
                        <span className="flex items-center gap-1">
                          <MessageCircle className="h-3 w-3" />
                          {listing.messages} messages
                        </span>
                        <span>{listing.postedDate}</span>
                      </div>
                    </div>

                    {/* Actions */}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <CheckCircle className="mr-2 h-4 w-4" />
                          Mark as Sold
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                ))}
              </div>
            )}

            {/* Mobile Post Ad Button */}
            <Link to="/post-ad" className="mt-6 block md:hidden">
              <Button className="w-full gap-2">
                <Plus className="h-4 w-4" />
                Post New Ad
              </Button>
            </Link>
          </TabsContent>

          {/* Messages */}
          <TabsContent value="messages" className="mt-6">
            {mockConversations.length === 0 ? (
              <EmptyState
                icon={MessageCircle}
                title="No messages yet"
                description="When you contact sellers or receive inquiries, they'll appear here."
              />
            ) : (
              <div className="space-y-2">
                {mockConversations.map((conv) => (
                  <Link
                    key={conv.id}
                    to="/chat"
                    className="flex items-center gap-3 rounded-lg border bg-card p-4 transition-colors hover:bg-muted/50"
                  >
                    <div className="h-12 w-12 flex-shrink-0 overflow-hidden rounded-lg bg-muted">
                      <img
                        src={conv.listingImage}
                        alt=""
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between">
                        <p className="truncate font-medium text-foreground">
                          {conv.otherUserName}
                        </p>
                        <span className="text-xs text-muted-foreground">
                          {conv.lastMessageTime}
                        </span>
                      </div>
                      <p className="truncate text-sm text-muted-foreground">
                        {conv.listingTitle}
                      </p>
                      <p className="mt-0.5 truncate text-sm text-muted-foreground">
                        {conv.lastMessage}
                      </p>
                    </div>
                    {conv.unreadCount > 0 && (
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground">
                        {conv.unreadCount}
                      </span>
                    )}
                  </Link>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Saved Ads */}
          <TabsContent value="saved" className="mt-6">
            {savedAds.length === 0 ? (
              <EmptyState
                icon={Heart}
                title="No saved ads"
                description="Save ads you're interested in to view them later."
                action={{
                  label: "Browse Listings",
                  onClick: () => (window.location.href = "/category/all"),
                }}
              />
            ) : (
              <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
                {savedAds.map((listing) => (
                  <ListingCard key={listing.id} listing={listing} />
                ))}
              </div>
            )}
          </TabsContent>

          {/* Settings */}
          <TabsContent value="settings" className="mt-6">
            <div className="space-y-6">
              <div className="rounded-lg border bg-card p-4">
                <h3 className="font-medium text-foreground">Account</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Manage your account settings and preferences.
                </p>
                <Button variant="outline" className="mt-4" size="sm">
                  Edit Profile
                </Button>
              </div>

              <div className="rounded-lg border bg-card p-4">
                <h3 className="font-medium text-foreground">Notifications</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Control how you receive notifications.
                </p>
                <Button variant="outline" className="mt-4" size="sm">
                  Manage Notifications
                </Button>
              </div>

              <div className="rounded-lg border border-destructive/20 bg-card p-4">
                <h3 className="font-medium text-destructive">Danger Zone</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Permanently delete your account and all data.
                </p>
                <Button variant="destructive" className="mt-4" size="sm">
                  Delete Account
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}

import { Listing } from "@/components/marketplace/ListingCard";

// Sample placeholder images
const placeholderImages = [
  "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1560343090-f0409e92791a?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1491553895911-0055uj6667a5?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&h=400&fit=crop",
];

export const mockListings: Listing[] = [
  {
    id: "1",
    title: "iPhone 14 Pro Max - Excellent Condition, 256GB",
    price: 85000,
    currency: "₦",
    image: placeholderImages[0],
    distance: "2.3 km",
    postedTime: "2 hours ago",
    sellerAccountAge: "2 years",
    sellerResponseTime: "fast",
    sellerVerified: true,
    isPromoted: true,
  },
  {
    id: "2",
    title: "Sony WH-1000XM5 Wireless Headphones",
    price: 45000,
    currency: "₦",
    image: placeholderImages[1],
    distance: "5.1 km",
    postedTime: "5 hours ago",
    sellerAccountAge: "8 months",
    sellerResponseTime: "fast",
    sellerVerified: true,
  },
  {
    id: "3",
    title: "MacBook Air M2 2023 - Like New",
    price: 650000,
    currency: "₦",
    image: placeholderImages[2],
    distance: "1.2 km",
    postedTime: "1 day ago",
    sellerAccountAge: "3 years",
    sellerResponseTime: "medium",
    sellerVerified: true,
  },
  {
    id: "4",
    title: "Nike Air Max 90 - Size 42, Brand New",
    price: 35000,
    currency: "₦",
    image: placeholderImages[4],
    distance: "8.5 km",
    postedTime: "3 hours ago",
    sellerAccountAge: "1 year",
    sellerResponseTime: "fast",
    isPromoted: true,
  },
  {
    id: "5",
    title: "Samsung 55\" Smart TV 4K - 2024 Model",
    price: 280000,
    currency: "₦",
    image: placeholderImages[5],
    distance: "3.7 km",
    postedTime: "6 hours ago",
    sellerAccountAge: "5 months",
    sellerResponseTime: "medium",
  },
  {
    id: "6",
    title: "Vans Old Skool Classic - Size 40",
    price: 18000,
    currency: "₦",
    image: placeholderImages[6],
    distance: "4.2 km",
    postedTime: "1 day ago",
    sellerAccountAge: "2 years",
    sellerResponseTime: "slow",
  },
  {
    id: "7",
    title: "Beats Studio Pro Wireless Headphones",
    price: 52000,
    currency: "₦",
    image: placeholderImages[7],
    distance: "6.8 km",
    postedTime: "4 hours ago",
    sellerAccountAge: "1 year",
    sellerResponseTime: "fast",
    sellerVerified: true,
  },
  {
    id: "8",
    title: "PlayStation 5 Disc Edition + 2 Controllers",
    price: 420000,
    currency: "₦",
    image: placeholderImages[0],
    distance: "2.1 km",
    postedTime: "Just now",
    sellerAccountAge: "4 years",
    sellerResponseTime: "fast",
    sellerVerified: true,
  },
];

export interface ListingDetail extends Listing {
  images: string[];
  description: string;
  condition: string;
  location: string;
  specs: { label: string; value: string }[];
  sellerName: string;
  sellerAvatar?: string;
}

export const mockListingDetails: Record<string, ListingDetail> = {
  "1": {
    ...mockListings[0],
    images: [
      placeholderImages[0],
      placeholderImages[1],
      placeholderImages[2],
      placeholderImages[3],
    ],
    description:
      "Selling my iPhone 14 Pro Max in excellent condition. Used for only 6 months with a case and screen protector since day one. Battery health is at 98%. Comes with original box, charger, and accessories. No scratches or dents. Reason for selling: upgrading to the new model.",
    condition: "Like New",
    location: "Victoria Island, Lagos",
    specs: [
      { label: "Storage", value: "256GB" },
      { label: "Color", value: "Deep Purple" },
      { label: "Battery Health", value: "98%" },
      { label: "Warranty", value: "6 months left" },
    ],
    sellerName: "Adebayo Johnson",
    sellerAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
  },
};

export interface Category {
  name: string;
  slug: string;
  icon: string;
  count: number;
}

export const mockCategories: Category[] = [
  { name: "Vehicles", slug: "vehicles", icon: "Car", count: 12540 },
  { name: "Electronics", slug: "electronics", icon: "Smartphone", count: 45230 },
  { name: "Fashion", slug: "fashion", icon: "Shirt", count: 28900 },
  { name: "Home & Garden", slug: "home-garden", icon: "Home", count: 15670 },
  { name: "Jobs", slug: "jobs", icon: "Briefcase", count: 8450 },
  { name: "Services", slug: "services", icon: "Wrench", count: 6780 },
  { name: "Property", slug: "property", icon: "Building", count: 4320 },
  { name: "Pets", slug: "pets", icon: "Dog", count: 2150 },
];

export interface Conversation {
  id: string;
  listingId: string;
  listingTitle: string;
  listingImage: string;
  otherUserName: string;
  otherUserAvatar?: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
}

export const mockConversations: Conversation[] = [
  {
    id: "conv1",
    listingId: "1",
    listingTitle: "iPhone 14 Pro Max",
    listingImage: placeholderImages[0],
    otherUserName: "Adebayo Johnson",
    otherUserAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    lastMessage: "Is this still available?",
    lastMessageTime: "2 min ago",
    unreadCount: 2,
  },
  {
    id: "conv2",
    listingId: "2",
    listingTitle: "Sony Headphones",
    listingImage: placeholderImages[1],
    otherUserName: "Chioma Okafor",
    lastMessage: "Can you do ₦40,000?",
    lastMessageTime: "1 hour ago",
    unreadCount: 0,
  },
  {
    id: "conv3",
    listingId: "3",
    listingTitle: "MacBook Air M2",
    listingImage: placeholderImages[2],
    otherUserName: "Emmanuel Nwachukwu",
    lastMessage: "I can meet tomorrow at 3pm",
    lastMessageTime: "Yesterday",
    unreadCount: 0,
  },
];

export interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
  isSystem?: boolean;
}

export const mockMessages: Record<string, Message[]> = {
  conv1: [
    {
      id: "m1",
      senderId: "system",
      text: "⚠️ Stay safe: Never share personal banking details. Meet in public places.",
      timestamp: "Today",
      isSystem: true,
    },
    {
      id: "m2",
      senderId: "other",
      text: "Hi! Is this iPhone still available?",
      timestamp: "10:30 AM",
    },
    {
      id: "m3",
      senderId: "me",
      text: "Yes, it's still available!",
      timestamp: "10:32 AM",
    },
    {
      id: "m4",
      senderId: "other",
      text: "Great! Can I see it today?",
      timestamp: "10:33 AM",
    },
    {
      id: "m5",
      senderId: "other",
      text: "I'm in Victoria Island area",
      timestamp: "10:33 AM",
    },
  ],
};

export interface UserListing {
  id: string;
  title: string;
  price: number;
  currency: string;
  image: string;
  status: "active" | "pending" | "sold";
  views: number;
  messages: number;
  postedDate: string;
}

export const mockUserListings: UserListing[] = [
  {
    id: "ul1",
    title: "iPhone 14 Pro Max - 256GB",
    price: 85000,
    currency: "₦",
    image: placeholderImages[0],
    status: "active",
    views: 245,
    messages: 12,
    postedDate: "Dec 15, 2024",
  },
  {
    id: "ul2",
    title: "Sony WH-1000XM5 Headphones",
    price: 45000,
    currency: "₦",
    image: placeholderImages[1],
    status: "active",
    views: 89,
    messages: 5,
    postedDate: "Dec 18, 2024",
  },
  {
    id: "ul3",
    title: "Samsung Galaxy S23 Ultra",
    price: 120000,
    currency: "₦",
    image: placeholderImages[2],
    status: "sold",
    views: 432,
    messages: 28,
    postedDate: "Dec 10, 2024",
  },
];

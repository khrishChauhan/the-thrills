export interface PassTier {
  id: string;
  name: string;
  subtitle: string;
  badge?: string;
  price: number;
  originalPrice: number;
  savings: number;
  periodText: string;
  description: string;
  isPopular?: boolean;
  featuresHeader: string;
  features: string[];
  buttonText: string;
}

export interface AssuranceBadge {
  id: string;
  title: string;
  description: string;
  icon: "zap" | "shield" | "ticket";
  colorClass: string;
}

export const PASSES: PassTier[] = [
  {
    id: "day-thrill",
    name: "Day Thrill Pass",
    subtitle: "Essential Park Access",
    price: 699,
    originalPrice: 899,
    savings: 200,
    periodText: "per guest · all day",
    description: "Full-day unlimited access to all classic dry rides, Fun Zone coasters, and Atlantis Lagoon Water Park.",
    featuresHeader: "What is Included",
    features: [
      "Full Day Access to Dry Amusement Park",
      "Unlimited Atlantis Lagoon Water Park Entry",
      "Access to Fun Zone roller coasters & thrill rides",
      "Standard digital queue reservation system",
      "Complimentary safe locker token",
      "Free parking pass",
    ],
    buttonText: "Select Day Thrill Pass",
    isPopular: false,
  },
  {
    id: "all-access-ultra",
    name: "All-Access Ultra Pass",
    subtitle: "Premium VIP Experience",
    badge: "Most Popular",
    price: 999,
    originalPrice: 1499,
    savings: 500,
    periodText: "per guest · all day",
    description: "The definitive VIP experience. Skip the lines with unlimited Fast-Track, plus full 7D Theatre & sensory attractions.",
    featuresHeader: "What is Included",
    features: [
      "Everything in Day Thrill Pass PLUS:",
      "UNLIMITED VIP Fast-Track on all rides (Zero Wait)",
      "Full Access to 7D Theatre, Horror House & Mirror House",
      "Exclusive VIP Water Park lounge chair reserved",
      "Complimentary Chef Combo Lunch & Premium Drink",
      "Collector Edition Thrills RFID Wristband & Lanyard",
      "15% Discount on all park dining & merchandise",
    ],
    buttonText: "Select All-Access Ultra Pass",
    isPopular: true,
  },
];

export const ASSURANCE_BADGES: AssuranceBadge[] = [
  {
    id: "instant-qr",
    title: "Instant QR Delivery",
    description: "Download pass or scan directly on your phone",
    icon: "zap",
    colorClass: "text-amber-400",
  },
  {
    id: "free-reschedule",
    title: "Free Date Rescheduling",
    description: "Up to 2 hours before gate opening time",
    icon: "shield",
    colorClass: "text-emerald-400",
  },
  {
    id: "child-free",
    title: "Children Under 90cm Free",
    description: "Complimentary admission at turnstiles",
    icon: "ticket",
    colorClass: "text-sky-400",
  },
];

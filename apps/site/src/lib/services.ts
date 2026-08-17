export type ServicePackage = {
  id: string;
  name: string;
  price: number;
  duration: string;
  description: string;
  features: string[];
  featured?: boolean;
};

export const servicePackages: ServicePackage[] = [
  {
    id: "essential",
    name: "Essential Wash",
    price: 59,
    duration: "45 min",
    description: "A thorough exterior refresh for regular upkeep.",
    features: [
      "Hand wash & dry",
      "Wheel & tire cleaning",
      "Window cleaning (exterior)",
      "Tire shine",
    ],
  },
  {
    id: "signature",
    name: "Signature Detail",
    price: 179,
    duration: "2.5 hrs",
    description: "Our most popular full interior + exterior detail.",
    features: [
      "Everything in Essential",
      "Interior vacuum & wipe-down",
      "Leather/upholstery cleaning",
      "Clay bar treatment",
      "Hand wax",
    ],
    featured: true,
  },
  {
    id: "ultimate",
    name: "Ultimate Correction",
    price: 349,
    duration: "5+ hrs",
    description: "Paint correction and premium protection for showroom results.",
    features: [
      "Everything in Signature",
      "Machine paint correction",
      "Ceramic sealant application",
      "Engine bay detailing",
      "Headlight restoration",
    ],
  },
];

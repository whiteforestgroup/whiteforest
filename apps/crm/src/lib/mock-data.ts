// Placeholder data until the CRM has a real backend/database wired up.
export type BookingStatus = "new" | "scheduled" | "in_progress" | "completed";

export type Booking = {
  id: string;
  customerName: string;
  phone: string;
  packageName: string;
  price: number;
  preferredDate: string;
  address: string;
  status: BookingStatus;
};

export const bookings: Booking[] = [
  {
    id: "bk_1",
    customerName: "Jane Doe",
    phone: "(555) 123-4567",
    packageName: "Signature Detail",
    price: 179,
    preferredDate: "2026-08-19",
    address: "456 Oak Ave, Springfield",
    status: "new",
  },
  {
    id: "bk_2",
    customerName: "Marcus Lee",
    phone: "(555) 987-6543",
    packageName: "Ultimate Correction",
    price: 349,
    preferredDate: "2026-08-20",
    address: "89 Birch Rd, Springfield",
    status: "scheduled",
  },
  {
    id: "bk_3",
    customerName: "Priya Patel",
    phone: "(555) 456-7890",
    packageName: "Essential Wash",
    price: 59,
    preferredDate: "2026-08-18",
    address: "12 Maple Ct, Springfield",
    status: "completed",
  },
];

export const statusLabels: Record<BookingStatus, string> = {
  new: "New",
  scheduled: "Scheduled",
  in_progress: "In Progress",
  completed: "Completed",
};

export const statusStyles: Record<BookingStatus, string> = {
  new: "bg-amber-100 text-amber-800",
  scheduled: "bg-blue-100 text-blue-800",
  in_progress: "bg-purple-100 text-purple-800",
  completed: "bg-emerald-100 text-emerald-800",
};

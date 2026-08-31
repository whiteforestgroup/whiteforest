// Placeholder data until the CRM has a real backend/database wired up.
export type BookingStatus = "new" | "scheduled" | "in_progress" | "completed";

export type Booking = {
  id: string;
  customerName: string;
  phone: string;
  vehicle: string;
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
    vehicle: "2022 Tesla Model Y",
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
    vehicle: "2019 BMW X5",
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
    vehicle: "2021 Honda Civic",
    packageName: "Essential Wash",
    price: 59,
    preferredDate: "2026-08-18",
    address: "12 Maple Ct, Springfield",
    status: "completed",
  },
  {
    id: "bk_4",
    customerName: "Devon Carter",
    phone: "(555) 222-1010",
    vehicle: "2020 Ford F-150",
    packageName: "Signature Detail",
    price: 179,
    preferredDate: "2026-08-21",
    address: "301 Elm St, Springfield",
    status: "new",
  },
  {
    id: "bk_5",
    customerName: "Aisha Khan",
    phone: "(555) 333-7788",
    vehicle: "2023 Audi Q7",
    packageName: "Ultimate Correction",
    price: 349,
    preferredDate: "2026-08-22",
    address: "77 Pine Ln, Springfield",
    status: "in_progress",
  },
  {
    id: "bk_6",
    customerName: "Sam Whitfield",
    phone: "(555) 444-9922",
    vehicle: "2018 Subaru Outback",
    packageName: "Essential Wash",
    price: 59,
    preferredDate: "2026-08-17",
    address: "22 Cedar Dr, Springfield",
    status: "completed",
  },
  {
    id: "bk_7",
    customerName: "Rosa Fernandez",
    phone: "(555) 555-0134",
    vehicle: "2022 Kia Telluride",
    packageName: "Signature Detail",
    price: 179,
    preferredDate: "2026-08-23",
    address: "500 Willow Way, Springfield",
    status: "scheduled",
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

export const statusColumns: BookingStatus[] = ["new", "scheduled", "in_progress", "completed"];

export type Customer = {
  id: string;
  name: string;
  phone: string;
  email: string;
  vehicle: string;
  totalSpent: number;
  visits: number;
  lastVisit: string;
};

export const customers: Customer[] = [
  { id: "c_1", name: "Jane Doe", phone: "(555) 123-4567", email: "jane.doe@example.com", vehicle: "2022 Tesla Model Y", totalSpent: 537, visits: 3, lastVisit: "2026-07-02" },
  { id: "c_2", name: "Marcus Lee", phone: "(555) 987-6543", email: "marcus.lee@example.com", vehicle: "2019 BMW X5", totalSpent: 1047, visits: 4, lastVisit: "2026-08-01" },
  { id: "c_3", name: "Priya Patel", phone: "(555) 456-7890", email: "priya.patel@example.com", vehicle: "2021 Honda Civic", totalSpent: 236, visits: 4, lastVisit: "2026-08-18" },
  { id: "c_4", name: "Devon Carter", phone: "(555) 222-1010", email: "devon.carter@example.com", vehicle: "2020 Ford F-150", totalSpent: 179, visits: 1, lastVisit: "2026-06-14" },
  { id: "c_5", name: "Aisha Khan", phone: "(555) 333-7788", email: "aisha.khan@example.com", vehicle: "2023 Audi Q7", totalSpent: 698, visits: 2, lastVisit: "2026-08-10" },
  { id: "c_6", name: "Sam Whitfield", phone: "(555) 444-9922", email: "sam.whitfield@example.com", vehicle: "2018 Subaru Outback", totalSpent: 413, visits: 6, lastVisit: "2026-08-17" },
];

export type Message = {
  id: string;
  customerName: string;
  phone: string;
  preview: string;
  timestamp: string;
  unread: boolean;
  direction: "inbound" | "outbound";
};

export const messages: Message[] = [
  { id: "m_1", customerName: "Jane Doe", phone: "(555) 123-4567", preview: "Sounds good, see you at 10am!", timestamp: "9:41 AM", unread: true, direction: "inbound" },
  { id: "m_2", customerName: "Marcus Lee", phone: "(555) 987-6543", preview: "Reminder: your detail is scheduled for tomorrow at 2pm.", timestamp: "Yesterday", unread: false, direction: "outbound" },
  { id: "m_3", customerName: "Aisha Khan", phone: "(555) 333-7788", preview: "Can we push to Thursday instead?", timestamp: "Yesterday", unread: true, direction: "inbound" },
  { id: "m_4", customerName: "Rosa Fernandez", phone: "(555) 555-0134", preview: "Thanks for booking! We'll text a reminder 24h before.", timestamp: "Mon", unread: false, direction: "outbound" },
  { id: "m_5", customerName: "Sam Whitfield", phone: "(555) 444-9922", preview: "Great service as always 👍", timestamp: "Aug 17", unread: false, direction: "inbound" },
];

export const dashboardActivity = [
  { id: "a_1", text: "New booking request from Devon Carter", time: "12m ago" },
  { id: "a_2", text: "Aisha Khan's detail marked In Progress", time: "1h ago" },
  { id: "a_3", text: "SMS reminder sent to Marcus Lee", time: "2h ago" },
  { id: "a_4", text: "Priya Patel's Essential Wash completed", time: "Yesterday" },
];

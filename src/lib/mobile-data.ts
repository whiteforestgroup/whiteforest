// Mock data for the mobile field-tech app (/mobile). Static until it has a
// real backend — mirrors the shape of the desktop admin's mock data but
// tuned for what a technician needs on-site.

export type JobStatus =
  "on-track" | "later" | "scheduled" | "confirm" | "completed";

export type MobileJob = {
  id: string;
  customerName: string;
  address: string;
  city: string;
  vehicle: string;
  service: string;
  price: number;
  date: string; // yyyy-MM-dd
  startHour: number; // 24h, e.g. 9 = 9:00am
  durationHours: number;
  status: JobStatus;
  beforePhoto: boolean;
  afterPhoto: boolean;
};

export const jobs: MobileJob[] = [
  {
    id: "j_1",
    customerName: "Elijah White",
    address: "98 Genevieve Ct",
    city: "Stafford, VA",
    vehicle: "2021 Toyota Camry",
    service: "Full Detail",
    price: 159,
    date: "2026-08-26",
    startHour: 9,
    durationHours: 3,
    status: "on-track",
    beforePhoto: true,
    afterPhoto: false,
  },
  {
    id: "j_2",
    customerName: "Hassan White",
    address: "412 Colonial Ave",
    city: "Stafford, VA",
    vehicle: "2020 Jeep Cherokee",
    service: "Ceramic Coat",
    price: 299,
    date: "2026-08-26",
    startHour: 11.5,
    durationHours: 4,
    status: "confirm",
    beforePhoto: false,
    afterPhoto: false,
  },
  {
    id: "j_3",
    customerName: "Megan P.",
    address: "77 Larkspur Dr",
    city: "Stafford, VA",
    vehicle: "2019 Mazda CX-5",
    service: "Wash & Wax",
    price: 99,
    date: "2026-08-27",
    startHour: 10,
    durationHours: 2,
    status: "scheduled",
    beforePhoto: false,
    afterPhoto: false,
  },
  {
    id: "j_4",
    customerName: "Dana R.",
    address: "1201 Market St",
    city: "Stafford, VA",
    vehicle: "2022 Subaru Forester",
    service: "Interior Detail",
    price: 125,
    date: "2026-08-27",
    startHour: 13,
    durationHours: 2,
    status: "completed",
    beforePhoto: true,
    afterPhoto: true,
  },
  {
    id: "j_5",
    customerName: "Tom K.",
    address: "55 Birchwood Ln",
    city: "Stafford, VA",
    vehicle: "2018 Honda Accord",
    service: "Basic Full Detail",
    price: 89,
    date: "2026-08-24",
    startHour: 10.5,
    durationHours: 1.5,
    status: "later",
    beforePhoto: false,
    afterPhoto: false,
  },
];

export const jobStatusLabel: Record<JobStatus, string> = {
  "on-track": "On track",
  later: "Later",
  scheduled: "Scheduled",
  confirm: "Confirm?",
  completed: "Completed",
};

export const jobStatusClass: Record<JobStatus, string> = {
  "on-track": "bg-[#2f4a28] text-white",
  later: "bg-amber-100 text-amber-800",
  scheduled: "bg-[#2f4a28] text-white",
  confirm: "bg-sky-600 text-white",
  completed: "bg-stone-200 text-stone-600",
};

export type MobileCustomer = {
  id: string;
  name: string;
  phone: string;
  address: string;
  city: string;
  stage: string;
  leadSource: string;
  history: { label: string; date: string }[];
};

export const mobileCustomers: MobileCustomer[] = [
  {
    id: "mc_1",
    name: "Elijah White",
    phone: "973-356-5625",
    address: "98 Genevieve Ct",
    city: "Stafford, VA",
    stage: "Completed",
    leadSource: "Referral",
    history: [
      { label: "Full Detail — completed", date: "Aug 22, 2026" },
      { label: "45 Min Consultation", date: "Jul 18, 2026" },
    ],
  },
  {
    id: "mc_2",
    name: "Hassan White",
    phone: "919-443-2210",
    address: "412 Colonial Ave",
    city: "Stafford, VA",
    stage: "Scheduled",
    leadSource: "Google",
    history: [{ label: "Ceramic Coat quoted", date: "Aug 20, 2026" }],
  },
  {
    id: "mc_3",
    name: "Megan P.",
    phone: "984-201-7734",
    address: "77 Larkspur Dr",
    city: "Stafford, VA",
    stage: "Scheduled",
    leadSource: "Website",
    history: [{ label: "Wash & Wax booked", date: "Aug 19, 2026" }],
  },
];

export type PipelineStage = { id: string; label: string; count: number };

export const pipelineStages: PipelineStage[] = [
  { id: "new", label: "New Lead", count: 147 },
  { id: "follow-up", label: "Follow Up", count: 8 },
  { id: "booked", label: "Booked", count: 23 },
  { id: "quoted", label: "Quoted", count: 12 },
];

export type PipelineCustomer = {
  id: string;
  stageId: string;
  name: string;
  note: string;
  idleDays: number;
};

export const pipelineCustomers: PipelineCustomer[] = [
  {
    id: "pc_1",
    stageId: "follow-up",
    name: "Dana R.",
    note: "Interior Detail quoted",
    idleDays: 3,
  },
  {
    id: "pc_2",
    stageId: "follow-up",
    name: "Tom K.",
    note: "Ceramic coating quoted",
    idleDays: 7,
  },
  {
    id: "pc_3",
    stageId: "follow-up",
    name: "Priya S.",
    note: "Fleet wash inquiry",
    idleDays: 1,
  },
  {
    id: "pc_4",
    stageId: "new",
    name: "Marcus L.",
    note: "Submitted contact form",
    idleDays: 0,
  },
  {
    id: "pc_5",
    stageId: "booked",
    name: "Rosa F.",
    note: "Signature Detail — Aug 23",
    idleDays: 2,
  },
];

export type Invoice = {
  id: string;
  customerName: string;
  amount: number;
  date: string;
  status: "Paid" | "Sent" | "Overdue" | "Draft";
};

export const invoices: Invoice[] = [
  {
    id: "inv_1",
    customerName: "Elijah White",
    amount: 159,
    date: "Aug 22",
    status: "Paid",
  },
  {
    id: "inv_2",
    customerName: "Megan P.",
    amount: 125,
    date: "Aug 24",
    status: "Sent",
  },
  {
    id: "inv_3",
    customerName: "Tom K.",
    amount: 299,
    date: "Aug 10",
    status: "Overdue",
  },
  {
    id: "inv_4",
    customerName: "Dana R.",
    amount: 70,
    date: "",
    status: "Draft",
  },
];

export const invoiceStatusClass: Record<Invoice["status"], string> = {
  Paid: "bg-[#2f4a28] text-white",
  Sent: "bg-sky-600 text-white",
  Overdue: "bg-red-600 text-white",
  Draft: "bg-stone-200 text-stone-600",
};

export type MobileService = {
  id: string;
  name: string;
  duration: string;
  price: number;
  originalPrice?: number;
};

export const mobileServices: MobileService[] = [
  {
    id: "ms_1",
    name: "Standard Wash & Wax",
    duration: "90 min",
    price: 99,
    originalPrice: 125,
  },
  { id: "ms_2", name: "1-Year Ceramic Coat", duration: "6 hr", price: 299 },
  { id: "ms_3", name: "Basic Interior Detail", duration: "75 min", price: 75 },
];

export type Expense = {
  id: string;
  vendor: string;
  category: string;
  date: string;
  amount: number;
};

export const expenses: Expense[] = [
  {
    id: "e_1",
    vendor: "AutoZone",
    category: "Supplies",
    date: "Aug 24",
    amount: 84.2,
  },
  {
    id: "e_2",
    vendor: "Shell",
    category: "Fuel",
    date: "Aug 22",
    amount: 61.1,
  },
  {
    id: "e_3",
    vendor: "Chemical Guys",
    category: "Supplies",
    date: "Aug 19",
    amount: 142.75,
  },
];

export const expensesThisMonth = expenses.reduce((sum, e) => sum + e.amount, 0);

import { config } from "dotenv";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client";

config({ path: ".env.local" });

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const db = new PrismaClient({ adapter });

function parseVehicle(vehicle: string) {
  const match = vehicle.match(/^(\d{4})\s+(\S+)\s+(.+)$/);
  if (!match) return { year: null, make: null, model: vehicle };
  const [, year, make, model] = match;
  return { year: Number(year), make, model };
}

async function main() {
  console.log("Seeding...");

  await db.message.deleteMany();
  await db.payment.deleteMany();
  await db.invoice.deleteMany();
  await db.booking.deleteMany();
  await db.vehicle.deleteMany();
  await db.customer.deleteMany();
  await db.service.deleteMany();
  await db.staff.deleteMany();
  await db.expense.deleteMany();
  await db.pipelineStage.deleteMany();

  const [newLead, followUp, booked, quoted] = await Promise.all([
    db.pipelineStage.create({
      data: { name: "New Lead", order: 0, color: "stone" },
    }),
    db.pipelineStage.create({
      data: { name: "Follow Up", order: 1, color: "amber" },
    }),
    db.pipelineStage.create({
      data: { name: "Booked", order: 2, color: "blue" },
    }),
    db.pipelineStage.create({
      data: { name: "Quoted", order: 3, color: "purple" },
    }),
  ]);

  const owner = await db.staff.create({
    data: {
      name: "Whiteforest Admin",
      email: "admin@whiteforest-group.com",
      role: "OWNER",
    },
  });
  const tech = await db.staff.create({
    data: {
      name: "Alex Rivera",
      email: "alex@whiteforest-group.com",
      role: "TECHNICIAN",
    },
  });

  const services = await Promise.all(
    [
      { name: "Essential Wash", durationMinutes: 45, price: 59 },
      { name: "Signature Detail", durationMinutes: 150, price: 179 },
      { name: "Ultimate Correction", durationMinutes: 300, price: 349 },
      {
        name: "Standard Wash & Wax",
        durationMinutes: 90,
        price: 99,
        originalPrice: 125,
      },
      { name: "1-Year Ceramic Coat", durationMinutes: 360, price: 299 },
      { name: "Basic Interior Detail", durationMinutes: 75, price: 75 },
    ].map((s) => db.service.create({ data: s })),
  );
  const serviceByName = Object.fromEntries(services.map((s) => [s.name, s]));

  const customerSeeds = [
    {
      firstName: "Jane",
      lastName: "Doe",
      phone: "(555) 123-4567",
      email: "jane.doe@example.com",
      vehicle: "2022 Tesla Model Y",
      stage: booked,
      leadSource: "Referral",
    },
    {
      firstName: "Marcus",
      lastName: "Lee",
      phone: "(555) 987-6543",
      email: "marcus.lee@example.com",
      vehicle: "2019 BMW X5",
      stage: booked,
      leadSource: "Google",
    },
    {
      firstName: "Priya",
      lastName: "Patel",
      phone: "(555) 456-7890",
      email: "priya.patel@example.com",
      vehicle: "2021 Honda Civic",
      stage: booked,
      leadSource: "Website",
    },
    {
      firstName: "Devon",
      lastName: "Carter",
      phone: "(555) 222-1010",
      email: "devon.carter@example.com",
      vehicle: "2020 Ford F-150",
      stage: newLead,
      leadSource: "Website",
    },
    {
      firstName: "Aisha",
      lastName: "Khan",
      phone: "(555) 333-7788",
      email: "aisha.khan@example.com",
      vehicle: "2023 Audi Q7",
      stage: booked,
      leadSource: "Referral",
    },
    {
      firstName: "Sam",
      lastName: "Whitfield",
      phone: "(555) 444-9922",
      email: "sam.whitfield@example.com",
      vehicle: "2018 Subaru Outback",
      stage: booked,
      leadSource: "Walk-In",
    },
    {
      firstName: "Rosa",
      lastName: "Fernandez",
      phone: "(555) 555-0134",
      email: "rosa.fernandez@example.com",
      vehicle: "2022 Kia Telluride",
      stage: booked,
      leadSource: "Google",
    },
    {
      firstName: "Elijah",
      lastName: "White",
      phone: "973-356-5625",
      email: "elijah.white@example.com",
      vehicle: "2021 Toyota Camry",
      stage: booked,
      leadSource: "Referral",
      address: "98 Genevieve Ct",
      city: "Stafford",
      state: "VA",
    },
    {
      firstName: "Hassan",
      lastName: "White",
      phone: "919-443-2210",
      email: "hassan.white@example.com",
      vehicle: "2020 Jeep Cherokee",
      stage: booked,
      leadSource: "Google",
      address: "412 Colonial Ave",
      city: "Stafford",
      state: "VA",
    },
    {
      firstName: "Megan",
      lastName: "P.",
      phone: "984-201-7734",
      email: "megan.p@example.com",
      vehicle: "2019 Mazda CX-5",
      stage: booked,
      leadSource: "Website",
      address: "77 Larkspur Dr",
      city: "Stafford",
      state: "VA",
    },
    {
      firstName: "Dana",
      lastName: "R.",
      phone: "(555) 010-2020",
      email: "dana.r@example.com",
      vehicle: "2022 Subaru Forester",
      stage: followUp,
      leadSource: "Website",
      notes: "Interior Detail quoted",
    },
    {
      firstName: "Tom",
      lastName: "K.",
      phone: "(555) 010-2021",
      email: "tom.k@example.com",
      vehicle: "2018 Honda Accord",
      stage: followUp,
      leadSource: "Referral",
      notes: "Ceramic coating quoted",
    },
    {
      firstName: "Priya",
      lastName: "S.",
      phone: "(555) 010-2022",
      email: "priya.s@example.com",
      vehicle: "2020 Toyota RAV4",
      stage: followUp,
      leadSource: "Website",
      notes: "Fleet wash inquiry",
    },
    {
      firstName: "Marcus",
      lastName: "L.",
      phone: "(555) 010-2023",
      email: "marcus.l@example.com",
      vehicle: "2021 Chevrolet Silverado",
      stage: newLead,
      leadSource: "Website",
      notes: "Submitted contact form",
    },
    {
      firstName: "Nadia",
      lastName: "F.",
      phone: "(555) 010-2024",
      email: "nadia.f@example.com",
      vehicle: "2023 Lexus RX",
      stage: quoted,
      leadSource: "Referral",
      notes: "Ultimate Correction quoted, awaiting reply",
    },
  ];

  const customers: {
    customer: Awaited<ReturnType<typeof db.customer.create>>;
    vehicle: Awaited<ReturnType<typeof db.vehicle.create>>;
  }[] = [];
  for (const seed of customerSeeds) {
    const { vehicle, stage, ...data } = seed;
    const customer = await db.customer.create({
      data: { ...data, stageId: stage.id },
    });
    const v = parseVehicle(vehicle);
    const createdVehicle = await db.vehicle.create({
      data: {
        customerId: customer.id,
        year: v.year,
        make: v.make,
        model: v.model,
      },
    });
    customers.push({ customer, vehicle: createdVehicle });
  }

  const byName = (first: string, last: string) =>
    customers.find(
      (c) => c.customer.firstName === first && c.customer.lastName === last,
    )!;

  const bookingSeeds = [
    {
      who: ["Jane", "Doe"],
      service: "Signature Detail",
      status: "NEW" as const,
      scheduledAt: "2026-08-19T09:00:00",
    },
    {
      who: ["Marcus", "Lee"],
      service: "Ultimate Correction",
      status: "SCHEDULED" as const,
      scheduledAt: "2026-08-20T00:00:00",
    },
    {
      who: ["Priya", "Patel"],
      service: "Essential Wash",
      status: "COMPLETED" as const,
      scheduledAt: "2026-08-18T00:00:00",
    },
    {
      who: ["Aisha", "Khan"],
      service: "Ultimate Correction",
      status: "IN_PROGRESS" as const,
      scheduledAt: "2026-08-22T00:00:00",
    },
    {
      who: ["Sam", "Whitfield"],
      service: "Essential Wash",
      status: "COMPLETED" as const,
      scheduledAt: "2026-08-17T00:00:00",
    },
    {
      who: ["Rosa", "Fernandez"],
      service: "Signature Detail",
      status: "SCHEDULED" as const,
      scheduledAt: "2026-08-23T00:00:00",
    },
    {
      who: ["Elijah", "White"],
      service: "Standard Wash & Wax",
      status: "SCHEDULED" as const,
      scheduledAt: "2026-08-26T09:00:00",
      assignedTo: tech,
      durationMinutes: 180,
    },
    {
      who: ["Hassan", "White"],
      service: "1-Year Ceramic Coat",
      status: "NEW" as const,
      scheduledAt: "2026-08-26T11:30:00",
      assignedTo: tech,
      durationMinutes: 240,
    },
    {
      who: ["Megan", "P."],
      service: "Standard Wash & Wax",
      status: "SCHEDULED" as const,
      scheduledAt: "2026-08-27T10:00:00",
      assignedTo: tech,
      durationMinutes: 120,
    },
  ];

  for (const b of bookingSeeds) {
    const { customer, vehicle } = byName(b.who[0], b.who[1]);
    const service = serviceByName[b.service];
    await db.booking.create({
      data: {
        customerId: customer.id,
        vehicleId: vehicle.id,
        serviceId: service.id,
        assignedToId: b.assignedTo?.id ?? owner.id,
        status: b.status,
        scheduledAt: new Date(b.scheduledAt),
        durationMinutes: b.durationMinutes ?? service.durationMinutes,
        price: service.price,
        address: customer.address ?? "Springfield",
      },
    });
  }

  await db.invoice.createMany({
    data: [
      {
        customerId: byName("Elijah", "White").customer.id,
        amount: 159,
        status: "PAID",
        paidAt: new Date("2026-08-22"),
      },
      {
        customerId: byName("Megan", "P.").customer.id,
        amount: 125,
        status: "SENT",
        dueDate: new Date("2026-08-31"),
      },
      {
        customerId: byName("Tom", "K.").customer.id,
        amount: 299,
        status: "OVERDUE",
        dueDate: new Date("2026-08-15"),
      },
      {
        customerId: byName("Dana", "R.").customer.id,
        amount: 70,
        status: "DRAFT",
      },
    ],
  });

  await db.message.createMany({
    data: [
      {
        customerId: byName("Jane", "Doe").customer.id,
        direction: "INBOUND",
        body: "Sounds good, see you at 10am!",
        read: false,
      },
      {
        customerId: byName("Marcus", "Lee").customer.id,
        direction: "OUTBOUND",
        body: "Reminder: your detail is scheduled for tomorrow at 2pm.",
        read: true,
      },
      {
        customerId: byName("Aisha", "Khan").customer.id,
        direction: "INBOUND",
        body: "Can we push to Thursday instead?",
        read: false,
      },
      {
        customerId: byName("Rosa", "Fernandez").customer.id,
        direction: "OUTBOUND",
        body: "Thanks for booking! We'll text a reminder 24h before.",
        read: true,
      },
      {
        customerId: byName("Sam", "Whitfield").customer.id,
        direction: "INBOUND",
        body: "Great service as always \u{1F44D}",
        read: true,
      },
    ],
  });

  await db.expense.createMany({
    data: [
      {
        vendor: "AutoZone",
        category: "Supplies",
        amount: 84.2,
        date: new Date("2026-08-24"),
      },
      {
        vendor: "Shell",
        category: "Fuel",
        amount: 61.1,
        date: new Date("2026-08-22"),
      },
      {
        vendor: "Chemical Guys",
        category: "Supplies",
        amount: 142.75,
        date: new Date("2026-08-19"),
      },
    ],
  });

  console.log(
    `Seeded ${customers.length} customers, ${bookingSeeds.length} bookings, ${services.length} services.`,
  );
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => db.$disconnect());

const NAV_ITEMS = [
  { label: "Dashboard", href: "/" },
  { label: "Bookings", href: "/bookings" },
  { label: "Customers", href: "/customers" },
];

export function Sidebar() {
  return (
    <aside className="flex w-60 shrink-0 flex-col border-r border-slate-200 bg-white">
      <div className="border-b border-slate-200 px-6 py-5">
        <span className="text-lg font-semibold tracking-tight text-slate-900">
          Detailing CRM
        </span>
      </div>
      <nav className="flex flex-1 flex-col gap-1 p-3">
        {NAV_ITEMS.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900"
          >
            {item.label}
          </a>
        ))}
      </nav>
    </aside>
  );
}

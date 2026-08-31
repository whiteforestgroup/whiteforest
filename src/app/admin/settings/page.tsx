import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { tenant } from "@/lib/tenant";

export default function SettingsPage() {
  const rows = [
    { label: "Business name", value: tenant.businessName },
    { label: "Tagline", value: tenant.tagline },
    { label: "Phone", value: tenant.phone },
    { label: "Email", value: tenant.email },
    { label: "Service area", value: tenant.serviceArea },
  ];

  return (
    <div>
      <h1 className="text-fg text-2xl font-bold tracking-tight">Settings</h1>
      <p className="text-fg-muted mt-1 text-sm">
        Business info and branding for this workspace.
      </p>

      <Card className="mt-8 py-0">
        <CardHeader className="pt-4">
          <CardTitle>Business</CardTitle>
        </CardHeader>
        <CardContent className="divide-card-border divide-y pb-4">
          {rows.map((row) => (
            <div
              key={row.label}
              className="flex items-center justify-between py-3"
            >
              <span className="text-fg-muted text-sm">{row.label}</span>
              <span className="text-fg font-medium">{row.value}</span>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="mt-6 py-0">
        <CardHeader className="pt-4">
          <CardTitle>Brand Colors</CardTitle>
        </CardHeader>
        <CardContent className="flex gap-4 pb-4">
          {Object.entries(tenant.colors).map(([name, hex]) => (
            <div key={name} className="text-center">
              <div
                className="border-card-border h-10 w-10 rounded-full border"
                style={{ backgroundColor: hex }}
              />
              <p className="text-fg-muted mt-1.5 text-xs capitalize">{name}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

// White-label config: swap this file's contents (or load it from a DB/CMS)
// per client business to re-skin the entire client-facing site.
export type TenantConfig = {
  businessName: string;
  tagline: string;
  phone: string;
  email: string;
  address: string;
  serviceArea: string;
  colors: {
    primary: string;
    primaryDark: string;
    accent: string;
  };
};

export const tenant: TenantConfig = {
  businessName: "Prestige Auto Detailing",
  tagline: "Showroom-quality detailing, brought to your driveway.",
  phone: "(555) 010-2024",
  email: "hello@prestigeautodetailing.com",
  address: "123 Main St, Springfield",
  serviceArea: "Springfield & surrounding areas",
  colors: {
    primary: "#0f172a",
    primaryDark: "#020617",
    accent: "#f59e0b",
  },
};

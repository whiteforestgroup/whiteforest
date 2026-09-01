import { Hero } from "@/components/Hero";
import { ServicePackages } from "@/components/ServicePackages";
import { ContactCta } from "@/components/ContactCta";

export default function Home() {
  return (
    <>
      <Hero />
      <ServicePackages />
      <ContactCta />
    </>
  );
}

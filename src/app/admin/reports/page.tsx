import { BarChart3 } from "lucide-react";
import { ComingSoon } from "@/components/ComingSoon";

export default function ReportsPage() {
  return (
    <ComingSoon
      title="Reports"
      description="Revenue, conversion, and technician performance over time."
      icon={BarChart3}
      bullets={[
        "Revenue by service, technician, and lead source",
        "Lead-to-booking conversion rate",
        "Customer lifetime value",
        "Exportable monthly summaries",
      ]}
    />
  );
}

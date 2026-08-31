import { Zap } from "lucide-react";
import { ComingSoon } from "@/components/ComingSoon";

export default function AutomationsPage() {
  return (
    <ComingSoon
      title="Automations"
      description="Trigger follow-ups and reminders automatically as customers move through the pipeline."
      icon={Zap}
      bullets={[
        "Idle-lead follow-up texts (e.g. 3 days with no reply)",
        "Appointment reminders 24h before a job",
        "Post-job review requests",
        "Missed-call text-back",
      ]}
    />
  );
}

import { PipelineStageList } from "@/components/mobile/PipelineStageList";
import { getPipelineStagesWithCustomers } from "@/lib/queries";
import { db } from "@/lib/db";

export default async function PipelinePage() {
  const [stages, totalCustomers] = await Promise.all([
    getPipelineStagesWithCustomers(),
    db.customer.count(),
  ]);

  return <PipelineStageList stages={stages} totalCustomers={totalCustomers} />;
}

import { PipelineBoard } from "@/components/PipelineBoard";

export default function PipelinePage() {
  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight text-neutral-900">
        Pipeline
      </h1>
      <p className="mt-1 text-sm text-neutral-500">
        Drag jobs between stages as they move through your workflow.
      </p>
      <PipelineBoard />
    </div>
  );
}

import { Button } from "@mantine/core";
import { RefreshCw, ServerCrash } from "lucide-react";

export function ServiceUnavailable() {
  return (
    <div className="min-h-screen bg-stone-50 flex flex-col items-center justify-center gap-6 px-6 text-center">
      <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-stone-100 border border-stone-200">
        <ServerCrash size={32} className="text-stone-400" />
      </div>

      <div className="max-w-sm space-y-3">
        <p className="text-xs font-semibold tracking-widest uppercase text-stone-400">
          SparkTool
        </p>
        <h1 className="text-xl font-bold text-stone-900">
          Service Temporarily Unavailable
        </h1>
        <p className="text-sm leading-relaxed text-stone-500">
          The platform could not be reached. This is usually a temporary issue.
          Please check your connection and try again.
        </p>
      </div>

      <Button
        color="green"
        leftSection={<RefreshCw size={15} />}
        onClick={() => window.location.reload()}
        variant="filled"
      >
        Try Again
      </Button>
    </div>
  );
}

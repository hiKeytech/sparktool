import { Button } from "@mantine/core";
import { RefreshCw, ServerCrash } from "lucide-react";

export function ServiceUnavailable() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-(--app-bg) px-6 text-center">
      <div className="flex items-center justify-center w-16 h-16 rounded-2xl border bg-(--app-surface-soft) border-(--app-border)">
        <ServerCrash size={32} className="text-(--app-text-subtle)" />
      </div>

      <div className="max-w-sm space-y-3">
        <p className="text-xs font-semibold tracking-widest uppercase text-(--app-text-subtle)">
          SparkTool
        </p>
        <h1 className="text-xl font-bold text-(--app-text)">
          Service Temporarily Unavailable
        </h1>
        <p className="text-sm leading-relaxed text-(--app-text-muted)">
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

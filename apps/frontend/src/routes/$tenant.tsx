import { Link, createFileRoute, Outlet } from "@tanstack/react-router";
import { useLayoutEffect } from "react";

import { getTenant } from "@/actions/tenant";
import type { Tenant } from "@/schemas/tenant-contract";
import { applyBrandingTheme } from "@/utils/branding-theme";

export const Route = createFileRoute("/$tenant")({
  beforeLoad: async ({ params }: { params: { tenant: string } }) => {
    const tenant = await getTenant({ data: params.tenant });

    if (!tenant) {
      throw new Error(`Tenant '${params.tenant}' was not found.`);
    }

    return {
      tenant,
    };
  },
  component: TenantParamLayout,
  errorComponent: TenantLookupError,
});

function TenantParamLayout() {
  const { tenant } = Route.useRouteContext() as { tenant: Tenant };

  useLayoutEffect(() => {
    if (tenant?.config.branding) {
      applyBrandingTheme({
        ...tenant.config.branding,
        description: tenant.config.publicSite.heroDescription,
      });
    }
  }, [tenant]);

  return <Outlet />;
}

function TenantLookupError() {
  useLayoutEffect(() => {
    document.title = "Tenant not found";
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-stone-50 px-6 py-12">
      <div className="w-full max-w-lg rounded-lg border border-stone-200 bg-white p-8 shadow-sm">
        <h1 className="font-sans text-2xl font-semibold text-stone-900">
          Tenant not found
        </h1>
        <p className="mt-3 font-sans text-sm leading-6 text-stone-600">
          The tenant URL you visited does not match any configured workspace.
          Check the address and try again, or return to the platform entry.
        </p>
        <div className="mt-6 flex gap-3">
          <Link
            className="inline-flex rounded-md bg-fun-green-800 px-4 py-2 font-sans text-sm font-medium text-white hover:bg-fun-green-700"
            to="/"
          >
            Go to platform
          </Link>
        </div>
      </div>
    </div>
  );
}

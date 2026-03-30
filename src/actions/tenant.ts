import { createServerFn } from "@tanstack/react-start";
import { getRequest } from "@tanstack/react-start/server";
import { TenantService } from "@/services/tenant-service";

export const getTenant = createServerFn({ method: "GET" }).handler(async () => {
    const request = getRequest();
    
    // Strict Host-Based Resolution
    // We trust the Host header to be the source of truth for the tenant.
    // The external infrastructure (proxy/rewrite) ensures this Host matches a tenant's configured domain or subdomain.
    const host = request.headers.get("x-forwarded-host") || request.headers.get("host");

    if (!host) {
        console.error("No Host header found in request");
        return null;
    }

    // Pass the raw Host to the service
    // The service handles:
    // 1. Is 'host' a custom domain?
    // 2. Is 'host' a subdomain (ID)?
    const tenant = await TenantService.getTenantByHost(host);

    return tenant;
});

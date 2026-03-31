import type { Tenant } from "@/schemas/tenant-contract";
import type { User } from "@/types";

export interface TenantPageProps {
  tenant: Tenant;
}

export interface UserPageProps {
  user: User;
}

export interface TenantUserPageProps extends TenantPageProps, UserPageProps {}

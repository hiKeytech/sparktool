import { EmailPasswordStrategy } from "./strategies/email-password-strategy";

interface AuthStrategyResolverProps {
  allowSignup?: boolean;
  restrictedDomains?: string[];
  strategies: Array<{
    type: "email-password" | "sso";
    config: any;
    label?: string;
  }>;
}

export function AuthStrategyResolver({ allowSignup = false, restrictedDomains, strategies }: AuthStrategyResolverProps) {
  if (!strategies || strategies.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      {strategies.map((strategy, index) => {
        switch (strategy.type) {
          case "email-password":
            return (
              <EmailPasswordStrategy
                allowSignup={allowSignup}
                config={strategy.config}
                key={index}
                label={strategy.label}
                restrictedDomains={restrictedDomains}
              />
            );
          case "sso":
             return <div key={index} className="text-gray-500 text-sm">SSO strategy not yet implemented</div>;
          default:
            return <div key={index} className="text-red-500">Unsupported strategy: {strategy.type}</div>;
        }
      })}
    </div>
  );
}

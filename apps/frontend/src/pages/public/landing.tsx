import {
  Badge,
  Button,
  Card,
  Container,
  Group,
  SimpleGrid,
  
  Text,
  Title,
} from "@mantine/core";
import {
  ArrowRight,
  Atom,
  Brain,
  Briefcase,
  ChartLine,
  ChevronRight,
  Cpu,
  Globe,
  Heart,
  type LucideIcon,
  Monitor,
  Palette,
  ShieldCheck,
  Users,
} from "lucide-react";
import { useNavigate } from "@tanstack/react-router";

import type { Tenant } from "@/schemas/tenant-contract";
import { useListCourses } from "@/services/hooks";
import { resolveLoginTarget } from "@/utils/tenant-paths";

interface LandingProps {
  tenant: Tenant;
}

const categoryIconMap: Record<string, LucideIcon> = {
  atom: Atom,
  brain: Brain,
  briefcase: Briefcase,
  "chart-line": ChartLine,
  cpu: Cpu,
  "device-desktop": Monitor,
  globe: Globe,
  heart: Heart,
  palette: Palette,
  users: Users,
};

export default function Landing({ tenant }: LandingProps) {
  const navigate = useNavigate();
  const loginPath = resolveLoginTarget(tenant.id);
  const { data: courses = [], isLoading } = useListCourses(tenant.id);

  const displayedCourses = courses.slice(0, 3);
  const { logoUrl, portalName } = tenant.config.branding;

  return (
    <div className="min-h-screen bg-[#070b09] text-stone-300 font-sans selection:bg-fun-green-500/30 selection:text-white">
      {/* 
      ========================================================================
      GLOBAL NAVIGATION (DARK)
      ========================================================================
      */}
      <nav className="fixed top-0 w-full bg-[#070b09]/80 backdrop-blur-md border-b border-white/5 z-50 transition-all duration-300">
        <Container size="xl" className="h-20 flex items-center justify-between">
          <Group gap="sm">
            {logoUrl && logoUrl !== "/logo.png" ? (
              <img
                src={logoUrl}
                alt={`${portalName} Logo`}
                className="h-8 w-auto object-contain brightness-0 invert"
                loading="lazy"
              />
            ) : (
              <div className="flex items-center gap-3">
                <div className="bg-white/5 border border-white/10 p-2 rounded-xl flex items-center justify-center">
                  <ShieldCheck size={24} className="text-fun-green-400" />
                </div>
                <div className="flex flex-col">
                  <Text className="text-white text-sm font-bold tracking-tight">
                    {portalName}
                  </Text>
                  <Text className="text-white/40 text-[10px] font-bold tracking-[0.2em] uppercase">
                    Secure Gateway
                  </Text>
                </div>
              </div>
            )}
          </Group>
          <Group gap="md">
            <Button
              variant="subtle"
              color="gray"
              className="text-white/60 hover:text-white hover:bg-white/5 transition-colors h-10 px-5 text-sm font-semibold tracking-wide"
            >
              Curriculum
            </Button>
            <Button
              onClick={() => navigate({ to: loginPath } as any)}
              className="h-10 px-6 rounded-xl bg-fun-green-700 hover:bg-fun-green-600 text-white font-bold tracking-wider text-xs uppercase transition-all shadow-[0_0_20px_rgba(29,79,53,0.4)]"
            >
              Authenticate
            </Button>
          </Group>
        </Container>
      </nav>

      {/* 
      ========================================================================
      HERO SECTION (COMMAND SUITE)
      ========================================================================
      */}
      <div className="relative pt-40 pb-24 lg:pt-48 lg:pb-32 overflow-hidden border-b border-white/5">
        {/* Deep background mesh & gradients */}
        <div className="absolute inset-0 bg-[#070b09] -z-20" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_#1d4f35_0%,_transparent_40%),radial-gradient(circle_at_bottom_left,_#0f291c_0%,_transparent_40%)] opacity-60 -z-10" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] -z-10" />

        <Container size="xl" className="relative z-10 text-center">
          <Badge
            radius="sm"
            variant="outline"
            className="mb-8 border-fun-green-500/30 text-fun-green-400 bg-fun-green-500/10 px-4 py-1.5 text-[10px] tracking-[0.2em] font-bold uppercase"
          >
            RESTRICTED ACCESS PROTOCOL
          </Badge>

          <Title
            order={1}
            className="text-white text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tighter max-w-4xl mx-auto leading-[1.1] mb-6"
            style={{ textShadow: "0 4px 24px rgba(0,0,0,0.4)" }}
          >
            Enter The Grid
          </Title>

          <Text className="text-stone-400 text-lg sm:text-xl max-w-2xl mx-auto font-light leading-relaxed mb-10">
            Secure, encrypted access to the core infrastructure modules. Verify identity to establish an active session.
          </Text>

          <Group justify="center" gap="md">
            <Button
              onClick={() => navigate({ to: loginPath } as any)}
              size="xl"
              rightSection={<ArrowRight size={18} />}
              className="bg-fun-green-600 hover:bg-fun-green-500 text-white border-0 shadow-[0_0_30px_rgba(29,79,53,0.5)] transition-all font-bold tracking-widest text-xs uppercase px-10 h-14 rounded-xl"
            >
              {"Initialize Handshake"}
            </Button>
            <Button
              size="xl"
              variant="default"
              className="bg-white/5 hover:bg-white/10 text-white border-white/10 transition-all font-bold tracking-widest text-xs uppercase px-10 h-14 rounded-xl"
            >
              View Documentation
            </Button>
          </Group>
        </Container>
      </div>

      {/* 
      ========================================================================
      CATEGORIES GRID
      ========================================================================
      */}
      {true && (
        <section className="py-24 relative border-b border-white/5 bg-[#0a0f0d]">
          <Container size="xl">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-px w-8 bg-fun-green-500" />
                  <Text className="text-[10px] uppercase tracking-[0.2em] font-bold text-fun-green-400">
                    Curriculum Scopes
                  </Text>
                </div>
                <Title order={2} className="text-white text-3xl sm:text-4xl font-bold tracking-tight">
                  Knowledge Directories
                </Title>
              </div>
              <Button
                variant="subtle"
                rightSection={<ArrowRight size={16} />}
                className="text-white/60 hover:text-white hover:bg-white/5 transition-colors font-semibold uppercase tracking-wider text-xs px-4"
              >
                Browse All Nodes
              </Button>
            </div>

            <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }} spacing="lg">
              {[{ id: "1", icon: "shield", title: "Security Ops", description: "Advanced threat mitigation" }, { id: "2", icon: "cpu", title: "System Arch", description: "Distributed logic" }].map((category) => {
                const IconComponent = categoryIconMap[category.icon] || ShieldCheck;
                return (
                  <Card
                    key={category.id}
                    className="bg-white/5 border border-white/10 hover:border-fun-green-500/50 hover:bg-white/[0.07] transition-all group rounded-2xl p-8"
                  >
                    <div className="h-12 w-12 rounded-xl bg-[#070b09] border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:border-fun-green-500/30 transition-transform">
                      <IconComponent size={24} className="text-fun-green-400" />
                    </div>
                    <Text className="text-white font-bold text-lg mb-2 tracking-tight group-hover:text-fun-green-300 transition-colors">
                      {category.title}
                    </Text>
                    <Text className="text-stone-400 text-sm font-light">
                      {category.description}
                    </Text>
                  </Card>
                );
              })}
            </SimpleGrid>
          </Container>
        </section>
      )}

      {/* 
      ========================================================================
      FEATURED COURSES (METRIC CARDS)
      ========================================================================
      */}
      <section className="py-24 relative bg-[#070b09]">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[1px] bg-gradient-to-r from-transparent via-fun-green-500/50 to-transparent" />
        
        <Container size="xl">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-3">
              <div className="h-px w-8 bg-fun-green-500" />
              <Text className="text-[10px] uppercase tracking-[0.2em] font-bold text-fun-green-400">
                Active Modules
              </Text>
              <div className="h-px w-8 bg-fun-green-500" />
            </div>
            <Title order={2} className="text-white text-3xl sm:text-4xl font-bold tracking-tight">
              Featured Security Protocols
            </Title>
            <Text className="text-stone-400 text-sm mt-4 font-light max-w-xl mx-auto">
              High-priority operational modules required for system clearance.
            </Text>
          </div>

          {isLoading ? (
            <div className="flex justify-center py-12">
              <div className="h-8 w-8 rounded-full border-2 border-fun-green-500/30 border-t-fun-green-500 animate-spin" />
            </div>
          ) : (
            <SimpleGrid cols={{ base: 1, md: 3 }} spacing="xl">
              {displayedCourses.map((course) => (
                <Card
                  key={course.id}
                  className="bg-[#0a0f0d] border border-white/10 hover:border-fun-green-500/30 rounded-2xl overflow-hidden transition-all group p-0 flex flex-col h-full"
                >
                  <div className="h-48 relative overflow-hidden bg-[#111815] border-b border-white/5 p-6 flex flex-col justify-end">
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(29,79,53,0.15),_transparent_60%)]" />
                    <div className="relative z-10">
                      <div className="flex items-center gap-2 mb-3">
                         <Badge
                           variant="white"
                           size="sm"
                           className="bg-white/10 text-white tracking-widest uppercase text-[9px] font-bold border-white/10 backdrop-blur-sm"
                         >
                           Level {course.level || "Standard"}
                         </Badge>
                      </div>
                      <Title order={3} className="text-white text-xl font-bold leading-tight tracking-tight group-hover:text-fun-green-300 transition-colors">
                        {course.title}
                      </Title>
                    </div>
                  </div>

                  <div className="p-6 flex flex-col flex-grow">
                    <Text className="text-stone-400 text-sm font-light mb-6 line-clamp-2 leading-relaxed">
                      {course.description}
                    </Text>
                    <div className="mt-auto">
                      <Button
                        variant="subtle"
                        rightSection={<ChevronRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />}
                        className="text-fun-green-400 hover:bg-fun-green-500/10 p-0 font-bold uppercase tracking-wider text-xs h-auto group/btn"
                        onClick={() => navigate({ to: loginPath } as any)}
                      >
                        Access Module
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </SimpleGrid>
          )}

          {!isLoading && displayedCourses.length > 0 && (
            <div className="mt-16 text-center">
              <Button
                variant="outline"
                size="lg"
                onClick={() => navigate({ to: loginPath } as any)}
                className="border-white/10 text-white hover:bg-white/5 font-bold uppercase tracking-wider text-xs h-14 px-8 rounded-xl transition-all"
              >
                Access Full Database
              </Button>
            </div>
          )}
        </Container>
      </section>

      {/* 
      ========================================================================
      FOOTER
      ========================================================================
      */}
      <footer className="border-t border-white/5 bg-[#050806] py-12">
        <Container size="xl" className="flex flex-col md:flex-row items-center justify-between gap-6">
          <Group gap="sm" align="center">
            <ShieldCheck size={20} className="text-stone-600" />
            <Text className="text-stone-600 font-bold tracking-widest text-[10px] uppercase">
              {portalName} © {new Date().getFullYear()}
            </Text>
          </Group>
          <Group gap="xl" className="text-stone-500 text-[10px] font-bold tracking-widest uppercase">
            <a href="#" className="hover:text-stone-300 transition-colors">Protocol Status</a>
            <a href="#" className="hover:text-stone-300 transition-colors">Security Policy</a>
            <a href="#" className="hover:text-stone-300 transition-colors">Terms of Clearance</a>
          </Group>
        </Container>
      </footer>
    </div>
  );
}

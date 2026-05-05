import { createFileRoute, Navigate, useNavigate } from "@tanstack/react-router";
import { useLayoutEffect, useState } from "react";
import { getPlatformConfig } from "@/actions/platform";
import { ServiceUnavailable } from "@/components/service-unavailable";
import { useResolvedAuthState } from "@/providers/auth-provider";
import type { PlatformConfig } from "@/schemas/platform-config";
import { applyBrandingTheme } from "@/utils/branding-theme";
import { resolveRoleHomeTarget } from "@/utils/tenant-paths";
import { TextInput, Textarea } from "@mantine/core";

import {
  Globe,
  Map,
  Briefcase,
  LifeBuoy,
  BookOpen,
  Languages,
  Bot,
  Clock,
  Award,
  LayoutDashboard,
  Layers,
  Activity,
  Landmark,
  HandHeart,
  School,
  User,
  ArrowRight,
  ArrowUpRight,
  Menu,
  X,
} from "lucide-react";

export const Route = createFileRoute("/")({
  beforeLoad: async () => {
    const platform = await getPlatformConfig();
    return { platform };
  },
  component: PlatformLandingRoute,
});

function PlatformLandingRoute() {
  const { platform } = Route.useRouteContext() as {
    platform: PlatformConfig | null;
  };
  const { loading, session, user } = useResolvedAuthState();

  useLayoutEffect(() => {
    if (!platform) return;
    applyBrandingTheme({
      ...platform.branding,
      description: platform.marketing?.heroDescription || "SparkTool Platform",
    });
  }, [platform]);

  if (!platform) return <ServiceUnavailable />;

  if (!loading && user) {
    return (
      <Navigate
        replace
        {...resolveRoleHomeTarget(user.role, session?.tenantIds?.[0])}
      />
    );
  }

  return <PlatformLandingPage />;
}

// ----------------------------------------------------------------------
// DATA
// ----------------------------------------------------------------------
const problems = [
  {
    icon: Globe,
    title: "Language Barriers",
    text: "Most learning content is only available in English or French, leaving out learners who speak other languages.",
  },
  {
    icon: Map,
    title: "No Clear Learning Path",
    text: "Many digital learning tools are scattered and unstructured. Learners don't know where to start or what to do next.",
  },
  {
    icon: Briefcase,
    title: "Skills Don't Match Jobs",
    text: "People graduate with knowledge but not the practical skills employers actually need.",
  },
  {
    icon: LifeBuoy,
    title: "No Support When It's Needed",
    text: "Without access to teachers or mentors, learners struggle, disengage, and drop out.",
  },
];

const features = [
  {
    icon: BookOpen,
    title: "Structured Course Delivery",
    text: "Courses are organised into step-by-step modules. Learners always know what to do next.",
  },
  {
    icon: Languages,
    title: "AI Multilingual Support",
    text: "Our AI converts learning content into multiple languages, so learners can study in the language they understand best.",
  },
  {
    icon: Bot,
    title: "24/7 AI Learning Assistant",
    text: "Our intelligent chatbot answers questions, explains difficult topics, and guides learners at any time of day.",
  },
  {
    icon: Clock,
    title: "Self-Paced and Flexible",
    text: "Whether a learner has one hour a week or several hours a day, SparkTool fits into their life.",
  },
  {
    icon: Award,
    title: "Certificates and Credentials",
    text: "When learners complete a course, they earn a certificate they can use to show employers what they know.",
  },
  {
    icon: LayoutDashboard,
    title: "Institutional Dashboard",
    text: "Track every learner's progress, manage content, generate reports, and evaluate programme effectiveness.",
  },
  {
    icon: Layers,
    title: "Multi-Tenant Architecture",
    text: "SparkTool supports multiple organisations on one platform. Each institution has its own isolated private space.",
  },
  {
    icon: Activity,
    title: "Low-Bandwidth Optimised",
    text: "Designed to work well even in areas with slow or unstable internet, ensuring learners aren't left behind.",
  },
];

const audiences = [
  {
    icon: Landmark,
    title: "Governments & Institutions",
    desc: "Deploy national training programmes, TVET initiatives, and workforce development schemes on a platform built for scale.",
    bullets: [
      "Track programme outcomes",
      "Report to policymakers with real data",
      "Reach citizens across regions and languages",
    ],
  },
  {
    icon: HandHeart,
    title: "NGOs & Training Orgs",
    desc: "Run your training programmes more efficiently. Onboard learners quickly, deliver quality content, and measure your impact.",
    bullets: [
      "Easy learner enrolment",
      "Built-in assessments and tracking",
      "Certificates for every qualified learner",
    ],
  },
  {
    icon: School,
    title: "TVET & Educational",
    desc: "Extend your classroom beyond four walls. Deliver practical, skills-focused courses digitally and monitor every student's journey.",
    bullets: [
      "Blended learning support",
      "Curriculum-aligned structure",
      "Institutional reporting",
    ],
  },
  {
    icon: User,
    title: "Individual Learners",
    desc: "Take charge of your future. Learn practical skills at your own pace, get support when every you need it, and earn certificates.",
    bullets: [
      "Learn in your language",
      "AI assistant available 24/7",
      "Free to study at your own pace",
    ],
  },
];

const stats = [
  { value: "150K+", label: "Learners Enrolled" },
  { value: "3,200+", label: "Courses Delivered" },
  { value: "45+", label: "Institutions Onboarded" },
  { value: "12", label: "Languages Supported" },
];

function PlatformLandingPage() {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToDemo = () => {
    document.getElementById("demo")?.scrollIntoView({ behavior: "smooth" });
    setMobileMenuOpen(false);
  };

  const navLinks = [
    { label: "What We Do", href: "#what-we-do" },
    { label: "Who It's For", href: "#who-its-for" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "Features", href: "#features" },
  ];

  return (
    <div className="min-h-screen bg-[#FDFDFD] text-stone-900 font-sans selection:bg-[#0A2617] selection:text-white">
      {/* STRIPE BACKGROUND NOISE */}
      <div
        className="fixed inset-0 z-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      ></div>

      {/* 
      ===============================================
      NAVIGATION
      =============================================== 
      */}
      <header className="sticky top-0 z-50 w-full border-b border-black/10 bg-[#FDFDFD]/90 backdrop-blur-md">
        <div className="flex items-center justify-between px-6 py-4 mx-auto pointer-events-auto max-w-screen-2xl xl:px-12">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-[#0A2617]" />
            <span className="text-xl font-bold tracking-tighter uppercase">
              SparkTool
            </span>
          </div>

          <nav className="items-center hidden gap-8 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-xs font-semibold tracking-widest text-stone-500 uppercase hover:text-[#0A2617] transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="items-center hidden gap-6 md:flex">
            <button
              onClick={() => navigate({ to: "/login" })}
              className="text-xs font-semibold tracking-widest uppercase hover:underline underline-offset-4"
            >
              Sign In
            </button>
            <button
              onClick={scrollToDemo}
              className="px-6 py-3 text-xs font-bold tracking-widest text-[#FDFDFD] uppercase transition-colors bg-[#0A2617] hover:bg-black"
            >
              Book a Demo
            </button>
          </div>

          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`overflow-hidden bg-[#FDFDFD] border-b border-black/10 md:hidden transition-all duration-300 ease-in-out ${mobileMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"}`}
        >
          <div className="flex flex-col gap-6 px-6 py-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-lg font-bold tracking-tight uppercase"
              >
                {link.label}
              </a>
            ))}
            <div className="flex flex-col gap-4 pt-6 border-t border-black/10">
              <button
                onClick={() => {
                  navigate({ to: "/login" });
                  setMobileMenuOpen(false);
                }}
                className="flex items-center justify-between px-2 text-lg font-bold tracking-tight uppercase"
              >
                Sign In <ArrowRight size={20} />
              </button>
              <button
                onClick={scrollToDemo}
                className="flex justify-between items-center w-full px-6 py-4 mt-2 text-lg font-bold tracking-widest text-[#FDFDFD] uppercase bg-[#0A2617]"
              >
                Book a Demo <ArrowRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* 
      ===============================================
      HERO SECTION
      =============================================== 
      */}
      <section className="relative pt-24 pb-32 overflow-hidden border-b lg:pt-40 lg:pb-48 border-black/10">
        <div className="relative z-10 px-6 mx-auto max-w-screen-2xl xl:px-12">
          <div
            data-aos="fade-up"
            data-aos-duration="900"
            data-aos-easing="ease-out-cubic"
            data-aos-once="true"
            className="max-w-300"
          >
            <h1 className="text-[3.5rem] leading-[0.9] tracking-tighter uppercase sm:text-[6rem] lg:text-[8rem] font-black text-[#0A2617] mb-8">
              Quality Education,
              <br />
              <span className="text-stone-400">Delivered</span> at Scale.
            </h1>
            <p className="max-w-3xl mb-12 text-xl font-medium leading-relaxed tracking-tight sm:text-2xl text-stone-600">
              SparkTool is an AI-powered learning platform that helps
              institutions, governments, and individuals deliver and access
              structured, skills-focused education — anywhere, in any language.
            </p>

            <div className="flex flex-col items-start gap-8 sm:flex-row sm:items-center">
              <button
                onClick={scrollToDemo}
                className="group flex items-center gap-4 px-8 py-5 text-sm font-bold tracking-widest text-[#FDFDFD] uppercase transition-all bg-[#0A2617] hover:bg-black"
              >
                Book a Demo
                <ArrowUpRight
                  size={18}
                  className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                />
              </button>
              <a
                href="#how-it-works"
                className="flex items-center gap-2 text-sm font-bold tracking-widest uppercase transition-colors text-stone-500 hover:text-[#0A2617]"
              >
                Learn how it works{" "}
                <ArrowRight size={16} className="rotate-90" />
              </a>
            </div>

            <div className="inline-block pt-8 mt-16 border-t border-black/10">
              <p className="text-xs font-semibold tracking-widest uppercase text-stone-400">
                Trusted by government institutions and training organisations
                across Africa.
              </p>
            </div>
          </div>
        </div>

        <div className="absolute right-0 hidden w-1/3 max-w-xl pointer-events-none top-20 aspect-square opacity-5 lg:block animate-[spin_60s_linear_infinite]">
          <div className="w-full h-full border-20 rounded-full border-black absolute right-[-20%]" />
        </div>
      </section>

      {/* 
      ===============================================
      THE PROBLEM
      =============================================== 
      */}
      <section className="border-b border-black/10 bg-stone-100">
        <div className="grid mx-auto lg:grid-cols-12 max-w-screen-2xl border-x border-black/10">
          <div
            data-aos="fade-right"
            data-aos-duration="800"
            data-aos-once="true"
            className="p-8 border-b lg:col-span-4 lg:p-16 lg:border-b-0 lg:border-r border-black/10"
          >
            <h2 className="text-xs font-bold tracking-[0.3em] uppercase text-stone-400 mb-6">
              The Problem
            </h2>
            <h3 className="text-3xl sm:text-5xl font-black tracking-tighter uppercase leading-[0.95] text-[#0A2617] mb-6">
              Education Is Available.
              <br />
              But Not For Everyone.
            </h3>
            <p className="text-lg font-medium leading-relaxed text-stone-600">
              Across Africa and other emerging regions, millions of people are
              left out of quality education every day — not because they don't
              want to learn, but because the systems aren't built to reach them.
            </p>
          </div>

          <div className="relative grid divide-y lg:col-span-8 sm:grid-cols-2 sm:divide-y-0 sm:divide-x divide-black/10">
            <div className="grid divide-y divide-black/10">
              {problems.slice(0, 2).map((prob, i) => (
                <div
                  key={prob.title}
                  data-aos="fade-up"
                  data-aos-delay={String(i * 100)}
                  data-aos-duration="700"
                  data-aos-once="true"
                  className="p-8 transition-colors duration-500 lg:p-12 hover:bg-white"
                >
                  <prob.icon
                    size={32}
                    className="text-[#0A2617] mb-8"
                    strokeWidth={1.5}
                  />
                  <h4 className="mb-4 text-xl font-bold tracking-tight uppercase">
                    {prob.title}
                  </h4>
                  <p className="font-medium leading-relaxed text-stone-600">
                    {prob.text}
                  </p>
                </div>
              ))}
            </div>
            <div className="grid divide-y divide-black/10">
              {problems.slice(2, 4).map((prob, i) => (
                <div
                  key={prob.title}
                  data-aos="fade-up"
                  data-aos-delay={String(i * 100 + 200)}
                  data-aos-duration="700"
                  data-aos-once="true"
                  className="p-8 transition-colors duration-500 lg:p-12 hover:bg-white"
                >
                  <prob.icon
                    size={32}
                    className="text-[#0A2617] mb-8"
                    strokeWidth={1.5}
                  />
                  <h4 className="mb-4 text-xl font-bold tracking-tight uppercase">
                    {prob.title}
                  </h4>
                  <p className="font-medium leading-relaxed text-stone-600">
                    {prob.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 
      ===============================================
      WHAT WE DO
      =============================================== 
      */}
      <section
        id="what-we-do"
        className="py-24 lg:py-40 border-b border-black/10 bg-[#0A2617] text-[#FDFDFD] relative overflow-hidden"
      >
        {/* Subtle glow */}
        <div className="absolute top-0 left-1/4 w-full h-full bg-[#185536] blur-[200px] rounded-full pointer-events-none opacity-20" />
        <div className="relative z-10 px-6 mx-auto text-center max-w-7xl lg:px-12">
          <p
            data-aos="fade-up"
            data-aos-duration="600"
            data-aos-once="true"
            className="text-xs font-bold tracking-[0.3em] uppercase text-[#B3F2C7] mb-8"
          >
            What We Do
          </p>
          <h2
            data-aos="fade-up"
            data-aos-delay="100"
            data-aos-duration="800"
            data-aos-once="true"
            className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tighter uppercase leading-[0.95] mb-12"
          >
            One Platform.
            <br />
            Endless Learning
            <br />
            Possibilities.
          </h2>
          <div
            data-aos="fade-up"
            data-aos-delay="200"
            data-aos-duration="800"
            data-aos-once="true"
            className="max-w-3xl mx-auto space-y-6 text-xl lg:text-2xl font-medium leading-relaxed text-[#FDFDFD]/70"
          >
            <p>
              SparkTool brings together structured course delivery, AI-powered
              support, and institutional management tools into a single
              platform. Whether you're a government agency training thousands of
              citizens, a school delivering vocational education, or an
              individual building new skills — SparkTool is built for you.
            </p>
            <p className="text-[#FDFDFD]">
              We don't just host courses. We create complete learning ecosystems
              that track progress, measure outcomes, and deliver results.
            </p>
          </div>
        </div>
      </section>

      {/* 
      ===============================================
      HOW IT WORKS
      =============================================== 
      */}
      <section id="how-it-works" className="border-b border-black/10">
        <div className="grid mx-auto lg:grid-cols-12 max-w-screen-2xl border-x border-black/10">
          <div className="lg:col-span-5 p-8 lg:p-16 border-b lg:border-b-0 lg:border-r border-black/10 bg-[#FDFDFD]">
            <div className="sticky top-32">
              <p className="text-xs font-bold tracking-[0.3em] uppercase text-stone-400 mb-6">
                How It Works
              </p>
              <h2 className="text-4xl lg:text-6xl font-black tracking-tighter uppercase leading-[0.9] text-[#0A2617] mb-8">
                Simple to Set Up.
                <br />
                Powerful to Use.
              </h2>
            </div>
          </div>

          <div className="lg:col-span-7 bg-stone-50">
            <div className="grid divide-y divide-black/10">
              {[
                {
                  title: "Onboard Your Institution",
                  text: "We set up your organisation's dedicated space on SparkTool. Your data, your users, your environment — fully separated and secure.",
                },
                {
                  title: "Build or Upload Your Courses",
                  text: "Add your learning content in any format. Our team helps you structure it into clear, progressive modules that are easy for learners to follow.",
                },
                {
                  title: "Reach Your Learners",
                  text: "Learners enrol, access courses, and get support from our AI assistant — anytime, from any device. Content can be delivered in multiple languages.",
                },
                {
                  title: "Track and Improve",
                  text: "Administrators get real-time dashboards and reports to see who is learning, how they're doing, and where improvements are needed.",
                },
              ].map((step, i) => (
                <div
                  key={step.title}
                  data-aos="fade-left"
                  data-aos-delay={String(i * 100)}
                  data-aos-duration="700"
                  data-aos-once="true"
                  className="flex flex-col gap-6 p-8 transition-colors lg:p-16 sm:flex-row sm:gap-12 hover:bg-white group"
                >
                  <div className="text-5xl lg:text-7xl font-black text-stone-200 group-hover:text-[#0A2617] transition-colors leading-none">
                    0{i + 1}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold tracking-tight uppercase mb-4 text-[#0A2617]">
                      {step.title}
                    </h3>
                    <p className="text-lg font-medium leading-relaxed text-stone-600">
                      {step.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 
      ===============================================
      FEATURES
      =============================================== 
      */}
      <section
        id="features"
        className="py-24 lg:py-32 border-b border-black/10 bg-[#0A2617]"
      >
        <div className="px-6 mx-auto lg:px-12 max-w-screen-2xl">
          <div className="mb-20">
            <p className="text-xs font-bold tracking-[0.3em] uppercase text-[#B3F2C7] mb-6">
              Platform Features
            </p>
            <h2 className="text-4xl lg:text-6xl font-black tracking-tighter uppercase leading-[0.9] text-[#FDFDFD] max-w-3xl">
              Everything You Need.
              <br />
              Nothing You Don't.
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-[#FDFDFD]/10 border border-[#FDFDFD]/10">
            {features.map((feature, i) => (
              <div
                key={feature.title}
                data-aos="fade-up"
                data-aos-delay={String((i % 4) * 75)}
                data-aos-duration="600"
                data-aos-once="true"
                className="bg-[#0A2617] p-8 lg:p-10 flex flex-col justify-between group overflow-hidden relative"
              >
                <div className="relative z-10">
                  <div className="w-12 h-12 bg-black/20 flex items-center justify-center mb-8 border border-white/10 group-hover:bg-[#B3F2C7] group-hover:border-transparent group-hover:text-[#0A2617] text-white transition-colors duration-300">
                    <feature.icon size={20} strokeWidth={1.5} />
                  </div>
                  <h3 className="mb-4 text-lg font-bold tracking-tight text-white uppercase">
                    {feature.title}
                  </h3>
                  <p className="font-medium leading-relaxed text-white/60">
                    {feature.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 
      ===============================================
      WHO IT'S FOR
      =============================================== 
      */}
      <section
        id="who-its-for"
        className="py-24 border-b lg:py-32 border-black/10 bg-stone-100"
      >
        <div className="px-6 mx-auto lg:px-12 max-w-screen-2xl">
          <div className="mb-16 text-left lg:text-center">
            <p className="text-xs font-bold tracking-[0.3em] uppercase text-stone-400 mb-6">
              Who It's For
            </p>
            <h2 className="text-4xl lg:text-6xl font-black tracking-tighter uppercase leading-[0.9] text-[#0A2617] max-w-3xl lg:mx-auto">
              Built for Institutions.
              <br />
              Designed for People.
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:gap-8">
            {audiences.map((audience, i) => (
              <div
                key={audience.title}
                data-aos="fade-up"
                data-aos-delay={String(i * 100)}
                data-aos-duration="700"
                data-aos-once="true"
                className="border border-black/10 bg-white p-8 lg:p-12 shadow-[4px_4px_0px_#0A2617] hover:-translate-y-1 hover:shadow-[6px_6px_0px_#0A2617] transition-all"
              >
                <audience.icon
                  size={40}
                  className="text-[#0A2617] mb-8"
                  strokeWidth={1}
                />
                <h3 className="text-2xl font-bold tracking-tight uppercase text-[#0A2617] mb-4">
                  {audience.title}
                </h3>
                <p className="mb-8 text-lg font-medium leading-relaxed text-stone-600">
                  {audience.desc}
                </p>
                <ul className="mt-auto space-y-3">
                  {audience.bullets.map((bullet, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 font-medium text-stone-700"
                    >
                      <div className="w-1.5 h-1.5 rounded-none bg-[#0A2617] mt-2 shrink-0" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 
      ===============================================
      IMPACT & ALIGNMENT
      =============================================== 
      */}
      <section className="border-b border-black/10">
        <div className="grid mx-auto lg:grid-cols-2 max-w-screen-2xl border-x border-black/10">
          <div className="p-12 lg:p-24 border-b lg:border-b-0 lg:border-r border-black/10 bg-[#B3F2C7]">
            <p className="text-xs font-bold tracking-[0.3em] uppercase text-[#0A2617]/50 mb-6">
              Our Impact
            </p>
            <h2 className="text-4xl lg:text-5xl font-black tracking-tighter uppercase leading-[0.9] text-[#0A2617] mb-16">
              Education That Moves People Forward.
            </h2>
            <div className="grid grid-cols-2 gap-x-8 gap-y-16">
              {stats.map((stat, i) => (
                <div
                  key={stat.label}
                  data-aos="zoom-in"
                  data-aos-delay={String(i * 100)}
                  data-aos-duration="600"
                  data-aos-once="true"
                >
                  <div className="text-5xl lg:text-7xl font-black tracking-tighter text-[#0A2617] mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm font-bold tracking-widest uppercase text-[#0A2617]/60">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div
            data-aos="fade-left"
            data-aos-duration="800"
            data-aos-once="true"
            className="flex flex-col justify-center p-12 bg-white lg:p-24"
          >
            <p className="text-xs font-bold tracking-[0.3em] uppercase text-stone-400 mb-6">
              Built With Purpose
            </p>
            <h2 className="text-3xl lg:text-5xl font-black tracking-tighter uppercase leading-[0.95] text-[#0A2617] mb-8">
              Aligned With Africa's Biggest Education Goals.
            </h2>
            <div className="space-y-6 text-lg font-medium leading-relaxed text-stone-600">
              <p>
                SparkTool is designed to directly support the frameworks shaping
                Africa's future — from the African Union's Continental Education
                Strategy (CESA) and Technical Vocational Education strategy
                (CTVET), to Agenda 2063 and the AU AI Strategy.
              </p>
              <p>
                We are not just building a product. We are building
                infrastructure that helps governments, institutions, and people
                achieve real, measurable outcomes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 
      ===============================================
      BOOK A DEMO (FORM SECTION)
      =============================================== 
      */}
      <section
        id="demo"
        className="py-24 lg:py-32 bg-[#F6FFF9] border-b border-black/10 relative overflow-hidden"
      >
        {/* Large abstract circle */}
        <div className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 w-200 h-200 border border-[#0A2617]/5 rounded-full pointer-events-none" />
        <div className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 w-150 h-150 border border-[#0A2617]/5 rounded-full pointer-events-none" />

        <div className="relative z-10 px-6 mx-auto max-w-7xl lg:px-12">
          <div className="grid items-start gap-16 lg:grid-cols-2 lg:gap-24">
            <div
              data-aos="fade-right"
              data-aos-duration="800"
              data-aos-once="true"
            >
              <p className="text-xs font-bold tracking-[0.3em] uppercase text-[#0A2617]/50 mb-6">
                Get Started
              </p>
              <h2 className="text-5xl lg:text-7xl font-black tracking-tighter uppercase leading-[0.9] text-[#0A2617] mb-8">
                See SparkTool
                <br />
                In Action.
              </h2>
              <p className="text-xl font-medium leading-relaxed text-stone-700">
                Whether you represent a government agency, a training
                organisation, or an educational institution, we'd love to show
                you what SparkTool can do for you. Book a free demo and let's
                talk about how we can work together.
              </p>
            </div>

            <div
              data-aos="fade-left"
              data-aos-duration="800"
              data-aos-delay="100"
              data-aos-once="true"
              className="bg-white p-8 lg:p-12 border border-black/10 shadow-[8px_8px_0px_#0A2617]"
            >
              <form
                className="space-y-6"
                action="mailto:info@hikey.com.ng"
                method="get"
                encType="text/plain"
              >
                <div className="grid gap-6 sm:grid-cols-2">
                  <TextInput
                    label="Full Name"
                    placeholder="Jane Doe"
                    required
                    classNames={{
                      input:
                        "border-black/20 focus:border-[#0A2617] rounded-none h-12 transition-colors",
                      label:
                        "uppercase tracking-widest text-[10px] font-bold mb-3 text-[#0A2617]",
                    }}
                  />
                  <TextInput
                    label="Organisation Name"
                    placeholder="Institution"
                    required
                    classNames={{
                      input:
                        "border-black/20 focus:border-[#0A2617] rounded-none h-12 transition-colors",
                      label:
                        "uppercase tracking-widest text-[10px] font-bold mb-3 text-[#0A2617]",
                    }}
                  />
                </div>
                <div className="grid gap-6 sm:grid-cols-2">
                  <TextInput
                    label="Job Title / Role"
                    placeholder="Director of Training"
                    required
                    classNames={{
                      input:
                        "border-black/20 focus:border-[#0A2617] rounded-none h-12 transition-colors",
                      label:
                        "uppercase tracking-widest text-[10px] font-bold mb-3 text-[#0A2617]",
                    }}
                  />
                  <TextInput
                    label="Email Address"
                    placeholder="jane@organisation.org"
                    type="email"
                    required
                    classNames={{
                      input:
                        "border-black/20 focus:border-[#0A2617] rounded-none h-12 transition-colors",
                      label:
                        "uppercase tracking-widest text-[10px] font-bold mb-3 text-[#0A2617]",
                    }}
                  />
                </div>
                <div className="grid gap-6 sm:grid-cols-1">
                  <TextInput
                    label="Organisation Type"
                    placeholder="e.g. Government, TVET, NGO"
                    required
                    classNames={{
                      input:
                        "border-black/20 focus:border-[#0A2617] rounded-none h-12 transition-colors",
                      label:
                        "uppercase tracking-widest text-[10px] font-bold mb-3 text-[#0A2617]",
                    }}
                  />
                </div>
                <Textarea
                  label="What are you hoping to achieve with SparkTool?"
                  placeholder="Tell us about your goals..."
                  minRows={4}
                  classNames={{
                    input:
                      "border-black/20 focus:border-[#0A2617] rounded-none transition-colors",
                    label:
                      "uppercase tracking-widest text-[10px] font-bold mb-3 text-[#0A2617]",
                  }}
                />
                <button
                  type="submit"
                  className="w-full py-5 text-sm font-bold tracking-widest text-[#FDFDFD] uppercase transition-colors bg-[#0A2617] hover:bg-black mt-4 border border-black"
                >
                  Send Request
                </button>
                <p className="mt-4 text-xs font-bold tracking-widest text-center uppercase text-stone-400">
                  This will open your email client to send the request.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* 
      ===============================================
      FOOTER
      =============================================== 
      */}
      <footer className="bg-[#0A2617] text-[#FDFDFD] py-16 lg:py-24">
        <div className="px-6 mx-auto lg:px-12 max-w-screen-2xl">
          <div className="grid items-end gap-12 mb-16 md:grid-cols-2">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 bg-[#B3F2C7]" />
                <span className="text-3xl font-black tracking-tighter uppercase">
                  SparkTool
                </span>
              </div>
              <p className="text-2xl font-bold tracking-tight text-[#B3F2C7] uppercase">
                Powering Education.
                <br />
                Building Futures.
              </p>
            </div>
            <div className="flex flex-wrap md:justify-end gap-x-12 gap-y-4">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-sm font-bold tracking-widest uppercase hover:text-[#B3F2C7] transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#demo"
                onClick={scrollToDemo}
                className="text-sm font-bold tracking-widest uppercase text-[#B3F2C7] hover:text-white transition-colors"
              >
                Book a Demo
              </a>
            </div>
          </div>

          <div className="pt-8 border-t border-[#FDFDFD]/20 flex flex-col md:flex-row items-center justify-between gap-6 text-xs font-bold tracking-widest uppercase text-[#B3F2C7]/60">
            <p>
              © {new Date().getFullYear()} SparkTool Infrastructure. All rights
              reserved.
            </p>
            <div className="flex gap-8">
              <a href="#" className="hover:text-[#FDFDFD] transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-[#FDFDFD] transition-colors">
                Terms of Use
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

import {
  Anchor,
  AppShell,
  Badge,
  Box,
  Button,
  Card,
  Container,
  Divider,
  Grid,
  Group,
  List,
  Paper,
  SimpleGrid,
  Stack,
  Text,
  ThemeIcon,
  Title,
  UnstyledButton,
} from "@mantine/core";
import {
  IconArrowRight,
  IconCookie,
  IconGlobe,
  IconLock,
  IconLogin,
  IconRobot,
  IconShieldCheck,
  IconUsers,
} from "@tabler/icons-react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";

import { PublicFooter } from "@/components/layouts/public-footer";
import { BrandLogo } from "@/components/shared/brand-logo";

type PolicySection = {
  bullets?: string[];
  id: string;
  paragraphs: string[];
  title: string;
};

const navigationItems = [
  { href: "/guidelines", label: "Guidelines" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/verify-certificate", label: "Verify Certificate" },
] as const;

const summaryCards = [
  {
    description:
      "We support learner, educator, administrator, and institutional accounts across public websites, tenant workspaces, APIs, and integrations.",
    icon: IconUsers,
    title: "Who This Covers",
  },
  {
    description:
      "The policy is written for education workloads, with additional controls for minors, academic records, and institutional deployments.",
    icon: IconShieldCheck,
    title: "Education-Specific Safeguards",
  },
  {
    description:
      "Cross-border processing, legal basis, retention, and international transfer safeguards are stated directly for multi-country operation.",
    icon: IconGlobe,
    title: "Global Compliance Scope",
  },
  {
    description:
      "AI-supported features are disclosed with transparency, human oversight, fairness review, and rights to explanation.",
    icon: IconRobot,
    title: "AI Governance",
  },
] as const;

const sections: PolicySection[] = [
  {
    id: "introduction",
    title: "1. Introduction",
    paragraphs: [
      'SparkTool ("we," "our," or "us") is committed to protecting the privacy and dignity of every learner, educator, administrator, and institution that engages with our platform. This Privacy Policy Statement explains how we collect, use, store, share, and protect personal data in connection with the SparkTool Learning Management System and all related products and services available at sparktool.africa and through our APIs, mobile applications, and third-party integrations.',
      "This policy applies to students, teachers, institutional administrators, parents and guardians, corporate training partners, and website visitors. By accessing or using SparkTool, you agree to the practices described in this policy.",
      "The policy is designed to align with applicable frameworks including NDPA 2023, GDPR, Kenya Data Protection Act 2019, POPIA 2020, Ghana Data Protection Act 2012, CCPA/CPRA, UK GDPR, the Malabo Convention, FERPA, COPPA, and related national laws across SparkTool operating territories.",
    ],
  },
  {
    id: "who-we-are",
    title: "2. Who We Are & Our Role",
    paragraphs: [
      "SparkTool operates as both a data controller for data collected directly from users and a data processor for data submitted by institutional clients such as schools, universities, and training centres.",
      "Where SparkTool acts as a processor, the institution remains the controller for its learners' and staff members' data. Those arrangements are governed by Data Processing Agreements with each institutional client.",
      "If your account is managed by an institution, you should review both this policy and your institution's own privacy policy.",
    ],
  },
  {
    id: "data-we-collect",
    title: "3. Personal Data We Collect",
    paragraphs: [
      "SparkTool collects identity, contact, academic, institutional, and technical data necessary to deliver a secure learning platform.",
    ],
    bullets: [
      "Identity and registration data: full name, date of birth, gender, nationality, student or staff identifiers, and government-issued identifiers where required for compliance.",
      "Contact and account data: email address, phone number, address, username, encrypted password, security settings, and guardian contact details for minors.",
      "Academic and learning data: enrolments, attendance, assignments, quiz responses, examination results, progress, completion, certificates, transcripts, and instructor communications.",
      "Institutional and administrative data: school or institution records, staff roles, departmental access levels, uploaded curriculum, and subscription or billing records.",
      "Technical and usage data: IP address, device and browser information, session logs, navigation patterns, virtual classroom metadata, and API activity logs.",
    ],
  },
  {
    id: "special-categories",
    title: "4. Special Categories of Sensitive Data",
    paragraphs: [
      "SparkTool may process sensitive educational data with heightened protections and stricter access controls.",
      "Sensitive data is processed only with explicit consent or a clear legal obligation and is subject to stronger encryption, access restrictions, and staff training requirements.",
    ],
    bullets: [
      "Health and disability data used for accommodations or study-plan adjustments.",
      "Biometric data where institutions enable facial recognition, fingerprint attendance, or AI proctoring, always subject to explicit documented consent.",
      "Ethnic or cultural background where institutions collect it for national reporting or scholarship programmes.",
      "Religious or belief data where relevant to timetabling, examination scheduling, or accommodation requests.",
      "Children's data for learners under 18, with enhanced protections described in the minor learners section.",
    ],
  },
  {
    id: "how-we-use-data",
    title: "5. How We Use Your Data",
    paragraphs: [
      "SparkTool processes personal data to deliver education services, improve learning outcomes, and maintain platform integrity.",
    ],
    bullets: [
      "Service delivery including account creation, course access, assessments, and academic record generation.",
      "Learning analytics to help educators understand progress, engagement, and performance.",
      "Communication such as assignment notices, grade alerts, course updates, and product messages where consent exists.",
      "Certification and credential verification.",
      "Platform improvement through anonymised and aggregated analysis.",
      "Safety and integrity controls for fraud, abuse, and academic dishonesty detection.",
      "Regulatory compliance with education regulators, ministries, and data protection authorities.",
      "Billing, support, and dispute resolution.",
      "Anonymised education research with appropriate approvals.",
    ],
  },
  {
    id: "legal-basis",
    title: "6. Legal Basis for Processing",
    paragraphs: [
      "Depending on jurisdiction, SparkTool relies on contract performance, legal obligation, legitimate interests, consent, vital interests, and public task as lawful bases for processing.",
      "Optional analytics, marketing communications, biometric features, and research participation rely on consent and can be withdrawn without affecting core service access.",
    ],
  },
  {
    id: "data-sharing",
    title: "7. Data Sharing & Disclosure",
    paragraphs: [
      "SparkTool does not sell personal data. Data is shared only where necessary and under legal and contractual safeguards.",
    ],
    bullets: [
      "Institutional clients administering their own academic programmes.",
      "Technology and infrastructure providers bound by DPAs and equivalent privacy obligations.",
      "Examination and accreditation bodies where submission is required by law or mandate.",
      "Government, regulatory, law-enforcement, or court bodies where disclosure is legally required.",
      "Research partners receiving fully anonymised datasets only.",
      "Professional advisers such as auditors and legal counsel under confidentiality obligations.",
      "Business transfer counterparties, subject to equivalent protections and notice.",
    ],
  },
  {
    id: "edtech-provisions",
    title: "8. EdTech-Specific Data Provisions",
    paragraphs: [
      "Academic data is treated as uniquely sensitive, beyond ordinary personal data, because of its impact on educational and professional outcomes.",
    ],
    bullets: [
      "Academic records are treated as protected data and limited to authorised staff and the individual learner.",
      "Learner academic performance and engagement data is never commercialised, sold, or used for advertising profiles.",
      "Instructor-uploaded course materials remain the intellectual property of the creator or institution.",
      "Examination integrity data is used only for invigilation and deleted within 90 days of results confirmation.",
      "Learners and parents can request a human-readable summary of analytics and their impact on automated outcomes.",
      "Learners may export transcripts, certificates, and course history in a portable format.",
    ],
  },
  {
    id: "children-minors",
    title: "9. Children & Minor Learners",
    paragraphs: [
      "SparkTool serves learners of all ages and applies enhanced protections to anyone under 18 years old.",
      "Where SparkTool is deployed by a school for minors, the institution is responsible for obtaining verifiable parental or guardian consent before enrolment. SparkTool does not onboard minors through direct consumer sign-up without verified institutional involvement.",
    ],
    bullets: [
      "Minor learner profiles are private by default with no public-facing content or searchable profiles.",
      "No behavioural advertising or commercial profiling applies to under-18 accounts.",
      "Parent and guardian visibility can be enabled according to institutional configuration.",
      "Minor learner data is never shared with commercial third parties beyond what is strictly required for operation.",
      "SparkTool aligns with COPPA, the UK Children's Code, GDPR Article 8, and equivalent protections across operating jurisdictions.",
      "Minor learner data has a shorter default retention period and is prioritised for deletion on account closure.",
    ],
  },
  {
    id: "retention",
    title: "10. Data Retention",
    paragraphs: [
      "Personal data is retained only for as long as necessary for the stated purpose and legal obligations.",
      "At the end of the applicable retention period, data is securely deleted or irreversibly anonymised.",
    ],
    bullets: [
      "Active learner accounts: duration of enrolment plus 5 years after graduation or closure.",
      "Minor learner accounts: duration of enrolment plus 2 years unless transitioned to an adult account.",
      "Academic records and transcripts: minimum 10 years or the statutory period required locally.",
      "Examination and proctoring data: 90 days after results confirmation.",
      "Staff and instructor accounts: duration of employment or contract plus 5 years.",
      "Billing and financial records: 7 years from the end of the financial year.",
      "Support correspondence: 3 years from resolution.",
      "Website analytics: 26 months rolling, anonymised after 12 months.",
      "Marketing consent records: until consent withdrawal plus 2 years.",
    ],
  },
  {
    id: "rights",
    title: "11. Your Privacy Rights",
    paragraphs: [
      "Depending on your jurisdiction, you may exercise rights to access, correct, restrict, delete, object to, or port your data, and to request review of automated decisions.",
      "SparkTool acknowledges rights requests within 72 hours and aims to respond fully within 30 days, or sooner where local law requires.",
    ],
    bullets: [
      "Right to access your personal data.",
      "Right to rectification of inaccurate or incomplete information.",
      "Right to erasure where no overriding obligation requires retention.",
      "Right to restriction while disputes or corrections are pending.",
      "Right to data portability for academic records and certificates.",
      "Right to object to legitimate-interest or direct-marketing processing.",
      "Right to human review of significant automated decisions.",
      "Right to withdraw consent for optional processing at any time.",
      "Right to complain to the relevant supervisory authority.",
    ],
  },
  {
    id: "security",
    title: "12. Data Security",
    paragraphs: [
      "SparkTool applies layered technical and operational safeguards aligned with the sensitivity of educational data.",
    ],
    bullets: [
      "AES-256 encryption at rest and TLS 1.3 in transit.",
      "MFA for administrator and instructor accounts, with learner availability.",
      "Role-based access control across institutional boundaries.",
      "Intrusion detection, WAF, DDoS mitigation, penetration testing, and dependency monitoring.",
      "Separate logical data environments for each institutional client.",
      "Annual staff privacy training, background checks, and incident response processes.",
      "72-hour breach notification workflow where required by law.",
      "A designated DPO and privacy-by-design product development practices.",
    ],
  },
  {
    id: "cross-border-transfers",
    title: "13. International Data Transfers",
    paragraphs: [
      "SparkTool operates across multiple countries and may transfer or process personal data outside a user's country of residence.",
      "Where transfers occur, SparkTool relies on safeguards such as Standard Contractual Clauses, adequacy mechanisms, and jurisdiction-specific cross-border transfer rules including POPIA, NDPA 2023, and Kenya DPA provisions.",
      "Where local residency rules apply, in-country storage can be provisioned subject to institutional agreements.",
    ],
  },
  {
    id: "cookies",
    title: "14. Cookies & Tracking Technologies",
    paragraphs: [
      "SparkTool uses cookies and similar technologies for essential functionality and, where consent is provided, analytics and public-site marketing measurement.",
      "Disabling non-essential cookies does not affect access to learning content or academic functions.",
    ],
    bullets: [
      "Strictly necessary cookies for session management, authentication, and security.",
      "Functional cookies for preferences such as language, accessibility settings, and recently visited content.",
      "Performance and analytics cookies used only with consent and handled in aggregated or anonymised form.",
      "Marketing cookies limited to the public website and used only with explicit consent.",
    ],
  },
  {
    id: "institutional-responsibilities",
    title: "15. Institutional Responsibilities",
    paragraphs: [
      "Institutional clients act as independent data controllers for their users and must operate SparkTool in a privacy-compliant way.",
      "A Data Processing Agreement is required before an institutional account is activated. Material non-compliance may lead to suspension.",
    ],
    bullets: [
      "Obtain required consents from learners and guardians before onboarding.",
      "Maintain a compliant privacy policy naming SparkTool as processor.",
      "Submit only the minimum personal data necessary for the educational purpose.",
      "Notify SparkTool of changes to legal basis or consent status.",
      "Configure permissions so staff access only data relevant to their role.",
      "Report suspected data breaches or unauthorised disclosures without delay.",
    ],
  },
  {
    id: "ai-processing",
    title: "16. Artificial Intelligence & Automated Processing",
    paragraphs: [
      "SparkTool uses AI-assisted features such as learning recommendations, automated assessment feedback, plagiarism detection, and at-risk learner identification.",
      "Consequential academic decisions are not made solely by automated means without human review by a qualified educator or administrator.",
    ],
    bullets: [
      "Transparency when AI has influenced recommendations, flags, or pathway suggestions.",
      "Human oversight for consequential academic decisions.",
      "Fairness audits for language, ethnicity, gender, and socioeconomic bias relevant to African learner populations.",
      "Rights to explanation for AI-influenced outcomes affecting academic standing.",
      "No surveillance profiling or unrelated commercial profiling from learner behaviour data.",
    ],
  },
  {
    id: "changes",
    title: "17. Changes to This Policy",
    paragraphs: [
      "SparkTool may update this policy to reflect service changes, new jurisdictions, or regulatory developments.",
      "For material changes, SparkTool posts the updated policy with a revised effective date at least 30 days before it takes effect, notifies registered users and institutional administrators, seeks fresh consent where required, and maintains an accessible version history.",
      "Continued use after the effective date constitutes acceptance of the updated terms.",
    ],
  },
  {
    id: "contact",
    title: "18. Contact & Data Protection Officer",
    paragraphs: [
      "For privacy enquiries, rights requests, or unresolved concerns, contact SparkTool through the channels below.",
      "You may also raise concerns with the supervisory authority in your country of residence, including NDPC, Kenya ODPC, South Africa's Information Regulator, Ghana's Data Protection Commission, or the relevant EU or UK authority.",
    ],
    bullets: [
      "Data Protection Officer: dpo@sparktool.africa",
      "Privacy Team: privacy@sparktool.africa",
      "Platform: https://sparktool.africa",
      "Registered address: SparkTool Technologies Ltd, Africa. TheCans Park, IBB Boulevard, Maitama, Abuja, Nigeria.",
      "Last reviewed: 14 February 2024. Version 2.0.",
    ],
  },
];

export const Route = createFileRoute("/privacy")({
  component: PrivacyPolicyRoute,
});

function PrivacyPolicyRoute() {
  const navigate = useNavigate();

  function handlePublicNavigation(path: string) {
    window.location.assign(path);
  }

  return (
    <AppShell header={{ height: 72 }} padding={0}>
      <AppShell.Header className="border-b border-stone-200 bg-white/95 backdrop-blur">
        <Container size="xl">
          <Group h={72} justify="space-between">
            <UnstyledButton
              className="flex items-center gap-3 transition-opacity hover:opacity-80"
              onClick={() => navigate({ to: "/" })}
            >
              <BrandLogo alt="SparkTool" size={44} />
              <div>
                <Text
                  className="leading-tight text-stone-900"
                  fw={700}
                  size="lg"
                >
                  SparkTool
                </Text>
                <Text className="leading-tight text-stone-500" size="xs">
                  Trusted learning infrastructure for modern institutions
                </Text>
              </div>
            </UnstyledButton>

            <Group gap="xl" visibleFrom="md">
              {navigationItems.map((item) => (
                <UnstyledButton
                  className="font-medium text-stone-600 transition-colors hover:text-[#006838]"
                  key={item.label}
                  onClick={() => handlePublicNavigation(item.href)}
                >
                  {item.label}
                </UnstyledButton>
              ))}
            </Group>

            <Button
              className="bg-[#006838] hover:bg-[#0b7d46]"
              leftSection={<IconLogin size={16} />}
              onClick={() => navigate({ to: "/login" })}
              radius="md"
            >
              Login
            </Button>
          </Group>
        </Container>
      </AppShell.Header>

      <AppShell.Main className="bg-stone-50">
        <Box className="relative overflow-hidden bg-white border-b border-stone-200">
          <div className="absolute inset-x-0 top-0 h-64 bg-[radial-gradient(circle_at_top_left,rgba(0,104,56,0.14),transparent_45%),radial-gradient(circle_at_top_right,rgba(6,182,212,0.08),transparent_38%)]" />
          <Container className="relative" py={72} size="xl">
            <Stack gap="xl">
              <Group gap="sm">
                <Badge color="green" radius="sm" size="lg" variant="light">
                  Privacy Policy
                </Badge>
                <Badge color="cyan" radius="sm" size="lg" variant="light">
                  Global (Africa-anchored)
                </Badge>
              </Group>

              <Stack gap="md" maw={820}>
                <Title className="text-stone-900" fw={800} order={1}>
                  Privacy, transparency, and institutional-grade data handling.
                </Title>
                <Text className="text-stone-600" size="lg">
                  This page presents SparkTool's privacy policy in a structured,
                  readable format that matches the platform's public experience.
                  It covers how personal data is collected, processed,
                  protected, and governed across learner, educator, and
                  institutional workflows.
                </Text>
              </Stack>

              <SimpleGrid cols={{ base: 1, md: 3 }} spacing="md">
                <Paper
                  className="bg-white border shadow-sm border-stone-200"
                  p="lg"
                  radius="lg"
                >
                  <Stack gap={6}>
                    <Text c="dimmed" fw={600} size="sm">
                      Effective date
                    </Text>
                    <Text className="text-stone-900" fw={700} size="xl">
                      14 February 2024
                    </Text>
                  </Stack>
                </Paper>
                <Paper
                  className="bg-white border shadow-sm border-stone-200"
                  p="lg"
                  radius="lg"
                >
                  <Stack gap={6}>
                    <Text c="dimmed" fw={600} size="sm">
                      Platform
                    </Text>
                    <Text className="text-stone-900" fw={700} size="xl">
                      sparktool.africa
                    </Text>
                  </Stack>
                </Paper>
                <Paper
                  className="bg-white border shadow-sm border-stone-200"
                  p="lg"
                  radius="lg"
                >
                  <Stack gap={6}>
                    <Text c="dimmed" fw={600} size="sm">
                      Review version
                    </Text>
                    <Text className="text-stone-900" fw={700} size="xl">
                      Version 2.0
                    </Text>
                  </Stack>
                </Paper>
              </SimpleGrid>
            </Stack>
          </Container>
        </Box>

        <Container py={56} size="xl">
          <Stack gap="xl">
            <SimpleGrid cols={{ base: 1, sm: 2, xl: 4 }} spacing="md">
              {summaryCards.map((card) => {
                const Icon = card.icon;

                return (
                  <Card
                    className="bg-white border shadow-sm border-stone-200"
                    data-aos="fade-up"
                    key={card.title}
                    padding="lg"
                    radius="lg"
                  >
                    <Stack gap="md">
                      <ThemeIcon
                        color="green"
                        radius="md"
                        size={42}
                        variant="light"
                      >
                        <Icon size={22} />
                      </ThemeIcon>
                      <div>
                        <Text className="text-stone-900" fw={700} size="md">
                          {card.title}
                        </Text>
                        <Text className="text-stone-600" mt={6} size="sm">
                          {card.description}
                        </Text>
                      </div>
                    </Stack>
                  </Card>
                );
              })}
            </SimpleGrid>

            <Grid align="start" gutter="xl">
              <Grid.Col span={{ base: 12, lg: 4 }}>
                <Stack className="lg:sticky lg:top-24" gap="md">
                  <Paper
                    className="bg-white border shadow-sm border-stone-200"
                    p="lg"
                    radius="lg"
                  >
                    <Stack gap="md">
                      <Group justify="space-between">
                        <Title order={3}>On this page</Title>
                        <ThemeIcon
                          color="green"
                          radius="md"
                          size={36}
                          variant="light"
                        >
                          <IconLock size={18} />
                        </ThemeIcon>
                      </Group>
                      <Text className="text-stone-600" size="sm">
                        Jump directly to any section of the policy.
                      </Text>
                      <Stack gap={2}>
                        {sections.map((section) => (
                          <Anchor
                            className="rounded-md px-2 py-2 text-sm font-medium text-stone-700 no-underline transition-colors hover:bg-stone-100 hover:text-[#006838]"
                            href={`#${section.id}`}
                            key={section.id}
                          >
                            {section.title}
                          </Anchor>
                        ))}
                      </Stack>
                    </Stack>
                  </Paper>

                  <Paper
                    className="border border-stone-200 bg-[#0f2f1f] text-white shadow-sm"
                    p="lg"
                    radius="lg"
                  >
                    <Stack gap="md">
                      <Group gap="sm">
                        <ThemeIcon
                          color="green"
                          radius="md"
                          size={36}
                          variant="filled"
                        >
                          <IconCookie size={18} />
                        </ThemeIcon>
                        <Text fw={700}>Need a privacy contact?</Text>
                      </Group>
                      <Text className="text-stone-200" size="sm">
                        Rights requests and privacy enquiries can be sent to the
                        SparkTool privacy team.
                      </Text>
                      <Button
                        color="green"
                        component="a"
                        href="mailto:privacy@sparktool.africa"
                        radius="md"
                        rightSection={<IconArrowRight size={16} />}
                        variant="white"
                      >
                        Email privacy@sparktool.africa
                      </Button>
                    </Stack>
                  </Paper>
                </Stack>
              </Grid.Col>

              <Grid.Col span={{ base: 12, lg: 8 }}>
                <Stack gap="lg">
                  {sections.map((section, index) => (
                    <Paper
                      className="bg-white border shadow-sm border-stone-200"
                      data-aos="fade-up"
                      id={section.id}
                      key={section.id}
                      p="xl"
                      radius="lg"
                    >
                      <Stack gap="md">
                        <Group justify="space-between" wrap="wrap">
                          <Title className="text-stone-900" order={2}>
                            {section.title}
                          </Title>
                          <Badge color="green" radius="sm" variant="light">
                            Section {index + 1}
                          </Badge>
                        </Group>

                        {section.paragraphs.map((paragraph) => (
                          <Text
                            className="leading-7 text-stone-700"
                            key={paragraph}
                          >
                            {paragraph}
                          </Text>
                        ))}

                        {section.bullets ? (
                          <List
                            className="text-stone-700"
                            icon={
                              <ThemeIcon
                                color="green"
                                radius="xl"
                                size={22}
                                variant="light"
                              >
                                <IconShieldCheck size={14} />
                              </ThemeIcon>
                            }
                            spacing="sm"
                          >
                            {section.bullets.map((bullet) => (
                              <List.Item key={bullet}>{bullet}</List.Item>
                            ))}
                          </List>
                        ) : null}
                      </Stack>
                    </Paper>
                  ))}

                  <Paper
                    className="bg-white border shadow-sm border-stone-200"
                    p="xl"
                    radius="lg"
                  >
                    <Stack gap="lg">
                      <Group justify="space-between" wrap="wrap">
                        <div>
                          <Title order={2}>Contact and next steps</Title>
                          <Text className="text-stone-600" mt={6}>
                            Use the channels below for rights requests, policy
                            clarifications, or institution-level privacy
                            matters.
                          </Text>
                        </div>
                        <Badge color="cyan" radius="sm" variant="light">
                          Response acknowledgement within 72 hours
                        </Badge>
                      </Group>

                      <SimpleGrid cols={{ base: 1, md: 2 }} spacing="md">
                        <Card
                          className="border border-stone-200 bg-stone-50"
                          padding="lg"
                          radius="lg"
                        >
                          <Stack gap="xs">
                            <Text className="text-stone-500" fw={600} size="sm">
                              Data Protection Officer
                            </Text>
                            <Anchor
                              href="mailto:dpo@sparktool.africa"
                              size="lg"
                            >
                              dpo@sparktool.africa
                            </Anchor>
                          </Stack>
                        </Card>
                        <Card
                          className="border border-stone-200 bg-stone-50"
                          padding="lg"
                          radius="lg"
                        >
                          <Stack gap="xs">
                            <Text className="text-stone-500" fw={600} size="sm">
                              Privacy Team
                            </Text>
                            <Anchor
                              href="mailto:privacy@sparktool.africa"
                              size="lg"
                            >
                              privacy@sparktool.africa
                            </Anchor>
                          </Stack>
                        </Card>
                      </SimpleGrid>

                      <Divider />

                      <Group gap="md" wrap="wrap">
                        <Button
                          className="bg-[#006838] hover:bg-[#0b7d46]"
                          component="a"
                          href="https://sparktool.africa"
                          radius="md"
                          rel="noreferrer"
                          rightSection={<IconArrowRight size={16} />}
                          target="_blank"
                        >
                          Visit sparktool.africa
                        </Button>
                        <Button
                          color="gray"
                          onClick={() => navigate({ to: "/login" })}
                          radius="md"
                          variant="light"
                        >
                          Go to login
                        </Button>
                      </Group>
                    </Stack>
                  </Paper>
                </Stack>
              </Grid.Col>
            </Grid>
          </Stack>
        </Container>

        <PublicFooter />
      </AppShell.Main>
    </AppShell>
  );
}

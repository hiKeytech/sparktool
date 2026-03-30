import {
    Container,
    Group,
    Paper,
    Stack,
    Text,
    Title,
} from "@mantine/core";
import {
    IconCertificate,
    IconShield,
    IconUsers,
} from "@tabler/icons-react";
import { motion } from "framer-motion";

import { EmailPasswordStrategy } from "@/components/auth/strategies/email-password-strategy";

export function AuthPage() {
  const features = [
    {
      description:
        "Comprehensive technology courses aligned with the Renewed Hope Agenda for correctional excellence",
      icon: IconUsers,
      title: "Digital Transformation",
    },
    {
      description:
        "Government-recognized certifications that advance careers and support national development goals",
      icon: IconCertificate,
      title: "Official Accreditation",
    },
    {
      description:
        "Presidential mandate for technology integration in correctional services nationwide",
      icon: IconShield,
      title: "Government Initiative",
    },
  ];

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-linear-to-br from-gray-50 to-gray-100">
      {/* Header Bar */}
      <div className="fixed top-0 left-0 right-0 z-10 p-4 text-white bg-fun-green-800">
        <Container size="xl">
          <Group justify="space-between">
            <Group>
              <img
                alt="Nigerian Coat of Arms"
                className="w-10 h-10"
                src="/nigerian-coat-of-arms.svg"
              />
              <div>
                <Title className="font-semibold text-white" order={3}>
                  Nigerian Correctional Service
                </Title>
                <Text className="text-xs text-green-100">
                  Renewed Hope Agenda • Technology Education Platform
                </Text>
              </div>
            </Group>
          </Group>
        </Container>
      </div>

      {/* Main Content */}
      <Container className="mt-20" size="lg">
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <div className="grid items-center grid-cols-1 gap-8 lg:grid-cols-2">
            {/* Left side - Branding and Features */}
            <div className="space-y-8">
              <div className="text-center lg:text-left">
                <motion.div
                  animate={{ opacity: 1, x: 0 }}
                  initial={{ opacity: 0, x: -20 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                >
                  <Title
                    className="font-bold text-gray-900 ext-4xl"
                    order={1}
                  >
                    Renewed Hope Agenda
                  </Title>

                  <Text className="text-lg text-gray-500">
                    Empowering Correctional Excellence Through Digital Skills Development
                  </Text>
                  <div className="w-16 h-1 mx-auto mb-8 bg-fun-green-600 lg:mx-0"></div>
                </motion.div>
              </div>

              {/* Features */}
              <div className="space-y-6">
                {features.map((feature, index) => (
                  <motion.div
                    animate={{ opacity: 1, x: 0 }}
                    initial={{ opacity: 0, x: -20 }}
                    key={feature.title}
                    transition={{ delay: 0.3 + index * 0.1, duration: 0.6 }}
                  >
                    <Group gap="md">
                      <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-fun-green-100">
                        <feature.icon
                          className="text-fun-green-600"
                          size={24}
                        />
                      </div>
                      <div className="flex-1">
                        <Text className="mb-1 text-gray-900" fw={600}>
                          {feature.title}
                        </Text>
                        <Text className="text-gray-600" size="sm">
                          {feature.description}
                        </Text>
                      </div>
                    </Group>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Right side - Authentication Card */}
            <motion.div
              animate={{ opacity: 1, x: 0 }}
              initial={{ opacity: 0, x: 20 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <Paper
                className="relative shadow-lg"
                p="xl"
                radius="lg"
                withBorder
              >
                <Stack gap="lg">
                  <div className="text-center">
                    <Title className="mb-2 text-gray-900" order={2}>
                      Welcome Back
                    </Title>
                    <Text className="text-gray-600">
                      Sign in with your email and password to access the platform
                    </Text>
                  </div>

                  <EmailPasswordStrategy allowSignup config={{}} label="Continue" />

                  <div className="space-y-2 text-center">
                    <Text className="text-gray-500" size="sm">
                      Use a secure email and password combination to access your learning account.
                    </Text>
                    <Text className="text-gray-400" size="xs">
                      This platform is exclusively for Nigerian Correctional
                      Service personnel
                    </Text>
                  </div>

                  {/* Security Notice */}
                  <div className="p-4 border border-blue-200 rounded-lg bg-blue-50">
                    <Group gap="sm">
                      <IconShield className="text-blue-600" size={16} />
                      <div>
                        <Text className="text-blue-900" fw={500} size="sm">
                          Secure Access
                        </Text>
                        <Text className="text-blue-700" size="xs">
                          Your data is protected with government-grade security
                          standards
                        </Text>
                      </div>
                    </Group>
                  </div>
                </Stack>
              </Paper>
            </motion.div>
          </div>

          {/* Footer */}
          <motion.div
            animate={{ opacity: 1 }}
            className="mt-16 text-center"
            initial={{ opacity: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
          >
            <Text className="text-gray-500" size="sm">
              © 2024 Nigerian Correctional Service. All rights reserved.
            </Text>
            <Text className="mt-1 text-gray-400" size="xs">
              Developed for professional development and capacity building
            </Text>
          </motion.div>
        </motion.div>
      </Container>
    </div>
  );
}

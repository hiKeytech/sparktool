import { motion } from "framer-motion";

interface LoginFeaturesProps {
  features?: {
    description: string;
    icon: string;
    title: string;
  }[];
}

export function LoginFeatures({
  features: configuredFeatures,
}: LoginFeaturesProps) {
  const defaultFeatures = [
    {
      description:
        "Comprehensive technology courses aligned with modern standards.",
      icon: "users",
      title: "Digital Transformation",
    },
    {
      description: "Recognized certifications that advance careers.",
      icon: "certificate",
      title: "Official Accreditation",
    },
    {
      description: "Mandate for technology integration.",
      icon: "shield",
      title: "Government Initiative",
    },
  ];

  const features = configuredFeatures || defaultFeatures;

  return (
    <div className="space-y-8 max-w-md">
      {features.map((feature, index) => (
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          key={feature.title}
          transition={{
            delay: 0.4 + index * 0.1,
            duration: 0.8,
            ease: [0.19, 1, 0.22, 1],
          }}
          className="group flex gap-5 items-start"
        >
          {/* Feature Icon Map */}
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white transition-colors duration-500 group-hover:bg-white group-hover:text-fun-green-800">
            <i className={`icon-${feature.icon} text-lg`} />
          </div>

          <div className="flex flex-col pt-1">
            <h3 className="font-sans font-medium tracking-wide text-white">
              {feature.title}
            </h3>
            <p className="mt-1.5 font-sans text-sm font-normal leading-relaxed text-white/75">
              {feature.description}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

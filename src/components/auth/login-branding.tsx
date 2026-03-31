import { motion } from "framer-motion";

interface LoginBrandingProps {
  branding: {
    heading?: string;
    subheading?: string;
  };
}

export function LoginBranding({ branding }: LoginBrandingProps) {
  return (
    <div className="flex flex-col justify-center w-full h-full text-left">
      <motion.div
        animate={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: 20 }}
        transition={{ delay: 0.2, duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
      >
        <h2 className="font-sans text-5xl font-semibold leading-[1.1] tracking-tight text-white md:text-6xl">
          {branding.heading}
        </h2>

        <p className="max-w-lg mt-6 font-sans text-xl font-normal leading-relaxed text-white/80">
          {branding.subheading}
        </p>

        <div className="mt-10 h-0.5 w-12 bg-white/30"></div>
      </motion.div>
    </div>
  );
}

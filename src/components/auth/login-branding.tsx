import { motion } from "framer-motion";

interface LoginBrandingProps {
  branding: {
    heading?: string;
    subheading?: string;
  };
}

export function LoginBranding({ branding }: LoginBrandingProps) {
  return (
    <div className="text-left w-full h-full flex flex-col justify-center">
      <motion.div
        animate={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: 20 }}
        transition={{ delay: 0.2, duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
      >
        <h2 className="font-display font-bold text-accent-cream text-5xl md:text-6xl tracking-tight leading-[1.1]">
          {branding.heading}
        </h2>

        <p className="font-sans text-xl text-accent-cream/80 mt-6 max-w-lg font-light leading-relaxed">
          {branding.subheading}
        </p>
        
        <div className="w-12 h-[2px] mt-10 bg-accent-cream/30"></div>
      </motion.div>
    </div>
  );
}

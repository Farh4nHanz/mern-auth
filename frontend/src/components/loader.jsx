import { motion } from "framer-motion";

export const Loader = () => {
  return (
    <div className="flex gap-1">
      {[...Array(3)].map((_, index) => (
        <motion.div
          key={index}
          className="w-1 h-1 bg-slate-700 rounded-full"
          animate={{ y: [0, -4, 0] }}
          transition={{
            bounce: 0.5,
            stiffness: 60,
            duration: 0.9,
            ease: "easeInOut",
            repeat: Infinity,
            delay: index * 0.2,
          }}
        ></motion.div>
      ))}
    </div>
  );
};

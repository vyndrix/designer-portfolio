import { useAnimateContext, AnimateProvider } from "@/contexts/AnimateContext";
import { motion, useAnimate } from "motion/react";
import { useEventListener } from "usehooks-ts";

const Flipper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [scope, animate] = useAnimate();

  return (
    <AnimateProvider scope={scope} animate={animate}>
      <motion.div ref={scope} style={{ position: "relative" }}>
        {children}
      </motion.div>
    </AnimateProvider>
  );
};

const Front: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { scope, animate } = useAnimateContext();

  useEventListener(
    "mouseenter",
    async () => {
      await animate(
        ".flipper-front",
        { scale: 1.1, rotateY: "90deg", zIndex: 20 },
        {
          duration: 0.2,
          ease: [1, 0.2, 0, 0.4],
        },
      );
      await animate(
        ".flipper-back",
        { scale: 1.2, rotateY: "0deg", zIndex: 20 },
        {
          duration: 0.2,
          ease: [0.4, 0, 0.2, 1],
        },
      );
    },
    scope,
  );

  return <motion.div className="flipper-front">{children}</motion.div>;
};

const Back: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { scope, animate } = useAnimateContext();

  useEventListener(
    "mouseleave",
    async () => {
      await animate(
        ".flipper-back",
        { scale: 1, rotateY: "90deg", zIndex: 10 },
        {
          duration: 0.2,
          ease: [1, 0.2, 0, 0.4],
        },
      );
      await animate(
        ".flipper-front",
        { scale: 1, rotateY: "0deg", zIndex: 10 },
        {
          duration: 0.2,
          ease: [0.4, 0, 0.2, 1],
        },
      );
    },
    scope,
  );

  return (
    <motion.div
      className="flipper-back"
      style={{ position: "absolute", top: 0, left: 0, rotateY: "90deg" }}
    >
      {children}
    </motion.div>
  );
};

export default Object.assign(Flipper, { Front, Back });

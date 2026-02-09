import BehanceIcon from "@/assets/icons/behance.svg?react";
import LinkedinIcon from "@/assets/icons/linkedin.svg?react";

import { cn } from "@/lib/utils";

const sources = {
  behance: BehanceIcon,
  linkedin: LinkedinIcon,
};

interface Props {
  icon: keyof typeof sources;
  className?: string;
}

export type IconsNames = keyof typeof sources;

export function Icon({ icon, className }: Props) {
  const Comp = sources[icon];
  return <Comp className={cn("w-6 h-6", className)} />;
}

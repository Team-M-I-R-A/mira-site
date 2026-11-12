import {
  BookOpen,
  Clock3,
  Database,
  Lock,
  Megaphone,
  RefreshCw,
  ShieldCheck,
  UserCheck,
} from "lucide-react";
import type { PolicyIconName } from "@/lib/policies";

const icons = {
  book: BookOpen,
  lock: Lock,
  refresh: RefreshCw,
  database: Database,
  clock: Clock3,
  user: UserCheck,
  shield: ShieldCheck,
  megaphone: Megaphone,
};

type PolicyIconProps = {
  name: PolicyIconName;
  size?: number;
  className?: string;
};

export default function PolicyIcon({
  name,
  size = 18,
  className,
}: PolicyIconProps) {
  const Icon = icons[name] ?? BookOpen;
  return <Icon size={size} className={className} aria-hidden="true" />;
}

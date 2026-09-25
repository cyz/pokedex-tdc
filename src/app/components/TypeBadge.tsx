import { TYPE_LABELS, TYPE_STYLES } from "@/lib/constants";

interface TypeBadgeProps {
  type: string;
}

export function TypeBadge({ type }: TypeBadgeProps) {
  return (
    <span
      className={`inline-flex min-w-16 items-center justify-center px-2 py-1 text-xs font-bold uppercase ${TYPE_STYLES[type] ?? "bg-stone-200 text-stone-900"}`}
    >
      {TYPE_LABELS[type] ?? type}
    </span>
  );
}
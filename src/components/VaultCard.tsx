import Link from "next/link";

interface VaultCardProps {
  title: string;
  description: string;
  href: string;
  streak?: number;
  icon?: string;
}

export default function VaultCard({
  title,
  description,
  href,
  streak,
  icon,
}: VaultCardProps) {
  return (
    <Link
      href={href}
      className="group relative overflow-hidden rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5"
    >
      {streak !== undefined && (
        <div className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-hr-red/10 px-3 py-1 text-xs font-semibold text-hr-red">
          <span>🔥</span>
          <span>{streak} day streak</span>
        </div>
      )}
      <div className="mb-4 text-3xl">{icon || "📋"}</div>
      <h3 className="text-lg font-semibold text-hr-navy group-hover:text-hr-red transition-colors">
        {title}
      </h3>
      <p className="mt-2 text-sm text-gray-600">{description}</p>
    </Link>
  );
}

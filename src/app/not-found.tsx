import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <span className="text-6xl">🔍</span>
      <h1 className="mt-4 text-3xl font-bold text-hr-navy">Page not found</h1>
      <p className="mt-2 text-gray-600">
        This section hasn&apos;t been built yet, or the link is wrong.
      </p>
      <Link
        href="/"
        className="mt-6 rounded-lg bg-hr-red px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-hr-red-light"
      >
        Back to The Vault
      </Link>
    </div>
  );
}

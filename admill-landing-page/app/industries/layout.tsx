import Link from "next/link";

export default function IndustriesLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <nav aria-label="Breadcrumb" className="border-b border-neutral-200 bg-white px-6 py-3 text-sm text-neutral-600">
        <div className="mx-auto max-w-6xl">
          <Link href="/" className="hover:text-red-600">Admill</Link>
          <span className="mx-2">/</span>
          <Link href="/" className="hover:text-red-600">Industries</Link>
        </div>
      </nav>
      {children}
    </>
  );
}

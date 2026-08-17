import Link from "next/link";

export default function IndustriesLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="pt-20">
      <nav aria-label="Breadcrumb" className="border-b border-neutral-200 bg-white px-6 py-3 text-sm text-neutral-600">
        <ol className="mx-auto flex max-w-6xl items-center">
          <li><Link href="/" className="hover:text-red-600">Admill</Link></li>
          <li aria-hidden="true" className="mx-2">/</li>
          <li><Link href="/industries" className="hover:text-red-600">Industries</Link></li>
        </ol>
      </nav>
      {children}
    </div>
  );
}

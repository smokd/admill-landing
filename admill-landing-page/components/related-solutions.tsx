import Link from "next/link";

const labels: Record<string, string> = { "electrical-engineering": "Electrical Engineering", "power-energy": "Power & Energy", "building-automation": "Building Automation & BMS", "industrial-automation": "Industrial Automation", "electronic-security": "Electronic Security", "fire-life-safety": "Fire & Life Safety", "systems-integration": "Systems Integration" };

export function RelatedSolutions({ slugs }: { slugs: string[] }) {
  return <section className="px-6 py-16"><div className="mx-auto max-w-6xl"><h2 className="text-2xl font-bold">Relevant engineering capabilities</h2><p className="mt-3 max-w-3xl text-neutral-600">These capabilities are commonly considered together when defining project requirements and system interfaces.</p><ul className="mt-6 flex flex-wrap gap-3">{slugs.map((slug) => <li key={slug}><Link href={`/solutions/${slug}`} className="inline-block rounded-full border border-neutral-300 px-4 py-2 font-semibold hover:border-red-600 hover:text-red-700">{labels[slug]}</Link></li>)}</ul></div></section>;
}

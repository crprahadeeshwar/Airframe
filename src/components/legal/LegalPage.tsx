import { ReactNode } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface LegalSection {
  title: string;
  content: ReactNode;
}

interface LegalPageProps {
  title: string;
  lastUpdated: string;
  intro?: string;
  sections: LegalSection[];
}

export function LegalPage({
  title,
  lastUpdated,
  intro,
  sections,
}: LegalPageProps) {
  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <div className="mb-10">
        <Link
          href="/login"
          className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to sign in
        </Link>

        <h1 className="text-3xl font-bold tracking-tight">{title}</h1>

        <p className="mt-2 text-sm text-muted-foreground">
          Last updated: {lastUpdated}
        </p>

        {intro && (
          <p className="mt-6 leading-7 text-muted-foreground">
            {intro}
          </p>
        )}
      </div>

      <div className="space-y-8">
        {sections.map((section) => (
          <section key={section.title}>
            <h2 className="text-xl font-semibold">
              {section.title}
            </h2>

            <div className="mt-3 space-y-4 leading-7 text-muted-foreground">
              {section.content}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
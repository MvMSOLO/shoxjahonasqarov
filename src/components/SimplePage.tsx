import { AppShell } from "@/components/layout/AppShell";

export function SimplePage({ title, description, children }: { title: string; description: string; children?: React.ReactNode }) {
  return (
    <AppShell>
      <div className="glass rounded-3xl p-6 shadow-card md:p-8">
        <h1 className="text-2xl font-bold md:text-3xl">{title}</h1>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground md:text-base">{description}</p>
      </div>
      {children}
    </AppShell>
  );
}
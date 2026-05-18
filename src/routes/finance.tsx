import { createFileRoute } from "@tanstack/react-router";
import { SimplePage } from "@/components/SimplePage";
import { BalanceCard } from "@/components/dashboard/BalanceCard";
export const Route = createFileRoute("/finance")({
  head: () => ({ meta: [{ title: "Moliya va To'lovlar — EduPro" }], links: [{ rel: "canonical", href: "/finance" }] }),
  component: () => <SimplePage title="Moliya va To'lovlar" description="Balans, to'lovlar va tarix."><div className="max-w-md"><BalanceCard /></div></SimplePage>,
});

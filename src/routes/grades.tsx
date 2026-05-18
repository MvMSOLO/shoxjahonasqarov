import { createFileRoute } from "@tanstack/react-router";
import { SimplePage } from "@/components/SimplePage";
import { SkillsRadar } from "@/components/dashboard/SkillsRadar";
export const Route = createFileRoute("/grades")({
  head: () => ({ meta: [{ title: "Davomat va Baholar — EduPro" }], links: [{ rel: "canonical", href: "/grades" }] }),
  component: () => <SimplePage title="Davomat va Baholar" description="Sizning baholaringiz va davomat statistikasi."><SkillsRadar /></SimplePage>,
});

import { createFileRoute } from "@tanstack/react-router";
import { SimplePage } from "@/components/SimplePage";
export const Route = createFileRoute("/support")({
  head: () => ({ meta: [{ title: "Qo'llab-quvvatlash — EduPro" }], links: [{ rel: "canonical", href: "/support" }] }),
  component: () => <SimplePage title="Qo'llab-quvvatlash" description="Biz har doim siz uchun yordam berishga tayyormiz." />,
});

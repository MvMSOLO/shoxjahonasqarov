import { createFileRoute } from "@tanstack/react-router";
import { SimplePage } from "@/components/SimplePage";
import { CoursesCard } from "@/components/dashboard/CoursesCard";

export const Route = createFileRoute("/learning")({
  head: () => ({ meta: [{ title: "O'quv jarayoni — EduPro" }, { name: "description", content: "Kurslar va o'quv jarayoni." }], links: [{ rel: "canonical", href: "/learning" }] }),
  component: () => (
    <SimplePage title="O'quv jarayoni" description="Barcha aktiv kurslaringiz va progresslar.">
      <CoursesCard />
    </SimplePage>
  ),
});
import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { CourseProgressCard } from "@/components/dashboard/CourseProgress";
import { StatCard } from "@/components/dashboard/StatCard";
import { ScheduleCard } from "@/components/dashboard/ScheduleCard";
import { CoursesCard } from "@/components/dashboard/CoursesCard";
import { SkillsRadar } from "@/components/dashboard/SkillsRadar";
import { ActivityCard } from "@/components/dashboard/ActivityCard";
import { NextLessonCard } from "@/components/dashboard/NextLessonCard";
import { TodoCard } from "@/components/dashboard/TodoCard";
import { BalanceCard } from "@/components/dashboard/BalanceCard";
import { stats } from "@/lib/mock-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dashboard — EduPro Student Panel" },
      { name: "description", content: "EduPro o'quvchi paneli — kurs progressi, dars jadvali, vazifalar va balans." },
      { property: "og:title", content: "EduPro — Student Dashboard" },
      { property: "og:description", content: "Premium dark mode o'quv paneli." },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

function Index() {
  return (
    <AppShell
      rightRail={
        <>
          <NextLessonCard />
          <TodoCard />
          <BalanceCard />
        </>
      }
    >
      <CourseProgressCard />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((s, i) => (
          <StatCard key={s.key} stat={s} index={i} />
        ))}
      </div>
      <div className="grid gap-5 lg:grid-cols-2">
        <ScheduleCard />
        <CoursesCard />
      </div>
      <div className="grid gap-5 lg:grid-cols-2">
        <SkillsRadar />
        <ActivityCard />
      </div>
    </AppShell>
  );
}

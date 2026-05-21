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
import { NewsCard } from "@/components/dashboard/NewsCard";
import { LeaderboardCard } from "@/components/dashboard/LeaderboardCard";
import { StudyTimerWidget } from "@/components/dashboard/StudyTimerWidget";
import { AchievementsCard } from "@/components/dashboard/AchievementsCard";
import { HeroBanner } from "@/components/dashboard/HeroBanner";
import { stats } from "@/lib/mock-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dashboard — EduPro Student Panel v5" },
      { name: "description", content: "EduPro o'quvchi paneli — kurs progressi, dars jadvali, vazifalar va balans." },
      { property: "og:title", content: "EduPro — Student Dashboard v5" },
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
          <StudyTimerWidget />
          <AchievementsCard />
          <TodoCard />
          <BalanceCard />
        </>
      }
    >
      <HeroBanner />
      <CourseProgressCard />
      <div className="grid gap-3 grid-cols-2 md:gap-4 xl:grid-cols-4">
        {stats.map((s, i) => (
          <StatCard key={s.key} stat={s} index={i} />
        ))}
      </div>
      <NewsCard />
      <div className="grid gap-4 lg:grid-cols-2">
        <ScheduleCard />
        <CoursesCard />
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        <SkillsRadar />
        <ActivityCard />
      </div>
      <LeaderboardCard />
    </AppShell>
  );
}
